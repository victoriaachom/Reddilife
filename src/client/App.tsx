import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, User, RefreshCw, Play, Compass, LogOut, Search, Plus, Heart, Trophy, Briefcase, Smile, Gamepad2, Check, ArrowLeft, Users, Star, Baby } from 'lucide-react';

// ============================================
// SCENE IMAGE HELPER FUNCTION
// ============================================
const getSceneImage = (sceneId) => {
  const sceneImages = {
    'scene1': '/assets/Cassey.jpg',
    'scene2_minnesota': '/assets/scene2_minnesota 2.png',
    'scene2_connecticut': '/assets/scene2_connecticut 2.png',
    'scene2_chicago': '/assets/scene2_chicago 2.png',
    'scene3_minnesota_stay': '/assets/scene3_minnesota_stay 2.png',
    'scene3_minnesota_leave': '/assets/scene3_minnesota_leave 2.png',
    'scene3_connecticut_bake': '/assets/scene3_connecticut_bake 2.png',
    'scene3_connecticut_escape': '/assets/scene3_connecticut_escape 2.png',
    'scene3_chicago_pitch': '/assets/scene3_chicago_pitch 2.png',
    'scene3_chicago_grad': '/assets/scene3_chicago_grad 2.png',
    'scene4_minnesota_stay_therapy': '/assets/scene4_minnesota_stay_therapy 2.png',
    'scene4_minnesota_stay_business': '/assets/scene4_minnesota_stay_business 2.png',
    'scene4_minnesota_leave_apartment': '/assets/scene4_minnesota_leave_apartment 2.png',
    'scene4_minnesota_leave_roommate': '/assets/scene4_minnesota_leave_apartment 2.png',
    'scene4_connecticut_bake_recipe': '/assets/scene4_connecticut_bake_recipe 2.png',
    'scene4_connecticut_bake_manager': '/assets/scene4_connecticut_bake_manager 2.png',
    'scene4_connecticut_escape_road': '/assets/scene4_connecticut_escape_road 2.png',
    'scene4_connecticut_escape_friend': '/assets/scene4_connecticut_escape_road 2.png',
    'scene4_chicago_pitch_viral': '/assets/scene4_chicago_pitch_fired.png',
    'scene4_chicago_pitch_fired': '/assets/scene4_chicago_pitch_fired.png',
    'scene4_chicago_grad_bootcamp': '/assets/scene4_chicago_grad_pivot.png',
    'scene4_chicago_grad_pivot': '/assets/scene4_chicago_grad_pivot.png',
  };
  
  return sceneImages[sceneId] || '/assets/Cassey.jpg';
};

// ============================================
// SCENE IMAGE COMPONENT
// ============================================
const SceneImage = ({ sceneId }) => {
  const imageSrc = getSceneImage(sceneId);
  
  return (
    <div className="bg-white rounded-2xl p-4 shadow-2xl animate-fadeIn w-full h-[800px] overflow-hidden">
      <img 
        src={imageSrc} 
        alt={`Scene ${sceneId}`}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          e.target.src = '/assets/Cassey.jpg';
          e.target.onerror = null;
        }}
      />
    </div>
  );
};

// ============================================
// LOGIN SCREEN COMPONENT
// ============================================
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [gifTimestamp, setGifTimestamp] = useState(Date.now());

  // Force GIFs to reload every 5 seconds to ensure continuous animation
  useEffect(() => {
    const interval = setInterval(() => {
      setGifTimestamp(Date.now());
    }, 5000);
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
          src={`/assets/intro_cassey.gif?t=${gifTimestamp}`}
          alt="Cassey"
          className="h-96 w-auto object-contain"
          key={gifTimestamp}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Right GIF - Zeke */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block animate-fadeIn">
        <img 
          src={`/assets/intro_zeke.gif?t=${gifTimestamp}`}
          alt="Zeke"
          className="h-96 w-auto object-contain"
          key={gifTimestamp}
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

// ============================================
// POST-LOGIN DASHBOARD COMPONENT
// ============================================
const PostLoginDashboard = ({ username, onResetAccount, onContinue, onExploreCommunities, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, callback) => {
    setSelectedOption(option);
    setTimeout(() => {
      callback();
    }, 300);
  };

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
            className={`option-card bg-white rounded-2xl p-8 shadow-xl cursor-pointer animate-slideIn ${selectedOption === 'continue' ? 'selected' : ''}`}
            onClick={() => handleOptionClick('continue', onContinue)}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Continue Your Story
            </h2>
            <p className="text-gray-600">
              Pick up where you left off in your current adventure
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
const CommunitiesExplorer = ({ username, onBack, onSelectCommunity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedCommunities, setJoinedCommunities] = useState(new Set());

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
      bannerImage: '/assets/Cassey.jpg'
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
    { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = (communityId) => {
    setJoinedCommunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(communityId)) {
        newSet.delete(communityId);
      } else {
        newSet.add(communityId);
      }
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
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
            👤 {username}
          </div>
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
                <div className={`h-32 bg-gradient-to-r ${community.gradient} flex items-center justify-center relative`}>
                  {community.bannerImage ? (
                    <img 
                      src={community.bannerImage} 
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">{community.icon}</div>
                  )}
                  {community.comingSoon && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
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
const EpisodesSelection = ({ seasonId, onSelectEpisode, onBack, username }) => {
  const episodes = {
    'season1': [
      {
        id: 'episode1',
        number: 1,
        title: 'The First Day',
        description: 'Cassey starts her first day at work and faces her first big decision',
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
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
            👤 {username}
          </div>
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
              <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center relative">
                <div className="text-7xl">📺</div>
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
const SeasonsSelection = ({ onSelectSeason, onBack, username }) => {
  const seasons = [
    {
      id: 'season1',
      title: 'Season 1: New Beginnings',
      description: 'Follow Cassey as she navigates her first major life decisions after college',
      episodes: 10,
      thumbnail: '/assets/Cassey.jpg',
      gradient: 'from-purple-400 to-pink-500',
      available: true
    },
    {
      id: 'season2',
      title: 'Season 2: Career Moves',
      description: 'Cassey faces new challenges in her professional life',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-blue-400 to-cyan-500',
      available: false
    },
    {
      id: 'season3',
      title: 'Season 3: Relationships',
      description: 'Love and friendship take center stage in Cassey\'s journey',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-pink-400 to-rose-500',
      available: false
    },
    {
      id: 'season4',
      title: 'Season 4: Major Changes',
      description: 'Life-changing decisions await as Cassey reaches a crossroads',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-green-400 to-emerald-500',
      available: false
    },
    {
      id: 'season5',
      title: 'Season 5: New Horizons',
      description: 'The final chapter of Cassey\'s incredible journey',
      episodes: 10,
      thumbnail: null,
      gradient: 'from-orange-400 to-red-500',
      available: false
    }
  ];

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
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
            👤 {username}
          </div>
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
          {seasons.map((season) => (
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
  const [sceneId, setSceneId] = useState('seasons');
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [journal, setJournal] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [persistentMessages, setPersistentMessages] = useState({});

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
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowDashboard(false);
    setShowCommunities(false);
    setSelectedCommunity(null);
    setSceneId('seasons');
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setJournal([]);
    setPersistentMessages({});
  };

  const handleResetAccount = () => {
    if (window.confirm('Are you sure you want to start fresh? This will reset all your progress.')) {
      setSceneId('seasons');
      setSelectedSeason(null);
      setSelectedEpisode(null);
      setJournal([]);
      setShowDashboard(false);
      setShowCommunities(false);
      setSelectedCommunity(null);
    }
  };

  const handleContinue = () => {
    setShowDashboard(false);
    if (!selectedSeason) {
      setSceneId('seasons');
    }
  };

  const handleExploreCommunities = () => {
    setShowDashboard(false);
    setShowCommunities(true);
  };

  const handleSelectCommunity = (community) => {
    setSelectedCommunity(community);
    setShowCommunities(false);
    setSceneId('seasons');
  };

  const handleBackToCommunities = () => {
    setSceneId('seasons');
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setSelectedCommunity(null);
    setShowCommunities(true);
  };

  const handleSelectSeason = (seasonId) => {
    setSelectedSeason(seasonId);
    setSceneId('episodes');
  };

  const handleBackToSeasons = () => {
    setSceneId('seasons');
    setSelectedEpisode(null);
  };

  const handleSelectEpisode = (episodeId) => {
    setSelectedEpisode(episodeId);
    setSceneId('scene1');
  };

  const scenarios = {
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
    
    // Navigate to next scene based on current scene and choice
    if (sceneId === 'scene1') {
      setSceneId(`scene2_${outcome}`);
    } else if (sceneId.startsWith('scene2_')) {
      const location = sceneId.replace('scene2_', '');
      setSceneId(`scene3_${location}_${outcome}`);
    } else if (sceneId.startsWith('scene3_')) {
      const path = sceneId.replace('scene3_', '');
      setSceneId(`scene4_${path}_${outcome}`);
    }
  };

  // LOGIN VIEW
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // DASHBOARD VIEW
  if (showDashboard) {
    return (
      <PostLoginDashboard
        username={currentUser}
        onResetAccount={handleResetAccount}
        onContinue={handleContinue}
        onExploreCommunities={handleExploreCommunities}
        onLogout={handleLogout}
      />
    );
  }

  // COMMUNITIES EXPLORER VIEW
  if (showCommunities) {
    return (
      <CommunitiesExplorer
        username={currentUser}
        onBack={() => setShowDashboard(true)}
        onSelectCommunity={handleSelectCommunity}
      />
    );
  }

  // SEASONS SELECTION VIEW
  if (sceneId === 'seasons') {
    return (
      <SeasonsSelection
        onSelectSeason={handleSelectSeason}
        onBack={handleBackToCommunities}
        username={currentUser}
      />
    );
  }

  // EPISODES SELECTION VIEW
  if (sceneId === 'episodes') {
    return (
      <EpisodesSelection
        seasonId={selectedSeason}
        onSelectEpisode={handleSelectEpisode}
        onBack={handleBackToSeasons}
        username={currentUser}
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
                onClick={handleBackToCommunities}
                className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Explore Communities
              </button>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold">
                👤 {currentUser}
              </div>
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
