import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, User, RefreshCw, Play, Compass, LogOut, Search, Plus, Heart, Trophy, Briefcase, Smile, Gamepad2, Check, ArrowLeft, Users, Star, Baby } from 'lucide-react';

// ============================================
// SCENE IMAGE HELPER FUNCTION
// ============================================
const getSceneImage = (sceneId) => {
  const sceneImages = {
    'scene1': '/assets/cassey-welcome.mp4',
    'scene2_minnesota': '/assets/scene2_minnesota 2.gif',
    'scene2_connecticut': '/assets/scene2_connecticut 2.gif',
    'scene2_chicago': '/assets/scene2_chicago 2.gif',
    'scene3_minnesota_stay': '/assets/scene3_minnesota_stay 2.gif',
    'scene3_minnesota_leave': '/assets/scene3_minnesota_leave 2.gif',
    'scene3_connecticut_bake': '/assets/scene3_connecticut_bake 2.gif',
    'scene3_connecticut_escape': '/assets/scene3_connecticut_escape 2.gif',
    'scene3_chicago_pitch': '/assets/scene3_chicago_pitch 2.gif',
    'scene3_chicago_grad': '/assets/scene3_chicago_grad 2.gif',
    'scene4_minnesota_stay_therapy': '/assets/scene4_minnesota_stay_therapy 2.gif',
    'scene4_minnesota_stay_business': '/assets/scene4_minnesota_stay_business 2.gif',
    'scene4_minnesota_leave_apartment': '/assets/scene4_minnesota_leave_apartment 2.gif',
    'scene4_minnesota_leave_roommate': '/assets/scene4_minnesota_leave_roommate 2.gif',
    'scene4_connecticut_bake_recipe': '/assets/scene4_connecticut_bake_recipe 2.gif',
    'scene4_connecticut_bake_manager': '/assets/scene4_connecticut_bake_manager 2.gif',
    'scene4_connecticut_escape_road': '/assets/scene4_connecticut_escape_road 2.gif',
    'scene4_connecticut_escape_friend': '/assets/scene4_connecticut_escape_friend 2.gif',
    'scene4_chicago_pitch_viral': '/assets/scene4_chicago_pitch_viral.gif',
    'scene4_chicago_pitch_fired': '/assets/scene4_chicago_pitch_fired.gif',
    'scene4_chicago_grad_bootcamp': '/assets/scene4_chicago_grad_bootcamp.gif',
    'scene4_chicago_grad_pivot': '/assets/scene4_chicago_grad_pivot.gif',
  };
  
  return sceneImages[sceneId] || '/assets/Cassey-life.gif';
};

// ============================================
// SCENE IMAGE COMPONENT
// ============================================
const SceneImage = ({ sceneId }) => {
  const imageSrc = getSceneImage(sceneId);
  const isVideo = imageSrc.endsWith('.mp4');
  const imgRef = useRef(null);
  const loopCount = useRef(0);
  const maxLoops = 20;

  useEffect(() => {
    if (!isVideo && imgRef.current) {
      const gifDuration = 8000; // Adjust to match GIF length
      const preload = new Image();

      const interval = setInterval(() => {
        if (loopCount.current < maxLoops && imgRef.current) {
          preload.src = `${imageSrc}?t=${Date.now()}`; // preload next frame quietly
          preload.onload = () => {
            imgRef.current.src = preload.src; // swap instantly with no blank
          };
          loopCount.current += 1;
        } else {
          clearInterval(interval);
        }
      }, gifDuration);

      return () => clearInterval(interval);
    }
  }, [imageSrc, isVideo]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-2xl animate-fadeIn w-full h-[800px] overflow-hidden flex items-center justify-center">
      {isVideo ? (
        <video
          src={imageSrc}
          autoPlay
          playsInline
          muted={false}
          controls={false}
          loop={false} // video plays once
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.outerHTML = `<img src="/assets/Cassey-life.gif" alt="Fallback" class="w-full h-full object-cover rounded-lg" />`;
          }}
        />
      ) : (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={`Scene ${sceneId}`}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src = '/assets/Cassey-life.gif';
            e.target.onerror = null;
          }}
        />
      )}
    </div>
  );
};

// ============================================
// LOGIN SCREEN COMPONENT
// ============================================
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const casseyImgRef = useRef(null);
  const zekeImgRef = useRef(null);

  // Force GIF animation to loop continuously
  useEffect(() => {
    const reloadGif = (imgElement) => {
      if (imgElement) {
        const src = imgElement.src;
        imgElement.src = '';
        imgElement.src = src;
      }
    };

    // Reload GIFs periodically to ensure continuous animation
    const interval = setInterval(() => {
      reloadGif(casseyImgRef.current);
      reloadGif(zekeImgRef.current);
    }, 3000); // Adjust timing based on your GIF duration

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('Please enter a username');
      return;
    }
    
    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('Username must be less than 20 characters');
      return;
    }
    
    onLogin(trimmedUsername);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  const styles = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 15s ease infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient relative overflow-hidden">
      {/* Left GIF - Cassey */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block animate-fadeIn">
        <img 
          ref={casseyImgRef}
          src="/assets/intro_cassey.gif"
          alt="Cassey"
          className="h-96 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Right GIF - Zeke */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block animate-fadeIn">
        <img 
          ref={zekeImgRef}
          src="/assets/intro_zeke.gif"
          alt="Zeke"
          className="h-96 w-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      <div className="max-w-md w-full animate-fadeIn relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Welcome to ReddiLife
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your username to begin your journey
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter your username..."
                maxLength={20}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg transition-all"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Playing 🎮
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Your username will be visible to other players in the chat
            </p>
          </div>
        </div>
      </div>
      
      <style>{styles}</style>
    </div>
  );
};

const PROGRESS_KEY = (username) => `reddilife:progress:${username}`;

const saveProgress = (username, data) => {
  if (!username) return;
  try {
    localStorage.setItem(PROGRESS_KEY(username), JSON.stringify(data));
  } catch (err) {
    console.error('Error saving progress', err);
  }
};

const loadProgress = (username) => {
  if (!username) return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY(username));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading progress', err);
    return null;
  }
};

// ============================================
// POST-LOGIN DASHBOARD COMPONENT
// ============================================
const PostLoginDashboard = ({
  username,
  onResetAccount,
  onContinue,
  onExploreCommunities,
  onLogout,
  hasProgress,        
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, callback) => {
    setSelectedOption(option);
    setTimeout(() => {
      callback();
    }, 300);
  };
  const continueDisabled = !hasProgress;

  const dashboardStyles = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-slideIn {
      animation: slideIn 0.6s ease-out;
    }

    .option-card {
      transition: all 0.3s ease;
    }

    .option-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .option-card.selected {
      transform: scale(0.95);
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
      <div className="max-w-4xl w-full animate-fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Welcome back, {username}! 👋
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
          className={`
            option-card bg-white rounded-2xl p-8 shadow-xl animate-slideIn
            ${selectedOption === 'continue' ? 'selected' : ''}
            ${continueDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => {
            if (!continueDisabled) {
              handleOptionClick('continue', onContinue);
            }
          }}
          style={{ animationDelay: '0.1s' }}
          title={
            continueDisabled
              ? 'No story to continue yet. Start a story in Communities.'
              : 'Pick up where you left off in your current adventure'
          }
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Continue Your Story
          </h2>
          <p className="text-gray-600">
            {continueDisabled
              ? 'No story to continue yet'
              : 'Pick up where you left off in your current adventure'}
          </p>
        </div>

          <div
            className={`option-card bg-white rounded-2xl p-8 shadow-xl cursor-pointer animate-slideIn ${selectedOption === 'explore' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('explore', onExploreCommunities)}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Explore Communities
            </h2>
            <p className="text-gray-600">
              Discover new stories and join different communities
            </p>
          </div>

          <div
            className={`option-card bg-white rounded-2xl p-8 shadow-xl cursor-pointer animate-slideIn ${selectedOption === 'reset' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('reset', onResetAccount)}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Start Fresh
            </h2>
            <p className="text-gray-600">
              Reset your progress and begin a new journey
            </p>
          </div>
        </div>
      </div>

      <style>{dashboardStyles}</style>
    </div>
  );
};

// ============================================
// COMMUNITIES EXPLORER COMPONENT (ENHANCED)
// ============================================
const CommunitiesExplorer = ({ username, onBack, onSelectCommunity, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());

  // Load joined communities on mount
  useEffect(() => {
  try {
    const saved = localStorage.getItem(`communities:${username}`);
    if (saved) {
      setJoinedCommunities(new Set(JSON.parse(saved)));
    }
  } catch (error) {
    console.log('No joined communities found');
  }
}, [username]);

  const communities = [
    {
  id: 'casseys-life',
  name: "Cassey's Life",
  description: "Follow Cassey's journey through life's biggest decisions",
  members: '12.5K',
  icon: '👩‍💼',
  category: 'life',
  gradient: 'from-purple-400 to-pink-500',
  hasEpisodes: true,
  bannerImage: `/assets/Cassey-life.gif?reload=${Date.now()}`
},
    {
      id: 'teen-years',
      name: 'Teen Years',
      description: 'Navigate the challenges of teenage life and growing up',
      members: '8.3K',
      icon: '🎓',
      category: 'life',
      gradient: 'from-blue-400 to-cyan-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'zekes-life',
      name: "Zeke's Life",
      description: "Follow Zeke's adventurous journey through life's twists and turns",
      members: '5.3K',
      icon: '🧑‍💼',
      category: 'life',
      gradient: 'from-blue-400 to-red-500',
      hasEpisodes: true
      // bannerImage: `/assets/Zeke-life.gif?reload=${Date.now()}`
    },
    {
      id: 'career-climbers',
      name: 'Career Climbers',
      description: 'Make crucial career decisions and climb the corporate ladder',
      members: '15.2K',
      icon: '💼',
      category: 'career',
      gradient: 'from-green-400 to-emerald-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'love-stories',
      name: 'Love Stories',
      description: 'Experience romance, heartbreak, and everything in between',
      members: '20.1K',
      icon: '💕',
      category: 'relationships',
      gradient: 'from-red-400 to-pink-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'adventure-seekers',
      name: 'Adventure Seekers',
      description: 'Embark on thrilling adventures around the world',
      members: '9.7K',
      icon: '🌍',
      category: 'adventure',
      gradient: 'from-orange-400 to-yellow-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'parent-life',
      name: 'Parent Life',
      description: 'Navigate the joys and challenges of parenthood',
      members: '11.4K',
      icon: '👶',
      category: 'family',
      gradient: 'from-teal-400 to-blue-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'entrepreneur-journey',
      name: 'Entrepreneur Journey',
      description: 'Build your startup from idea to IPO',
      members: '13.8K',
      icon: '🚀',
      category: 'career',
      gradient: 'from-indigo-400 to-purple-500',
      hasEpisodes: false,
      comingSoon: true
    },
    {
      id: 'college-days',
      name: 'College Days',
      description: 'Experience the highs and lows of university life',
      members: '18.6K',
      icon: '🎓',
      category: 'life',
      gradient: 'from-pink-400 to-rose-500',
      hasEpisodes: false,
      comingSoon: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'life', name: 'Life', icon: '🌱' },
    { id: 'career', name: 'Career', icon: '💼' },
    { id: 'relationships', name: 'Love', icon: '❤️' },
    { id: 'adventure', name: 'Adventure', icon: '🗺️' },
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
    {id: 'joined', name: 'Joined', icon: '✅' }
  ];

  const filteredCommunities = communities.filter((community) => {
  const matchesSearch =
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase());

  let matchesCategory = true;

  if (selectedCategory === 'all') {
    matchesCategory = true;
  } else if (selectedCategory === 'joined') {
    // Only show communities the user has joined
    matchesCategory = joinedCommunities.has(community.id);
  } else {
    // Normal category behavior
    matchesCategory = community.category === selectedCategory;
  }

  return matchesSearch && matchesCategory;
});

  const handleJoinCommunity = (communityId) => {
  setJoinedCommunities(prev => {
    const newSet = new Set(prev);
    newSet.has(communityId) ? newSet.delete(communityId) : newSet.add(communityId);
    localStorage.setItem(`communities:${username}`, JSON.stringify(Array.from(newSet)));
    return newSet;
  });
};

  const handlePlayCommunity = (community) => {
    if (community.hasEpisodes) {
      onSelectCommunity(community);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={onLogout}
            title="Logout and save progress"
            className="group px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-semibold"
          >
            <span>👤 {username}</span>
            <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Explore Communities 🌍
          </h1>
          <p className="text-white text-lg">
            Join communities and experience different life stories
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search communities..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-white text-purple-600 shadow-lg scale-105'
                  : 'bg-white/30 backdrop-blur-sm text-white hover:bg-white/50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => {
            const isJoined = joinedCommunities.has(community.id);
            
            return (
              <div
                key={community.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Community Banner */}
                <div className={`h-56 bg-gradient-to-r ${community.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {community.bannerImage ? (
                    <img 
                      src={community.bannerImage} 
                      alt={community.name}
                      className="w-full h-full object-cover scale-105"
                    />
                  ) : (
                    <div className="text-7xl">{community.icon}</div>
                  )}
                  {community.comingSoon && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Community Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {community.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{community.members} members</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleJoinCommunity(community.id)}
                      className={`w-full px-4 py-3 rounded-xl font-bold transition-all ${
                        isJoined
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : `bg-gradient-to-r ${community.gradient} text-white hover:opacity-90`
                      }`}
                    >
                      {isJoined ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" />
                          Joined
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Plus className="w-5 h-5" />
                          Join Community
                        </span>
                      )}
                    </button>

                    {/* Play Button - Only shows when joined */}
                    {isJoined && (
                      <button
                        onClick={() => handlePlayCommunity(community)}
                        disabled={!community.hasEpisodes}
                        className={`w-full px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                          community.hasEpisodes
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Play className="w-5 h-5" />
                        {community.hasEpisodes ? 'Play Episodes' : 'Coming Soon'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-white text-xl font-semibold">
              No communities found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// EPISODES SELECTION COMPONENT
// ============================================
const EpisodesSelection = ({ seasonId, onSelectEpisode, onBack, username, onLogout }) => {
  const episodes = {
    'season1': [
      {
        id: 'episode1',
        number: 1,
        title: 'The First Day',
        description: 'Cassey starts her first day at work and faces her first big decision',
        thumbnail: '/assets/cassey-s1e1.gif',
        duration: '15 min',
        available: true
      }
    ],
    'season1_z': [
      {
        id: 'zeke-ep1',
        number: 1,
        title: 'A New Beginning',
        description: 'Zeke embarks on a new journey in a different city',
        thumbnail: '/assets/intro_zeke.gif',
        duration: '15 min',
        available: true
      },
      {
        id: 'zeke-ep2',
        number: 2,
        title: 'Money Challenges',
        description: 'Zeke faces his first challenges after winning the lottery',
        thumbnail: '/assets/intro_zeke.gif',
        duration: '15 min',
        available: true
      }
    ]
  };

  const seasonEpisodes = episodes[seasonId] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Seasons
          </button>

          <button
            onClick={onLogout}
            title="Logout and save progress"
            className="group bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
          >
            <span>👤 {username}</span>
            <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Choose Your Episode 🎬
          </h1>
          <p className="text-white text-lg">
            Select an episode to continue the story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonEpisodes.map((episode) => (
            <div
              key={episode.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
                episode.available ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => episode.available && onSelectEpisode(episode.id)}
            >
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
                {episode.thumbnail ? (
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/assets/Cassey-life.gif'; }}
                  />
                ) : (
                  <div className="text-7xl">📺</div>
                )}

                {!episode.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                      🔒 Coming Soon
                    </div>
                  </div>
                )}
            </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-purple-600">Episode {episode.number}</span>
                  <span className="text-sm text-gray-500">{episode.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {episode.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {episode.description}
                </p>

                {episode.available && (
                  <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold hover:opacity-90 transition-all">
                    Watch Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// SEASONS SELECTION COMPONENT
// ============================================
const SeasonsSelection = ({ onSelectSeason, onBack, username, communityId, onLogout }) => {
  const seasons = [
    // Cassey seasons
    {
      id: 'season1',
      community: 'cassey',
      title: 'Season 1: New Beginnings',
      description: 'Follow Cassey as she navigates her first major life decisions after college',
      episodes: 10,
      thumbnail: '/assets/Cassey-s1.gif',
      gradient: 'from-purple-400 to-pink-500',
      available: true
    },
    {
      id: 'season2',
      community: 'cassey',
      title: 'Season 2: Career Moves',
      description: 'Cassey faces new challenges in her professional life',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-blue-400 to-cyan-500',
      available: false
    },
    {
      id: 'season3',
      community: 'cassey',
      title: 'Season 3: Relationships',
      description: "Love and friendship take center stage in Cassey's journey",
      episodes: 10,
      thumbnail: null,
      gradient: 'from-pink-400 to-rose-500',
      available: false
    },
    {
      id: 'season4',
      community: 'cassey',
      title: 'Season 4: Major Changes',
      description: 'Life-changing decisions await as Cassey reaches a crossroads',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-green-400 to-emerald-500',
      available: false
    },
    {
      id: 'season5',
      community: 'cassey',
      title: 'Season 5: New Horizons',
      description: "The final chapter of Cassey's incredible journey",
      episodes: 10,
      thumbnail: null,
      gradient: 'from-orange-400 to-red-500',
      available: false
    },

    // Zeke seasons
    {      
      id: 'season1_z',
      community: 'zeke',
      title: 'Season 1: A New Beginning',
      description: 'Join Zeke as he embarks on a new journey in a different city',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-blue-400 to-red-500',
      available: true
    },
    {
      id: 'season2_z',
      community: 'zeke',
      title: 'Season 2: The Rise',
      description: 'Zeke starts leveling up his life — career, money, and danger',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-indigo-400 to-purple-500',
      available: false
    },
    {
      id: 'season3_z',
      community: 'zeke',
      title: 'Season 3: Breaking Point',
      description: "New pressure, new relationships, and Zeke’s biggest temptations yet",
      episodes: 10,
      thumbnail: null,
      gradient: 'from-red-400 to-orange-500',
      available: false
    },
    {
      id: 'season4_z',
      community: 'zeke',
      title: 'Season 4: No Turning Back',
      description: 'Zeke’s choices catch up with him — success or destruction?',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-emerald-400 to-green-600',
      available: false
    },
    {
      id: 'season5_z',
      community: 'zeke',
      title: 'Season 5: Redemption Arc',
      description: 'A comeback story — love, loss, growth, and Zeke’s final evolution',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-yellow-400 to-amber-500',
      available: false
    }
  ];

  // Map communityId from CommunitiesExplorer to a tag
  const communityTag =
    communityId === 'zekes-life' ? 'zeke' :
    communityId === 'casseys-life' ? 'cassey' :
    null; // if null, show all (fallback / debug)

  const visibleSeasons = communityTag
    ? seasons.filter(season => season.community === communityTag)
    : seasons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Communities
        </button>

        <button
          onClick={onLogout}
          title="Logout and save progress"
          className="group bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
        >
          <span>👤 {username}</span>
          <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Choose Your Season 🎬
          </h1>
          <p className="text-white text-lg">
            Select a season to begin your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSeasons.map((season) => (
            <div
              key={season.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
                season.available ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => season.available && onSelectSeason(season.id)}
            >
              <div className={`h-48 bg-gradient-to-r ${season.gradient} flex items-center justify-center relative`}>
                {season.thumbnail ? (
                  <img 
                    src={season.thumbnail} 
                    alt={season.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-7xl">🎬</div>
                )}
                {!season.available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                      🔒 Coming Soon
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {season.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {season.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Play className="w-4 h-4" />
                    <span>{season.episodes} Episodes</span>
                  </div>

                  {season.available && (
                    <button
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${season.gradient} text-white font-semibold hover:opacity-90 transition-all`}
                    >
                      Start Season
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {visibleSeasons.length === 0 && (
            <div className="col-span-full text-center text-white text-lg font-semibold">
              No seasons available yet for this story.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// LIVE CHAT COMPONENT (Keeping existing implementation)
// ============================================
const LiveChat = ({ sceneId, isOpen, onClose, persistentMessages, onMessagesUpdate, currentUsername }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(persistentMessages[sceneId] || []);
  }, [sceneId, persistentMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        username: currentUsername,
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      
      onMessagesUpdate({
        ...persistentMessages,
        [sceneId]: updatedMessages
      });
      
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold">Live Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isOwnMessage = msg.username === currentUsername;
          return (
            <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${isOwnMessage ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-2`}>
                <p className={`text-xs font-semibold mb-1 ${isOwnMessage ? 'text-purple-200' : 'text-gray-600'}`}>
                  {msg.username}
                </p>
                <p className="text-sm break-words">{msg.text}</p>
                <p className={`text-xs mt-1 ${isOwnMessage ? 'text-purple-200' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCENE COMPONENT (Keeping existing implementation)
// ============================================
const Scene = ({ npc, prompt, choices, onChoose, showScenarioOnly, showChoicesOnly }) => {
  if (showScenarioOnly) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl animate-fadeIn">
        {npc && (
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-4 rounded-full text-3xl">
              {npc.avatar}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-purple-600">{npc.name}</h3>
              <p className="text-sm text-gray-500">{npc.role}</p>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
          <p className="text-lg text-gray-800 leading-relaxed">{prompt}</p>
        </div>
      </div>
    );
  }

  if (showChoicesOnly) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white text-center mb-4">
          Make Your Choice! 🎯
        </h3>
        {choices.map((choice) => (
          <button
            key={choice.outcome}
            onClick={() => onChoose(choice.outcome)}
            className="w-full text-left p-6 rounded-xl transition-all duration-300 transform bg-white hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {choice.emoji}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{choice.label}</h4>
                <p className="text-gray-600">{choice.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return null;
};

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCommunities, setShowCommunities] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [sceneId, setSceneId] = useState('communities');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [journal, setJournal] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [persistentMessages, setPersistentMessages] = useState({});
  const [hasProgress, setHasProgress] = useState(false);

  const styles = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(100%); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes typing {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 15s ease infinite;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out;
    }

    .animate-slideUp {
      animation: slideUp 0.3s ease-out;
    }

    .animate-typing {
      animation: typing 0.5s ease-in;
    }

    .animate-blink {
      animation: blink 1s infinite;
    }
  `;

  const handleLogin = (username) => {
  setCurrentUser(username);

  const saved = loadProgress(username);
  console.log('Loaded progress for', username, saved);

  if (saved) {
    // Restore scene and selections from storage
    setSceneId(saved.sceneId || 'communities');

    // You re-hydrate selectedCommunity *later* when you know your communities list,
    // so for now just keep the ID around:
    // e.g. you can store a separate state for selectedCommunityId if needed.

    // If you already store IDs in state:
    setSelectedCommunity(saved.selectedCommunityId || null);
    setSelectedSeason(saved.selectedSeasonId || null);
    setSelectedEpisode(saved.selectedEpisodeId || null);

    setHasProgress(true);
  } else {
    // No saved progress -> fresh dashboard
    setSceneId('communities');
    // setSelectedCommunity(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setHasProgress(false);
  }

  setShowDashboard(true);
};

  const handleLogout = () => {
  if (currentUser) {
    // Only mark as progress if user actually started something
    const canContinue = !!(selectedCommunity && selectedSeason && selectedEpisode);

    if (canContinue) {
      saveProgress(currentUser, {
        sceneId,
        // store IDs, not full objects (safer to rehydrate later)
        selectedCommunityId: selectedCommunity?.id ?? null,
        selectedSeasonId: selectedSeason ?? null,
        selectedEpisodeId: selectedEpisode ?? null,
      });
      setHasProgress(true);
    } else {
      // No real story yet -> clear any old progress
      localStorage.removeItem(PROGRESS_KEY(currentUser));
      setHasProgress(false);
    }
  }

  // Reset in-memory state
  setCurrentUser(null);
  setShowDashboard(false);
  setShowCommunities(false);
  setSelectedCommunity(null);
  setSceneId('communities');
  setSelectedSeason(null);
  setSelectedEpisode(null);
  setJournal([]);
  setPersistentMessages({});
};

  const handleResetAccount = () => {
  if (window.confirm('Are you sure?')) {
    setSceneId('communities');
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setJournal([]);
    setShowDashboard(false);
    setShowCommunities(false);
    setSelectedCommunity(null);
  }
};


  const handleContinue = () => {
  // Just resume whatever sceneId was saved/loaded
  setShowDashboard(false);

  // OPTIONAL safety fallback if you want:
  // if (!sceneId) {
  //   if (selectedEpisode) setSceneId(selectedEpisode);
  //   else if (selectedSeason) setSceneId('episodes');
  //   else setSceneId('seasons');
  // }
};

  const handleExploreCommunities = () => {
    setShowDashboard(false);
    setShowCommunities(true);
  };

  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
    setShowCommunities(false);
    
    if (community.id === 'zekes-life') {
      setSelectedSeason('season1_z');
    } 
    else if (community.id === 'casseys-life') {
      setSelectedSeason('season1');
    }

    setSceneId('seasons');
};
const handleBackToCommunity = () => {
  // Go back to the communities list
  setShowCommunities(true);

  // Leave any season or episode view
  setSceneId(null);
  setSelectedSeason(null);
  setSelectedEpisode(null);

  // Reset journal for the new context
  setJournal([]);

  // This is important:
  // DO NOT clear selectedCommunity here!
  // Clearing it forces the app to load Cassey's by default.
  // We keep selectedCommunity because the user is still "inside" that community
  // unless they intentionally navigate away.
};

  const handleBackToDashboard = () => {
  setShowDashboard(true);
  setSceneId('dashboard');
  setSelectedSeason(null);
  setSelectedEpisode(null);
};

  const handleSelectSeason = (seasonId) => {
    setSelectedSeason(seasonId);
    setSceneId('episodes');
  };

  const handleBackToSeasons = () => {
  // Always stay inside current community
  if (!selectedCommunity) return; // safety guard

  setSceneId('seasons');
  setSelectedEpisode(null);

  // Reset the episode-level journal only
  setJournal([]);

  // Make sure season resets (but community stays)
  setSelectedSeason(null);
};

  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode(episodeId);
    if (episodeId === 'zeke-ep1') {
    setSceneId('scene1_z');
    } 
    else if (episodeId === 'zeke-ep2') {
      setSceneId('scene1_z2');
    }
    else if (episodeId === 'episode1') {
      setSceneId('scene1');
    }
    else {
      setSceneId('scene2');
    }

  };

  const scenarios = {
    scene1_z2: {
      npc: { name: 'Zeke', role: 'Gamer Engineer', avatar: '🎮' },
      prompt: "💰 Zeke wins the lottery — $5 million, just like that. He’s overwhelmed, tempted, and more visible than ever.",
      choices: [
        {
          outcome: 'flashlife',
          label: '💸 Flex hard',
          description: 'Fast cars, watches, designer everything',
          emoji: '💸',
          journalEntry: "I’m done being broke. Time to live like a boss."
        },
        {
          outcome: 'lowkey',
          label: '🧢 Keep it secret',
          description: 'Pretend he’s still broke',
          emoji: '🧢',
          journalEntry: "They don’t need to know. I’ll move in silence."
        },
        {
          outcome: 'romance',
          label: '💞 Invest in a girl he just met',
          description: 'She’s beautiful, mysterious, and might change his life',
          emoji: '💞',
          journalEntry: "She might be the real risk. Or the reward."
        }
      ]
    },
    scene2_z2_flashlife: {
      npc: { name: 'Zeke', role: 'Millionaire', avatar: '💰' },
      prompt: "💸 Zeke lives wild — luxury, attention, chaos. Everyone wants a piece, and he’s losing control fast.",
      choices: [
        { outcome: 'pimp', label: '🔥 Start running girls and parties', description: 'A dangerous “business” move', emoji: '🔥', journalEntry: "It’s risky, but the money’s crazy." },
        { outcome: 'downward', label: '💊 Fall deeper into the lifestyle', description: 'The spiral begins', emoji: '💊', journalEntry: "Too fast. Too much. Too late." }
      ]
    },

    scene2_z2_lowkey: {
      npc: { name: 'Zeke', role: 'Secret Millionaire', avatar: '🧢' },
      prompt: "🧢 Zeke hides his win, keeps working. But friends start getting suspicious — how long can he lie?",
      choices: [
        { outcome: 'exposed', label: '🧠 Trust no one', description: 'Hide the truth completely', emoji: '🧠', journalEntry: "No one can know. Not even family." },
        { outcome: 'betrayal', label: '💬 Tell one person', description: 'Confide in someone close', emoji: '💬', journalEntry: "I needed someone to talk to. Maybe that was a mistake." }
      ]
    },

    scene2_z2_romance: {
      npc: { name: 'Maya', role: 'Aspiring Designer', avatar: '💋' },
      prompt: "💞 Zeke meets Maya, a woman who gets him. She’s broke, bold, and full of dreams. He sees himself in her.",
      choices: [
        { outcome: 'trust', label: '❤️ Go all-in', description: 'Love and money, no limits', emoji: '❤️', journalEntry: "She’s worth it. I think." },
        { outcome: 'doubt', label: '💡 Keep it casual', description: 'Invest but stay guarded', emoji: '💡', journalEntry: "She’s amazing — but I’ve seen how fast things turn fake." }
      ]
    },
    scene3_z2_pimp: {
      npc: { name: 'Zeke', role: 'Underground Boss', avatar: '😈' },
      prompt: "🔥 Zeke starts running private parties for high rollers — fast money, fake friends, real danger.",
      choices: [
        { outcome: 'escape', label: '⚖️ Get out before it’s too late', description: 'Leave the streets alive', emoji: '⚖️', journalEntry: "This isn’t me anymore. I want out." },
        { outcome: 'boss', label: '💀 Go all-in', description: 'Become king of the underground', emoji: '💀', journalEntry: "They fear me now. Maybe that’s enough." }
      ]
    },

    scene3_z2_downward: {
      npc: { name: 'Zeke', role: 'Burned Out', avatar: '🥀' },
      prompt: "💊 The high life burns fast. Zeke spirals — broke, paranoid, alone.",
      choices: [
        { outcome: 'rebuild', label: '💭 Try to rebuild', description: 'Redemption arc', emoji: '💭', journalEntry: "Maybe there’s still time to fix this." },
        { outcome: 'collapse', label: '🕳️ Keep running', description: 'Lose it all', emoji: '🕳️', journalEntry: "There’s no way out. Only down." }
      ]
    },

    scene3_z2_exposed: {
      npc: { name: 'Zeke', role: 'Target', avatar: '🎯' },
      prompt: "💣 Someone leaked his win. Friends, family, strangers — everyone wants a piece.",
      choices: [
        { outcome: 'shootout', label: '🔫 Confront the stalker', description: 'Fight back', emoji: '🔫', journalEntry: "If they want war, they’ll get it." },
        { outcome: 'runaway', label: '🚗 Disappear', description: 'Start over somewhere new', emoji: '🚗', journalEntry: "Time to vanish. No more mistakes." }
      ]
    },

    scene3_z2_betrayal: {
      npc: { name: 'Zeke', role: 'Betrayed', avatar: '🕳️' },
      prompt: "💔 The person he trusted sold him out. Robbed of cash and peace.",
      choices: [
        { outcome: 'revenge', label: '🔥 Get revenge', description: 'Make them pay', emoji: '🔥', journalEntry: "They messed with the wrong one." },
        { outcome: 'reset', label: '🧘 Let it go', description: 'Walk away and rebuild', emoji: '🧘', journalEntry: "Peace beats pride." }
      ]
    },

    scene3_z2_trust: {
      npc: { name: 'Maya', role: 'Partner', avatar: '💋' },
      prompt: "❤️ Zeke and Maya become inseparable — love, chaos, and luxury. Then one day, she vanishes.",
      choices: [
        { outcome: 'chase', label: '🕵️ Track her down', description: 'Find her, whatever it takes', emoji: '🕵️', journalEntry: "If she’s in danger, I’ll save her. If not… I’ll find out." },
        { outcome: 'heartbreak', label: '💔 Let her go', description: 'Walk away for good', emoji: '💔', journalEntry: "She was never mine to keep." }
      ]
    },

    scene3_z2_doubt: {
      npc: { name: 'Maya', role: 'Partner', avatar: '💋' },
      prompt: "💡 Zeke keeps things casual, but Maya senses he’s hiding something. When she finds out about the money, everything explodes.",
      choices: [
        { outcome: 'confession', label: '💬 Tell her everything', description: 'Honesty or chaos', emoji: '💬', journalEntry: "The truth always costs something." },
        { outcome: 'cutoff', label: '🚪 End it now', description: 'Walk before it breaks him', emoji: '🚪', journalEntry: "She’s too much. I’m done." }
      ]
    },
    scene4_z2_boss: {
      npc: null,
      prompt: "🎬 ENDING: Zeke becomes a legend — feared, rich, untouchable. Until betrayal hits.",
      choices: []
    },
    scene4_z2_escape: {
      npc: null,
      prompt: "🎬 ENDING: He leaves the game with nothing but his life. Freedom costs everything.",
      choices: []
    },
    scene4_z2_rebuild: {
      npc: null,
      prompt: "🎬 ENDING: He rebuilds from the ground up — sober, broke, wiser.",
      choices: []
    },
    scene4_z2_collapse: {
      npc: null,
      prompt: "🎬 ENDING: The fall is fast, and final.",
      choices: []
    },
    scene4_z2_shootout: {
      npc: null,
      prompt: "🎬 ENDING: A gunfight in an alley — Zeke survives, barely.",
      choices: []
    },
    scene4_z2_runaway: {
      npc: null,
      prompt: "🎬 ENDING: He disappears. New name, new life, same ghosts.",
      choices: []
    },
    scene4_z2_revenge: {
      npc: null,
      prompt: "🎬 ENDING: Zeke gets payback — but loses himself completely.",
      choices: []
    },
    scene4_z2_reset: {
      npc: null,
      prompt: "🎬 ENDING: He walks away. Peace over pride.",
      choices: []
    },
    scene4_z2_chase: {
      npc: null,
      prompt: "🎬 ENDING: He finds her — love, danger, and betrayal collide in one last night.",
      choices: []
    },
    scene4_z2_heartbreak: {
      npc: null,
      prompt: "🎬 ENDING: He loses her, but gains peace.",
      choices: []
    },
    scene4_z2_confession: {
      npc: null,
      prompt: "🎬 ENDING: The truth breaks them — or maybe saves them both.",
      choices: []
    },
    scene4_z2_cutoff: {
      npc: null,
      prompt: "🎬 ENDING: Zeke walks away — she’s the one story he can’t forget.",
      choices: []
    },
    scene1_z: {
      npc: { name: 'Zeke', role: 'Mechanical Engineer', avatar: '👨‍🔧' },
      prompt: "🎓 Zeke just graduated with a degree in Mechanical Engineering. Family’s proud, friends are hyped — but he has no job lined up. His controller is calling, but so is real life.",
      choices: [
        { outcome: 'mechanic', label: '🔧 Take a job at a local car shop', description: 'Work as a mechanic', emoji: '🔧', journalEntry: "Started working at the shop. Not glamorous, but it’s a start." },
        { outcome: 'startup', label: '💡 Try starting his own tech-mech startup', description: 'Go all-in on innovation', emoji: '💡', journalEntry: "Risking it all to build something big." },
        { outcome: 'basement', label: '🎮 Take a “short break” gaming in his dad’s basement', description: 'Procrastinate with purpose', emoji: '🎮', journalEntry: "Just gaming for a bit… what’s the worst that could happen?" }
      ]
    },
    scene2_z_mechanic: {
      npc: { name: 'Boss', role: 'Shop Owner', avatar: '👨‍🔧' },
      prompt: "🔧 Zeke starts working at a small auto repair shop. It’s honest work — long hours, greasy hands, good people. But he’s starting to feel stuck.",
      choices: [
        { outcome: 'owner', label: '🧰 Stick with it and aim to open his own garage', description: 'Play the long game', emoji: '🧰', journalEntry: "Grinding for my own future garage." },
        { outcome: 'mods', label: '🔋 Use his engineering skills to design car mods', description: 'Get creative and innovative', emoji: '🔋', journalEntry: "Started tinkering with custom car mods. This could be something big." }
      ]
    },

    scene2_z_startup: {
      npc: { name: 'Investor', role: 'Angel Investor', avatar: '💼' },
      prompt: "💡 Zeke pitches a startup idea — smart tools for mechanics. Investors like it, but funds are tight. He’s burning through savings fast.",
      choices: [
        { outcome: 'pitch', label: '🚀 Double down and chase funding', description: 'Go all-in for investors', emoji: '🚀', journalEntry: "Flying to meet VCs. Sleep is optional." },
        { outcome: 'freelance', label: '⚙️ Take freelance gigs to survive', description: 'Balance passion and stability', emoji: '⚙️', journalEntry: "Freelancing to keep my dream alive." }
      ]
    },

    scene2_z_basement: {
      npc: { name: 'Dad', role: 'Father', avatar: '👨‍🦳' },
      prompt: "🎮 Zeke moves back home, saying it’s 'temporary.' Days turn into weeks. He games, applies to jobs, and questions everything.",
      choices: [
        { outcome: 'focus', label: '🎯 Get serious about job hunting', description: 'Time to face reality', emoji: '🎯', journalEntry: "Enough gaming. Gotta lock in and find something real." },
        { outcome: 'stream', label: '🕹️ Start streaming his gameplay', description: 'Turn gaming into a side hustle', emoji: '🕹️', journalEntry: "Streaming for fun — maybe this could go somewhere?" }
      ]
    },
    scene3_z_mechanic_owner: {
      npc: { name: 'Customer', role: 'Regular Client', avatar: '🚗' },
      prompt: "🧰 Zeke saves up and opens 'Zeke’s Auto & Performance.' Business is slow, but steady. He’s proud, but tired.",
      choices: [
        { outcome: 'expand', label: '🧠 Hire a team and expand', description: 'Go big or go home', emoji: '🧠', journalEntry: "Thinking about hiring help. Time to scale up." },
        { outcome: 'special', label: '🛠️ Stay small and specialize in high-end repairs', description: 'Quality over quantity', emoji: '🛠️', journalEntry: "Going niche — fewer cars, more quality." }
      ]
    },

    scene3_z_mechanic_mods: {
      npc: { name: 'Fan', role: 'Online Supporter', avatar: '💬' },
      prompt: "💻 Zeke starts designing custom engine parts using 3D software. Online forums love his work.",
      choices: [
        { outcome: 'store', label: '💻 Launch an online store', description: 'Monetize the mods', emoji: '💻', journalEntry: "Building an online shop for my designs." },
        { outcome: 'compete', label: '🏎️ Enter car shows and competitions', description: 'Prove himself on the stage', emoji: '🏎️', journalEntry: "Signed up for a car mod show. Time to show off my work." }
      ]
    },

    scene3_z_startup_pitch: {
      npc: { name: 'Investor', role: 'Venture Capitalist', avatar: '💰' },
      prompt: "🚀 Zeke lands a small investor, but pressure skyrockets. He’s coding, designing, managing — all on fumes.",
      choices: [
        { outcome: 'pivot', label: '💡 Pivot the product to target garages directly', description: 'Change direction', emoji: '💡', journalEntry: "Pivoting toward real mechanics. Let’s make this practical." },
        { outcome: 'pause', label: '😔 Take a break before burning out', description: 'Step back before breaking down', emoji: '😔', journalEntry: "Gotta breathe. Can’t innovate if I crash." }
      ]
    },

    scene3_z_startup_freelance: {
      npc: { name: 'Client', role: 'Corporate Contact', avatar: '📈' },
      prompt: "⚙️ Zeke takes mechanical design contracts. It’s steady but boring — until one client wants to license his idea.",
      choices: [
        { outcome: 'sell', label: '🧾 Sell the concept', description: 'Cash out now', emoji: '🧾', journalEntry: "Thinking about selling my idea. Quick money or long game?" },
        { outcome: 'keep', label: '🧠 Keep ownership and build it slowly', description: 'Play the long-term strategy', emoji: '🧠', journalEntry: "Keeping my idea. This is my legacy." }
      ]
    },

    scene3_z_basement_focus: {
      npc: { name: 'Recruiter', role: 'HR Rep', avatar: '👩‍💼' },
      prompt: "💼 Zeke lands interviews but keeps second-guessing himself. Every rejection feels heavier.",
      choices: [
        { outcome: 'job', label: '💼 Keep applying and stay persistent', description: 'Persistence pays', emoji: '💼', journalEntry: "Still applying. Gotta believe something will land." },
        { outcome: 'pivot', label: '🧩 Decide to change industries completely', description: 'Try something new', emoji: '🧩', journalEntry: "Maybe engineering isn’t my only path. Thinking about game design." }
      ]
    },

    scene3_z_basement_stream: {
      npc: { name: 'Viewer', role: 'Subscriber', avatar: '💻' },
      prompt: "🎬 Zeke starts streaming for fun — people actually like his commentary and car knowledge. His channel grows fast.",
      choices: [
        { outcome: 'full', label: '🎬 Go full-time as a gaming creator', description: 'Take the content path', emoji: '🎬', journalEntry: "Streaming full-time. Never thought this would blow up." },
        { outcome: 'mix', label: '🔧 Blend gaming with car repair tutorials', description: 'Create something unique', emoji: '🔧', journalEntry: "Mixing gaming and mechanics — my two worlds collide." }
      ]
    },
    scene4_z_mechanic_expand: { npc: null, prompt: "🎬 ENDING: Zeke builds a full team. 'Zeke’s Garage' becomes a trusted local name. He learns that leadership is harder than labor, but worth it.", choices: [] },
    scene4_z_mechanic_special: { npc: null, prompt: "🎬 ENDING: Zeke stays small but earns fame in the tuner world. Passion over profit — the grind pays off.", choices: [] },
    scene4_z_mods_store: { npc: null, prompt: "🎬 ENDING: His online custom parts shop explodes. Zeke becomes the gamer engineer-turned-innovator.", choices: [] },
    scene4_z_mods_compete: { npc: null, prompt: "🎬 ENDING: Zeke wins a national car mod competition. Recognition, finally — and the respect of his peers.", choices: [] },
    scene4_z_startup_pivot: { npc: null, prompt: "🎬 ENDING: Zeke pivots smart, nails product-market fit, and lands a big client. Smart risks pay off.", choices: [] },
    scene4_z_startup_pause: { npc: null, prompt: "🎬 ENDING: Zeke steps back, recharges, and comes back stronger. Success takes patience.", choices: [] },
    scene4_z_startup_sell: { npc: null, prompt: "🎬 ENDING: Zeke sells his concept — not rich, but debt-free and experienced.", choices: [] },
    scene4_z_startup_keep: { npc: null, prompt: "🎬 ENDING: He builds slow, steady, and sustainably — no shortcuts, just progress.", choices: [] },
    scene4_z_basement_job: { npc: null, prompt: "🎬 ENDING: Persistence pays. Zeke lands his first engineering job — his journey begins for real.", choices: [] },
    scene4_z_basement_pivot: { npc: null, prompt: "🎬 ENDING: Zeke shifts to game design — mechanical mind, digital heart.", choices: [] },
    scene4_z_stream_full: { npc: null, prompt: "🎬 ENDING: 'The Mechanic Gamer' becomes a viral hit. Zeke turns fun into fortune.", choices: [] },
    scene4_z_stream_mix: { npc: null, prompt: "🎬 ENDING: Zeke blends gaming and mechanics — millions tune in for his unique style. He’s finally found balance.", choices: [] },
    scene1: {
      npc: { name: 'Cassey', role: 'Recent Graduate', avatar: '👩‍💼' },
      prompt: "🎓 Cassey (22) just graduated with a journalism degree in Chicago. She's staring at her cracked phone, weighing three impossible paths:\n\n1. Move to Minnesota with her pothead boyfriend.\n2. Return to Connecticut to live with her abusive mom and work in the family bakery.\n3. Stay in Chicago and take a $32k newsroom job.\n\nWhat should Cassey do?",
      choices: [
        { 
          outcome: 'minnesota', 
          label: '🌬️ Move to Minnesota',
          description: 'Move in with her boyfriend',
          emoji: '🌬️',
          journalEntry: "I chose Minnesota. Time to move in with Zeke."
        },
        { 
          outcome: 'connecticut', 
          label: '🍞 Return to CT bakery',
          description: 'Go back home to Connecticut',
          emoji: '🍞',
          journalEntry: "Connecticut it is! Back to the family bakery."
        },
        { 
          outcome: 'chicago', 
          label: '📰 Stay in Chicago',
          description: 'Take the newsroom job',
          emoji: '📰',
          journalEntry: "Chicago wins! Taking the journalism job."
        }
      ]
    },
    scene2_minnesota: {
      npc: { name: 'Zeke', role: 'Boyfriend', avatar: '👨' },
      prompt: "🌬️ Cassey moves in with her pothead boyfriend. The apartment smells like weed and ramen. He forgot to pay rent. What now?",
      choices: [
        { 
          outcome: 'stay', 
          label: 'Suck it up, where else would I go?!',
          description: 'Try to make it work',
          emoji: '💚',
          journalEntry: "I'm staying. Maybe it'll get better."
        },
        { 
          outcome: 'leave', 
          label: '🚪 Make a plan to leave him',
          description: 'Start planning an exit',
          emoji: '🚪',
          journalEntry: "I need to leave. Time to make a plan."
        }
      ]
    },
    scene2_connecticut: {
      npc: { name: 'Mom', role: 'Mother', avatar: '👩' },
      prompt: "🍞 Cassey returns to Connecticut. Her mom critiques her posture while frosting cupcakes. Her stepdad calls her 'kiddo' and hands her a mop. What now?",
      choices: [
        { 
          outcome: 'bake', 
          label: '🧁 Bake and bear it',
          description: 'Stay and work at the bakery',
          emoji: '🧁',
          journalEntry: "I'll stay and work. Maybe I can make this bearable."
        },
        { 
          outcome: 'escape', 
          label: '📦 Pack and vanish',
          description: 'Leave without looking back',
          emoji: '📦',
          journalEntry: "I'm leaving. Can't stay here anymore."
        }
      ]
    },
    scene2_chicago: {
      npc: { name: 'Editor', role: 'News Editor', avatar: '👨‍💼' },
      prompt: "📰 Cassey stays in Chicago. She's editing obits in a freezing newsroom with a broken heater. Her boss calls her 'temporary hire.' What now?",
      choices: [
        { 
          outcome: 'pitch', 
          label: '💻 Suck it up, this is work life',
          description: 'Keep pushing in journalism',
          emoji: '💻',
          journalEntry: "This is what work is. I'll push through."
        },
        { 
          outcome: 'grad', 
          label: '🧣 Learn a new skill',
          description: 'Try something different',
          emoji: '🧣',
          journalEntry: "Time to learn something new. Maybe coding?"
        }
      ]
    },
    scene3_minnesota_stay: {
      npc: { name: 'Zeke', role: 'Boyfriend', avatar: '👨' },
      prompt: "💚 Three months in. Zeke promises he'll change. The apartment now has a motivational poster that says 'Rent is Temporary, Love is Forever.' What's Cassey's move?",
      choices: [
        { 
          outcome: 'therapy', 
          label: '🛋️ Try couples therapy',
          description: 'Give it a chance with therapy',
          emoji: '🛋️',
          journalEntry: "We're trying therapy. Maybe things can change."
        },
        { 
          outcome: 'business', 
          label: '💼 Start a side hustle',
          description: 'Focus on building independence',
          emoji: '💼',
          journalEntry: "Starting my own thing. I need backup options."
        }
      ]
    },
    scene3_minnesota_leave: {
      npc: { name: 'Friend', role: 'Supportive Friend', avatar: '👤' },
      prompt: "🎒 Cassey left. She's got $1,200 in savings and a friend's couch for two weeks max. Minneapolis is expensive and she knows exactly one person here. What now?",
      choices: [
        { 
          outcome: 'apartment', 
          label: '🏠 Get a tiny studio',
          description: 'Find her own place',
          emoji: '🏠',
          journalEntry: "Found a tiny studio. It's mine and that's what matters."
        },
        { 
          outcome: 'roommate', 
          label: '🤝 Find a roommate',
          description: 'Share expenses with someone',
          emoji: '🤝',
          journalEntry: "Found a roommate. Let's see how this goes."
        }
      ]
    },
    scene3_connecticut_bake: {
      npc: { name: 'Mom', role: 'Mother', avatar: '👩' },
      prompt: "🧁 Six months of baking. Cassey's getting really good at it, but her mom takes credit for everything. A food blogger wants to feature the bakery. What's the play?",
      choices: [
        { 
          outcome: 'recipe', 
          label: '📱 Post on TikTok',
          description: 'Build her own following',
          emoji: '📱',
          journalEntry: "Starting my own TikTok. Time to build my brand."
        },
        { 
          outcome: 'manager', 
          label: '👔 Ask for promotion',
          description: 'Try to advance in the bakery',
          emoji: '👔',
          journalEntry: "Asked to be assistant manager. Time to step up."
        }
      ]
    },
    scene3_connecticut_escape: {
      npc: { name: 'Sarah', role: 'College Friend', avatar: '👩‍🦰' },
      prompt: "🚗 Cassey's driving with no plan. She's got $800, a suitcase, and a Spotify road trip playlist. Her phone keeps buzzing with texts from Mom. Where to?",
      choices: [
        { 
          outcome: 'road', 
          label: '🌊 Random beach town',
          description: 'Head somewhere new',
          emoji: '🌊',
          journalEntry: "Driving to a random beach town. Adventure awaits."
        },
        { 
          outcome: 'friend', 
          label: '🏡 Stay with Sarah',
          description: 'Crash with her friend in Boston',
          emoji: '🏡',
          journalEntry: "Heading to Boston. Sarah said I can crash."
        }
      ]
    },
    scene3_chicago_pitch: {
      npc: { name: 'Editor', role: 'News Editor', avatar: '👨‍💼' },
      prompt: "📰 Cassey's investigative piece on Chicago's food desert crisis gets 50K views. Her editor pretends not to care. A nonprofit offers her a communications job for 45K. Stay or go?",
      choices: [
        { 
          outcome: 'viral', 
          label: '🔥 Pitch a series',
          description: 'Keep pushing at the paper',
          emoji: '🔥',
          journalEntry: "Pitching a whole series. Going all in on journalism."
        },
        { 
          outcome: 'fired', 
          label: '💼 Take nonprofit job',
          description: 'Take the better offer',
          emoji: '💼',
          journalEntry: "Taking the nonprofit job. Better pay, better mission."
        }
      ]
    },
    scene3_chicago_grad: {
      npc: { name: 'Mentor', role: 'Bootcamp Instructor', avatar: '👨‍💻' },
      prompt: "💻 Cassey finishes a 12-week Python bootcamp. She can now write 'Hello World' and has a portfolio website. Tech recruiters are flooding her LinkedIn. What's next?",
      choices: [
        { 
          outcome: 'bootcamp', 
          label: '🎓 Apply to dev jobs',
          description: 'Become a full-time developer',
          emoji: '🎓',
          journalEntry: "Applying to dev jobs. Time for a career pivot."
        },
        { 
          outcome: 'pivot', 
          label: '🔄 Data journalism',
          description: 'Combine coding and journalism',
          emoji: '🔄',
          journalEntry: "Data journalism! Best of both worlds."
        }
      ]
    },
    scene4_minnesota_stay_therapy: {
      npc: null,
      prompt: "🎬 ENDING: The YouTube therapist was actually pretty helpful. Zeke got a job. They're in a better place. Cassey's still not sure this is forever, but it's okay for now. She learned she can't fix people, but she can set boundaries.",
      choices: []
    },
    scene4_minnesota_stay_business: {
      npc: null,
      prompt: "🎬 ENDING: Cassey's Etsy shop 'Survived and Thriving' makes $2K/month. She moves into her own place but stays with Zeke... kind of. They're 'figuring it out.' She's learning that independence doesn't mean loneliness.",
      choices: []
    },
    scene4_minnesota_leave_apartment: {
      npc: null,
      prompt: "🎬 ENDING: Cassey's studio apartment is 400 sq ft of freedom. She eats ramen and writes in coffee shops. She's lonely sometimes, but she's hers. She got a job at a local newspaper. It's not much, but it's hers.",
      choices: []
    },
    scene4_minnesota_leave_roommate: {
      npc: null,
      prompt: "🎬 ENDING: The roommate with taxidermy turned out to be cool. They became friends. Cassey learned that taking risks on people can pay off. She's working at a marketing agency and saving up. Life's weird but good.",
      choices: []
    },
    scene4_connecticut_bake_recipe: {
      npc: null,
      prompt: "🎬 ENDING: Cassey's TikTok blew up. 500K followers. She got a cookbook deal. Her mom is furious but also secretly proud. Cassey moved out and opened her own bakery. She's still healing, but she's FREE.",
      choices: []
    },
    scene4_connecticut_bake_manager: {
      npc: null,
      prompt: "🎬 ENDING: Assistant manager at 23. Cassey's making decent money and learned to set boundaries with her mom (mostly). It's not her dream, but she's good at it. Sometimes 'fine' is enough while you figure out what's next.",
      choices: []
    },
    scene4_connecticut_escape_road: {
      npc: null,
      prompt: "🎬 ENDING: Cassey ended up in a random beach town in Rhode Island. She works at a surf shop and writes poetry at sunset. She's broke and happy. She learned that running away isn't always bad—sometimes it's survival.",
      choices: []
    },
    scene4_connecticut_escape_friend: {
      npc: null,
      prompt: "🎬 ENDING: Boston with Sarah was chaos. Three cats, constant noise, but also laughter. Cassey got a job at a bookstore and started therapy. She's rebuilding. She learned that asking for help isn't weakness.",
      choices: []
    },
    scene4_chicago_pitch_viral: {
      npc: null,
      prompt: "🎬 ENDING: Cassey's series won a local journalism award. She's still at the paper making $38K, but she's writing stories that matter. Her editor finally called her by her actual name. She learned that persistence beats talent.",
      choices: []
    },
    scene4_chicago_pitch_fired: {
      npc: null,
      prompt: "🎬 ENDING: Turns out she got fired for refusing to kill a story. She's freelancing now, making MORE money. She learned that getting fired isn't failure—sometimes it's redirection. She's pitching to national outlets.",
      choices: []
    },
    scene4_chicago_grad_bootcamp: {
      npc: null,
      prompt: "🎬 ENDING: Junior dev at a startup. $65K salary. Cassey codes all day and occasionally misses writing, but her bank account doesn't. She learned that pivoting isn't giving up—it's adapting. She might go back to journalism someday.",
      choices: []
    },
    scene4_chicago_grad_pivot: {
      npc: null,
      prompt: "🎬 ENDING: Data journalist at a major publication. Cassey combines coding and storytelling. She's making $55K and loving it. She learned that you don't have to choose between passions—you can merge them. She's exactly where she needs to be.",
      choices: []
    }
  };

  const getCurrentNPC = () => scenarios[sceneId]?.npc;
  const getCurrentPrompt = () => scenarios[sceneId]?.prompt;
  const getCurrentChoices = () => scenarios[sceneId]?.choices || [];

  const handleChoice = (outcome) => {
    const choice = getCurrentChoices().find(c => c.outcome === outcome);
    if (choice && choice.journalEntry) {
      setJournal(prev => [...prev, choice.journalEntry]);
    }

    // =========================
    // CASSEY PATH
    // =========================
    if (sceneId === 'scene1') {
      // scene1 -> scene2_minnesota / scene2_connecticut / scene2_chicago
      setSceneId(`scene2_${outcome}`);
      return;
    } else if (
      sceneId.startsWith('scene2_') &&
      !sceneId.startsWith('scene2_z_') &&
      !sceneId.startsWith('scene2_z2_')
    ) {
      // scene2_<location> -> scene3_<location>_<outcome>
      const location = sceneId.replace('scene2_', '');
      setSceneId(`scene3_${location}_${outcome}`);
      return;
    } else if (
      sceneId.startsWith('scene3_') &&
      !sceneId.startsWith('scene3_z_') &&
      !sceneId.startsWith('scene3_z2_')
    ) {
      // scene3_<path> -> scene4_<path>_<outcome>
      const path = sceneId.replace('scene3_', '');
      setSceneId(`scene4_${path}_${outcome}`);
      return;
    }

    // =========================
    // ZEKE EPISODE 1 (scene1_z)
    // =========================
    if (sceneId === 'scene1_z') {
      // scene1_z -> scene2_z_mechanic / scene2_z_startup / scene2_z_basement
      setSceneId(`scene2_z_${outcome}`);
      return;
    } else if (sceneId.startsWith('scene2_z_')) {
      // scene2_z_<path> -> scene3_z_<path>_<outcome>
      // e.g. scene2_z_mechanic + 'owner' -> scene3_z_mechanic_owner
      const path = sceneId.replace('scene2_z_', '');
      setSceneId(`scene3_z_${path}_${outcome}`);
      return;
    } else if (sceneId.startsWith('scene3_z_')) {
      // Map each scene3_z_* + outcome -> correct scene4_z_* id
      let nextId = null;

      if (sceneId === 'scene3_z_mechanic_owner') {
        if (outcome === 'expand') nextId = 'scene4_z_mechanic_expand';
        if (outcome === 'special') nextId = 'scene4_z_mechanic_special';
      } else if (sceneId === 'scene3_z_mechanic_mods') {
        if (outcome === 'store') nextId = 'scene4_z_mods_store';
        if (outcome === 'compete') nextId = 'scene4_z_mods_compete';
      } else if (sceneId === 'scene3_z_startup_pitch') {
        if (outcome === 'pivot') nextId = 'scene4_z_startup_pivot';
        if (outcome === 'pause') nextId = 'scene4_z_startup_pause';
      } else if (sceneId === 'scene3_z_startup_freelance') {
        if (outcome === 'sell') nextId = 'scene4_z_startup_sell';
        if (outcome === 'keep') nextId = 'scene4_z_startup_keep';
      } else if (sceneId === 'scene3_z_basement_focus') {
        if (outcome === 'job') nextId = 'scene4_z_basement_job';
        if (outcome === 'pivot') nextId = 'scene4_z_basement_pivot';
      } else if (sceneId === 'scene3_z_basement_stream') {
        if (outcome === 'full') nextId = 'scene4_z_stream_full';
        if (outcome === 'mix') nextId = 'scene4_z_stream_mix';
      }

      if (nextId) {
        setSceneId(nextId);
      }
      return;
    }

    // =========================
    // ZEKE EPISODE 2 (scene1_z2)
    // =========================
    if (sceneId === 'scene1_z2') {
      // scene1_z2 -> scene2_z2_flashlife / scene2_z2_lowkey / scene2_z2_romance
      setSceneId(`scene2_z2_${outcome}`);
      return;
    } else if (sceneId.startsWith('scene2_z2_')) {
      // scene2_z2_* -> scene3_z2_<outcome>
      // e.g. from scene2_z2_flashlife + 'pimp' -> scene3_z2_pimp
      setSceneId(`scene3_z2_${outcome}`);
      return;
    } else if (sceneId.startsWith('scene3_z2_')) {
      // scene3_z2_* -> scene4_z2_<outcome>
      // e.g. scene3_z2_pimp + 'escape' -> scene4_z2_escape
      setSceneId(`scene4_z2_${outcome}`);
      return;
    }
};

  // LOGIN VIEW
  // const hasProgress = !!(selectedEpisode || selectedSeason);
  if (!currentUser) {
  return <LoginScreen onLogin={handleLogin} />;
}

if (showDashboard) {
  return (
    <PostLoginDashboard
      username={currentUser}
      onResetAccount={handleResetAccount}
      onContinue={handleContinue}
      onExploreCommunities={handleExploreCommunities}
      onLogout={handleLogout}
      hasProgress={hasProgress}
    />
  );
}

if (showCommunities && currentUser) {
  return (
    <CommunitiesExplorer
      username={currentUser}
      onBack={() => {
        setShowCommunities(false);
        setShowDashboard(true);
      }}
      onSelectCommunity={handleSelectCommunity}
      onLogout={handleLogout}      /* ⬅️ add this */
    />
  );
}

if (sceneId === 'seasons') {
  return (
    <SeasonsSelection
      onSelectSeason={handleSelectSeason}
      onBack={() => {
        // setSelectedCommunity(null);
        setShowCommunities(true);
      }}
      username={currentUser}
      communityId={selectedCommunity?.id}
      onLogout={handleLogout}      /* ⬅️ add this */
    />
  );
}

if (sceneId === 'episodes') {
  return (
    <EpisodesSelection
      seasonId={selectedSeason}
      onSelectEpisode={handleSelectEpisode}
      onBack={() => {
        //setSceneId('seasons');
        //setSelectedEpisode(null);
        handleBackToSeasons();
      }}
      username={currentUser}
      onLogout={handleLogout}      /* ⬅️ add this */
    />
  );
}

  // GAME SCENES
  if (scenarios[sceneId]) {
    // MAIN GAME VIEW (Direct Choice)
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
          <div className="max-w-7xl w-full">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handleBackToDashboard}
                className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={handleLogout}
                title="Logout and save progress"
                className="group bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <span>👤 {currentUser}</span>
                <LogOut className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl animate-fadeIn h-[280px]">
                  <div className="bg-gray-700 rounded-t-lg px-3 py-2 flex items-center gap-2 mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-300 font-mono">reddilife.blog/cassey</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 h-[200px] overflow-y-auto shadow-inner">
                    <h2 className="text-xl font-bold mb-3 text-purple-600 flex items-center gap-2">
                      <span>💻</span> The ReddiLife Blog
                    </h2>
                    <div className="space-y-2">
                      {journal.map((entry, index) => (
                        <div key={index} className="animate-typing">
                          <p className="text-sm text-gray-700 font-mono leading-relaxed border-l-2 border-purple-300 pl-2">
                            <span className="text-purple-500 font-bold">Entry {index + 1}:</span> {entry}
                          </p>
                        </div>
                      ))}
                      <span className="inline-block w-2 h-4 bg-purple-500 animate-blink"></span>
                    </div>
                  </div>
                </div>

                <Scene
                  npc={getCurrentNPC()}
                  prompt={getCurrentPrompt()}
                  choices={[]}
                  onChoose={handleChoice}
                  showScenarioOnly={true}
                />

                <div className="space-y-4">
                  <Scene
                    choices={getCurrentChoices()}
                    prompt=""
                    onChoose={handleChoice}
                    showChoicesOnly={true}
                  />

                  <button
                    onClick={() => {
                      setSceneId('episodes');
                      setJournal([]);
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                  >
                    🔄 Back to Episodes
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <SceneImage sceneId={sceneId} />
              </div>
            </div>
          </div>

          <style>{styles}</style>
        </div>

        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-40"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        <LiveChat 
          sceneId={sceneId} 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          persistentMessages={persistentMessages}
          onMessagesUpdate={setPersistentMessages}
          currentUsername={currentUser}
        />
      </>
    );
  }

  return null;
}
