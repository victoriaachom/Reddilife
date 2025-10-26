import express from 'express';
import { InitResponse, IncrementResponse, DecrementResponse } from '../shared/types/api';
import { redis, reddit, createServer, context, getServerPort } from '@devvit/web/server';
import { createPost } from './core/post';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// ============================================
// USER PROGRESS TYPES
// ============================================
interface UserProgress {
  sceneId: string;
  journal: string[];
  selectedSeason: string | null;
  selectedEpisode: string | null;
  selectedCommunity: string | null;
  lastUpdated: number;
}

// ============================================
// INIT ENDPOINT - Load user progress
// ============================================
router.get<{ postId: string }, InitResponse | { status: string; message: string }>(
  '/api/init',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      console.error('API Init Error: postId not found in devvit context');
      res.status(400).json({
        status: 'error',
        message: 'postId is required but missing from context',
      });
      return;
    }

    try {
      const [count, username] = await Promise.all([
        redis.get('count'),
        reddit.getCurrentUsername(),
      ]);

      // Load user progress if exists
      let userProgress: UserProgress | null = null;
      if (username) {
        const progressKey = `progress:${postId}:${username}`;
        const savedProgress = await redis.get(progressKey);
        if (savedProgress) {
          userProgress = JSON.parse(savedProgress);
        }
      }

      res.json({
        type: 'init',
        postId: postId,
        count: count ? parseInt(count) : 0,
        username: username ?? 'anonymous',
        progress: userProgress,
      });
    } catch (error) {
      console.error(`API Init Error for post ${postId}:`, error);
      let errorMessage = 'Unknown error during initialization';
      if (error instanceof Error) {
        errorMessage = `Initialization failed: ${error.message}`;
      }
      res.status(400).json({ status: 'error', message: errorMessage });
    }
  }
);

// ============================================
// SAVE PROGRESS ENDPOINT
// ============================================
router.post<
  { postId: string },
  { status: string; message: string },
  UserProgress
>(
  '/api/save-progress',
  async (req, res): Promise<void> => {
    const { postId } = context;
    const username = await reddit.getCurrentUsername();

    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    if (!username) {
      res.status(400).json({
        status: 'error',
        message: 'username is required',
      });
      return;
    }

    try {
      const progressData: UserProgress = {
        ...req.body,
        lastUpdated: Date.now(),
      };

      const progressKey = `progress:${postId}:${username}`;
      await redis.set(progressKey, JSON.stringify(progressData));

      res.json({
        status: 'success',
        message: 'Progress saved successfully',
      });
    } catch (error) {
      console.error(`Error saving progress:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to save progress',
      });
    }
  }
);

// ============================================
// GET PROGRESS ENDPOINT
// ============================================
router.get<
  { postId: string },
  { status: string; progress?: UserProgress; message?: string }
>(
  '/api/progress',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    const username = await reddit.getCurrentUsername();

    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    if (!username) {
      res.json({
        status: 'success',
        progress: null,
      });
      return;
    }

    try {
      const progressKey = `progress:${postId}:${username}`;
      const savedProgress = await redis.get(progressKey);

      if (savedProgress) {
        const progress: UserProgress = JSON.parse(savedProgress);
        res.json({
          status: 'success',
          progress,
        });
      } else {
        res.json({
          status: 'success',
          progress: null,
        });
      }
    } catch (error) {
      console.error(`Error retrieving progress:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve progress',
      });
    }
  }
);

// ============================================
// RESET PROGRESS ENDPOINT
// ============================================
router.post<
  { postId: string },
  { status: string; message: string }
>(
  '/api/reset-progress',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    const username = await reddit.getCurrentUsername();

    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }

    if (!username) {
      res.status(400).json({
        status: 'error',
        message: 'username is required',
      });
      return;
    }

    try {
      const progressKey = `progress:${postId}:${username}`;
      await redis.del(progressKey);

      res.json({
        status: 'success',
        message: 'Progress reset successfully',
      });
    } catch (error) {
      console.error(`Error resetting progress:`, error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to reset progress',
      });
    }
  }
);

// ============================================
// LEGACY ENDPOINTS (keep for compatibility)
// ============================================
router.post<{ postId: string }, IncrementResponse | { status: string; message: string }, unknown>(
  '/api/increment',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }
    res.json({
      count: await redis.incrBy('count', 1),
      postId,
      type: 'increment',
    });
  }
);

router.post<{ postId: string }, DecrementResponse | { status: string; message: string }, unknown>(
  '/api/decrement',
  async (_req, res): Promise<void> => {
    const { postId } = context;
    if (!postId) {
      res.status(400).json({
        status: 'error',
        message: 'postId is required',
      });
      return;
    }
    res.json({
      count: await redis.incrBy('count', -1),
      postId,
      type: 'decrement',
    });
  }
);

// ============================================
// POST CREATION ENDPOINTS
// ============================================
router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();
    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();
    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();
const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port);
