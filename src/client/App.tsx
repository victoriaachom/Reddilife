import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

const Scene = ({ 
  prompt, 
  choices, 
  onChoose, 
  npc, 
  showScenarioOnly,
  showChoicesOnly,
  hasVoted
}) => {
  if (showChoicesOnly) {
    return (
      <div className="flex flex-col gap-4">
        {choices.map((choice) => (
          <button
            key={choice.outcome}
            onClick={() => onChoose(choice.outcome)}
            disabled={hasVoted}
            className={`w-full px-6 py-4 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {choice.label}
          </button>
        ))}
      </div>
    );
  }

  if (showScenarioOnly) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 border-2 border-blue-200">
        {npc && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-4 mb-4 rounded-lg shadow-md flex items-start gap-3">
            <img
              src={npc.image}
              alt={`${npc.name} avatar`}
              className="w-12 h-12 rounded-full border-2 border-indigo-300 flex-shrink-0 object-cover"
            />
            <div className="flex-1">
              <div className="text-sm text-gray-600 font-semibold">{npc.name}</div>
              <div className="text-xs text-gray-500 italic">{npc.bio}</div>
              <div className="mt-2 text-md text-gray-800">💬 {npc.reaction}</div>
            </div>
          </div>
        )}
        
        <div className="text-gray-800 text-base whitespace-pre-line leading-relaxed font-medium">
          {prompt}
        </div>
      </div>
    );
  }

  return null;
};

const LiveChat = ({ sceneId, isOpen, onClose, persistentMessages, onMessagesUpdate }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState('');
  const [hasSetUsername, setHasSetUsername] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [persistentMessages]);

  const handleSetUsername = () => {
    if (username.trim()) {
      setHasSetUsername(true);
      const joinMessage = {
        id: Date.now() + Math.random(),
        username: 'System',
        message: `${username} joined the chat!`,
        timestamp: Date.now(),
        isSystem: true
      };
      onMessagesUpdate(prev => [...prev, joinMessage]);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && hasSetUsername) {
      const newMessage = {
        id: Date.now() + Math.random(),
        username: username,
        message: inputMessage,
        timestamp: Date.now(),
        isSystem: false
      };
      
      onMessagesUpdate(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!hasSetUsername) {
        handleSetUsername();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border-2 border-purple-300 flex flex-col max-h-[500px] z-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-bold">Live Chat</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
            {persistentMessages.filter(m => !m.isSystem).length} msgs
          </span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {!hasSetUsername && (
        <div className="p-4 bg-purple-50 border-b border-purple-200">
          <p className="text-sm text-gray-700 mb-2">Enter your username to chat:</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your username..."
              maxLength={20}
              className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              onClick={handleSetUsername}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
            >
              Set
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {persistentMessages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.isSystem
                ? 'text-center text-xs text-gray-500 italic'
                : msg.username === username
                ? 'ml-auto'
                : ''
            } max-w-[85%]`}
          >
            {!msg.isSystem && (
              <div className={`rounded-2xl px-4 py-2 ${
                msg.username === username
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <div className="text-xs font-semibold mb-1 opacity-80">
                  {msg.username}
                </div>
                <div className="text-sm break-words">{msg.message}</div>
                <div className="text-xs opacity-60 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            )}
            {msg.isSystem && msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {hasSetUsername && (
        <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [sceneId, setSceneId] = useState('welcome');
  const [journal, setJournal] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalVoters, setTotalVoters] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [persistentMessages, setPersistentMessages] = useState([
    { id: 0, username: 'System', message: 'Welcome to the chat! Talk to other players here 💬', timestamp: Date.now(), isSystem: true }
  ]);

  useEffect(() => {
    if (sceneId === 'welcome' || showResults) return;
    
    if (timeLeft > 0 && !hasVoted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, hasVoted, showResults, sceneId]);

  const handleChoice = (outcome) => {
    if (sceneId === 'welcome') {
      setSceneId('scene1');
      setTimeLeft(60);
      setHasVoted(false);
      setShowResults(false);
      return;
    }

    if (!hasVoted) {
      setHasVoted(true);
      const currentChoices = getCurrentChoices();
      const initialVotes = {};
      currentChoices.forEach(choice => {
        initialVotes[choice.outcome] = 0;
      });
      
      const simulatedVotes = { ...initialVotes };
      currentChoices.forEach(choice => {
        simulatedVotes[choice.outcome] = Math.floor(Math.random() * 15) + 1;
      });
      simulatedVotes[outcome] += 1;
      
      const total = Object.values(simulatedVotes).reduce((a, b) => a + b, 0);
      setVotes(simulatedVotes);
      setTotalVoters(total);
      setShowResults(true);
    }
  };

  const handleNextScene = () => {
    let nextScene = '';
    let winningOutcome = '';
    let maxVotes = 0;

    Object.entries(votes).forEach(([outcome, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winningOutcome = outcome;
      }
    });

    if (sceneId === 'scene1') {
      nextScene = 'scene2_' + winningOutcome;
    } else if (sceneId.startsWith('scene2_')) {
      nextScene = 'scene3_' + winningOutcome;
    } else if (sceneId.startsWith('scene3_')) {
      nextScene = 'scene4_' + winningOutcome;
    }

    const journalEntries = {
      minnesota: "We chose love over logic. Hope he's worth it.",
      connecticut: "Back to the bakery. Hope no one notices the bruises.",
      chicago: "32k and a broken heater. But it's ours.",
      minnesota_stay: "We cleaned the mess. Maybe we can fix this.",
      minnesota_leave: "We packed our bags. Done being someone's excuse.",
      connecticut_bake: "We baked quietly. Good at disappearing.",
      connecticut_escape: "We left a note on the flour sack. Not coming back.",
      chicago_pitch: "We pitched a story. They laughed. We wrote it anyway.",
      chicago_grad: "We applied to a python course. Journalism can wait.",
      minnesota_stay_therapy: "We went to couples therapy. The therapist fell asleep.",
      minnesota_stay_business: "We started an Etsy shop selling 'I survived my boyfriend' mugs.",
      minnesota_leave_apartment: "Studio apartment, no roommates. Just us and our anxiety.",
      minnesota_leave_roommate: "Our roommate collects taxidermy. At least they pay rent on time.",
      connecticut_bake_recipe: "We created a viral TikTok recipe. Mom says we're 'exploiting the family.'",
      connecticut_bake_manager: "We're the assistant manager now. Mom still corrects our piping technique.",
      connecticut_escape_road: "Road trip with $800 and a dream. The check engine light is on.",
      connecticut_escape_friend: "Crashing on Sarah's couch. She has 3 cats and questionable boundaries.",
      chicago_pitch_viral: "Our story went viral. Boss said 'don't get cocky, kid.'",
      chicago_pitch_fired: "They fired us for 'tone issues.' Freelancing from a coffee shop.",
      chicago_grad_bootcamp: "Bootcamp complete. We debug code and life choices.",
      chicago_grad_pivot: "We're junior devs now. Our impostor syndrome has impostor syndrome.",
    };

    const entry = journalEntries[winningOutcome];
    if (entry) setJournal((prev) => [...prev, entry]);

    setSceneId(nextScene);
    setTimeLeft(60);
    setHasVoted(false);
    setShowResults(false);
    setVotes({});
    setTotalVoters(0);
  };

  const getSceneImage = () => {
    // Map each scene to its specific image with EXACT filenames
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

  const getCurrentPrompt = () => {
    const prompts = {
      scene1: `🎓 Cassey (22) just graduated with a journalism degree in Chicago. She's staring at her cracked phone, weighing three impossible paths:\n\n1. Move to Minnesota with her pothead boyfriend.\n2. Return to Connecticut to live with her abusive mom and work in the family bakery.\n3. Stay in Chicago and take a $32k newsroom job.\n\nWhat should Cassey do?`,
      scene2_minnesota: `🌬️ Cassey moves in with her pothead boyfriend. The apartment smells like weed and ramen. He forgot to pay rent. What now?`,
      scene2_connecticut: `🍞 Cassey returns to Connecticut. Her mom critiques her posture while frosting cupcakes. Her stepdad calls her "kiddo" and hands her a mop. What now?`,
      scene2_chicago: `📰 Cassey stays in Chicago. She's editing obits in a freezing newsroom with a broken heater. Her boss calls her "temporary hire." What now?`,
      scene3_minnesota_stay: `💚 Three months in. Zeke promises he'll change. The apartment now has a motivational poster that says "Rent is Temporary, Love is Forever." What's Cassey's move?`,
      scene3_minnesota_leave: `🎒 Cassey left. She's got $1,200 in savings and a friend's couch for two weeks max. Minneapolis is expensive and she knows exactly one person here. What now?`,
      scene3_connecticut_bake: `🧁 Six months of baking. Cassey's getting really good at it, but her mom takes credit for everything. A food blogger wants to feature the bakery. What's the play?`,
      scene3_connecticut_escape: `🚗 Cassey's driving with no plan. She's got $800, a suitcase, and a Spotify road trip playlist. Her phone keeps buzzing with texts from Mom. Where to?`,
      scene3_chicago_pitch: `📰 Cassey's investigative piece on Chicago's food desert crisis gets 50K views. Her editor pretends not to care. A nonprofit offers her a communications job for 45K. Stay or go?`,
      scene3_chicago_grad: `💻 Cassey finishes a 12-week Python bootcamp. She can now write "Hello World" and has a portfolio website. Tech recruiters are flooding her LinkedIn. What's next?`,
      scene4_minnesota_stay_therapy: `🎬 ENDING: The YouTube therapist was actually pretty helpful. Zeke got a job. They're in a better place. Cassey's still not sure this is forever, but it's okay for now. She learned she can't fix people, but she can set boundaries.`,
      scene4_minnesota_stay_business: `🎬 ENDING: Cassey's Etsy shop "Survived and Thriving" makes $2K/month. She moves into her own place but stays with Zeke... kind of. They're "figuring it out." She's learning that independence doesn't mean loneliness.`,
      scene4_minnesota_leave_apartment: `🎬 ENDING: Cassey's studio apartment is 400 sq ft of freedom. She eats ramen and writes in coffee shops. She's lonely sometimes, but she's hers. She got a job at a local newspaper. It's not much, but it's hers.`,
      scene4_minnesota_leave_roommate: `🎬 ENDING: The roommate with taxidermy turned out to be cool. They became friends. Cassey learned that taking risks on people can pay off. She's working at a marketing agency and saving up. Life's weird but good.`,
      scene4_connecticut_bake_recipe: `🎬 ENDING: Cassey's TikTok blew up. 500K followers. She got a cookbook deal. Her mom is furious but also secretly proud. Cassey moved out and opened her own bakery. She's still healing, but she's FREE.`,
      scene4_connecticut_bake_manager: `🎬 ENDING: Assistant manager at 23. Cassey's making decent money and learned to set boundaries with her mom (mostly). It's not her dream, but she's good at it. Sometimes "fine" is enough while you figure out what's next.`,
      scene4_connecticut_escape_road: `🎬 ENDING: Cassey ended up in a random beach town in Rhode Island. She works at a surf shop and writes poetry at sunset. She's broke and happy. She learned that running away isn't always bad—sometimes it's survival.`,
      scene4_connecticut_escape_friend: `🎬 ENDING: Boston with Sarah was chaos. Three cats, constant noise, but also laughter. Cassey got a job at a bookstore and started therapy. She's rebuilding. She learned that asking for help isn't weakness.`,
      scene4_chicago_pitch_viral: `🎬 ENDING: Cassey's series won a local journalism award. She's still at the paper making $38K, but she's writing stories that matter. Her editor finally called her by her actual name. She learned that persistence beats talent.`,
      scene4_chicago_pitch_fired: `🎬 ENDING: Turns out she got fired for refusing to kill a story. She's freelancing now, making MORE money. She learned that getting fired isn't failure—sometimes it's redirection. She's pitching to national outlets.`,
      scene4_chicago_grad_bootcamp: `🎬 ENDING: Junior dev at a startup. $65K salary. Cassey codes all day and occasionally misses writing, but her bank account doesn't. She learned that pivoting isn't giving up—it's adapting. She might go back to journalism someday.`,
      scene4_chicago_grad_pivot: `🎬 ENDING: Data journalist at a major publication. Cassey combines coding and storytelling. She's making $55K and loving it. She learned that you don't have to choose between passions—you can merge them. She's exactly where she needs to be.`,
    };
    return prompts[sceneId] || '';
  };

  const getCurrentNPC = () => {
    const npcs = {
      scene2_minnesota: { 
        name: "Zeke", 
        bio: "Pothead boyfriend, aspiring DJ, allergic to responsibility", 
        reaction: "Yo babe, I forgot to pay rent again. Can you cover it again?",
        image: "/assets/Zeke.jpg"
      },
      scene2_connecticut: { 
        name: "Mom", 
        bio: "Bakery owner, emotionally manipulative, frosting perfectionist", 
        reaction: "Your posture is terrible. Customers can smell weakness.",
        image: "/assets/Mom.jpg"
      },
      scene2_chicago: { 
        name: "Editor", 
        bio: "Grizzled newsroom vet, drinks cold brew and hard bagels", 
        reaction: "Kid, you're lucky we even hired you. Now fix that tabloid piece.",
        image: "/assets/Editor.jpg"
      },
      scene3_minnesota_stay: { 
        name: "Zeke", 
        bio: "Still hasn't learned what a vacuum is", 
        reaction: "Babe, I signed us up for therapy! ...With a YouTube life coach.",
        image: "/assets/Zeke.jpg"
      },
      scene3_connecticut_bake: { 
        name: "Mom", 
        bio: "Discovered TikTok, thinks she invented social media", 
        reaction: "Why are YOU getting likes! I taught you everything you know!",
        image: "/assets/Mom.jpg"
      },
      scene3_chicago_pitch: { 
        name: "Editor", 
        bio: "Actually impressed but won't admit it", 
        reaction: "Fine. It's good. Don't let it go to your head, temp.",
        image: "/assets/Editor.jpg"
      },
    };
    return npcs[sceneId];
  };

  const getCurrentChoices = () => {
    const choices = {
      scene1: [
        { label: '🌬️ Move to Minnesota', outcome: 'minnesota' },
        { label: '🍞 Return to CT bakery', outcome: 'connecticut' },
        { label: '📰 Stay in Chicago', outcome: 'chicago' },
      ],
      scene2_minnesota: [
        { label: 'Suck it up, where else would I go?!', outcome: 'minnesota_stay' },
        { label: '🚪 Make a plan to leave him', outcome: 'minnesota_leave' },
      ],
      scene2_connecticut: [
        { label: '🧁 Bake and bear it', outcome: 'connecticut_bake' },
        { label: '📦 Pack and vanish', outcome: 'connecticut_escape' },
      ],
      scene2_chicago: [
        { label: '💻 Suck it up, this is work life', outcome: 'chicago_pitch' },
        { label: '🧣 Learn a new skill', outcome: 'chicago_grad' },
      ],
      scene3_minnesota_stay: [
        { label: '🛋️ Try couples therapy', outcome: 'minnesota_stay_therapy' },
        { label: '💼 Start a side hustle', outcome: 'minnesota_stay_business' },
      ],
      scene3_minnesota_leave: [
        { label: '🏠 Get a tiny studio', outcome: 'minnesota_leave_apartment' },
        { label: '🤝 Find a roommate', outcome: 'minnesota_leave_roommate' },
      ],
      scene3_connecticut_bake: [
        { label: '📱 Post on TikTok', outcome: 'connecticut_bake_recipe' },
        { label: '👔 Ask for promotion', outcome: 'connecticut_bake_manager' },
      ],
      scene3_connecticut_escape: [
        { label: '🌊 Random beach town', outcome: 'connecticut_escape_road' },
        { label: '🏡 Stay with Sarah', outcome: 'connecticut_escape_friend' },
      ],
      scene3_chicago_pitch: [
        { label: '🔥 Pitch a series', outcome: 'chicago_pitch_viral' },
        { label: '💼 Take nonprofit job', outcome: 'chicago_pitch_fired' },
      ],
      scene3_chicago_grad: [
        { label: '🎓 Apply to dev jobs', outcome: 'chicago_grad_bootcamp' },
        { label: '🔄 Data journalism', outcome: 'chicago_grad_pivot' },
      ],
    };
    return choices[sceneId] || [];
  };

  const getPercentage = (outcome) => {
    if (totalVoters === 0) return 0;
    return Math.round((votes[outcome] / totalVoters) * 100);
  };

  const styles = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes typing {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
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
    
    .animate-typing {
      animation: typing 0.5s ease-out;
    }
    
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
  `;

  if (sceneId === 'welcome') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
          <div className="max-w-2xl w-full">
            <h1 className="text-5xl font-bold text-center text-white mb-8 drop-shadow-lg animate-fadeIn">
              Welcome to ReddiLife ✨
            </h1>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl animate-fadeIn mb-8">
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
              
              <div className="bg-white rounded-lg p-6 min-h-[200px] shadow-inner">
                <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
                  <span>💻</span> The ReddiLife Blog
                </h2>
                <div className="space-y-3">
                  <div className="animate-typing">
                    <p className="text-base text-gray-700 font-mono leading-relaxed border-l-2 border-purple-300 pl-3">
                      <span className="text-purple-500 font-bold">Entry 1:</span> Hey, I'm Cassey!
                    </p>
                  </div>
                  <div className="animate-typing">
                    <p className="text-base text-gray-700 font-mono leading-relaxed border-l-2 border-purple-300 pl-3">
                      <span className="text-purple-500 font-bold">Entry 2:</span> Your choices will define me, so choose wisely... ✨
                    </p>
                  </div>
                  <span className="inline-block w-2 h-4 bg-purple-500 animate-blink"></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleChoice('start')}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl rounded-lg hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold"
            >
              🎮 Start Game
            </button>
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
        />
      </>
    );
  }

  if (showResults) {
    const currentChoices = getCurrentChoices();
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
              📊 Voting Results
            </h1>
            
            <div className="bg-white rounded-2xl p-8 shadow-2xl mb-6">
              <p className="text-center text-2xl font-bold text-gray-800 mb-6">
                Total Voters: {totalVoters}
              </p>
              
              <div className="space-y-4">
                {currentChoices.map((choice) => {
                  const percentage = getPercentage(choice.outcome);
                  const voteCount = votes[choice.outcome] || 0;
                  const isWinner = voteCount === Math.max(...Object.values(votes));
                  
                  return (
                    <div key={choice.outcome} className={`p-4 rounded-lg ${isWinner ? 'bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500' : 'bg-gray-100'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">{choice.label}</span>
                        <span className="text-2xl font-bold text-purple-600">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
                        <div 
                          className={`h-full ${isWinner ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'} transition-all duration-1000 flex items-center justify-center text-white text-sm font-bold`}
                          style={{ width: `${percentage}%` }}
                        >
                          {voteCount} votes
                        </div>
                      </div>
                      {isWinner && (
                        <p className="text-green-700 font-bold mt-2 text-center">👑 WINNING CHOICE</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleNextScene}
              className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl rounded-lg hover:from-green-600 hover:to-blue-600 transform transition-all duration-300 hover:scale-105 shadow-2xl font-bold"
            >
              ➡️ Continue with Winning Choice
            </button>
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
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
        <div className="max-w-7xl w-full">
          <div className="mb-6 text-center">
            <div className={`inline-block px-8 py-4 rounded-2xl shadow-2xl ${timeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
              <p className="text-white text-sm font-bold mb-1">TIME REMAINING</p>
              <p className="text-white text-5xl font-bold">{timeLeft}s</p>
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
                  hasVoted={hasVoted}
                />

                <button
                  onClick={() => {
                    setSceneId('welcome');
                    setJournal([]);
                    setTimeLeft(60);
                    setHasVoted(false);
                    setShowResults(false);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                >
                  🔄 Restart SimuLife
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white rounded-2xl p-4 shadow-2xl animate-fadeIn w-full h-[800px] flex items-center justify-center">
                <img
                  src={getSceneImage()}
                  alt="Scene image"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
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
      />
    </>
  );
}