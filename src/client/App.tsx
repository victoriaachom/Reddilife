import { useState } from 'react';
import { Scene } from './Scene';

export const App = () => {
  const [sceneId, setSceneId] = useState('welcome');
  const [journal, setJournal] = useState<string[]>([]);

  const handleChoice = (outcome: string) => {
    let nextScene = '';
    
    // From welcome to scene1
    if (sceneId === 'welcome') {
      nextScene = 'scene1';
      setSceneId(nextScene);
      return;
    }
    
    // Determine next scene based on current scene and outcome
    if (sceneId === 'scene1') {
      nextScene = 'scene2_' + outcome;
    } else if (sceneId.startsWith('scene2_')) {
      nextScene = 'scene3_' + outcome;
    } else if (sceneId.startsWith('scene3_')) {
      nextScene = 'scene4_' + outcome;
    }

    const journalEntries: Record<string, string> = {
      minnesota: "I chose love over logic. I hope he's worth it.",
      connecticut: "Back to the bakery. I hope no one notices the bruises.",
      chicago: "32k and a broken heater. But it's mine.",
      minnesota_stay: "I cleaned the mess. Maybe I can fix this.",
      minnesota_leave: "I packed my bag. I'm done being someone's excuse.",
      connecticut_bake: "I baked quietly. I'm good at disappearing.",
      connecticut_escape: "I left a note on the flour sack. I'm not coming back.",
      chicago_pitch: "I pitched a story. They laughed. I wrote it anyway.",
      chicago_grad: "I applied to a python course. Journalism can wait.",
      minnesota_stay_therapy: "We went to couples therapy. The therapist fell asleep.",
      minnesota_stay_business: "I started an Etsy shop selling 'I survived my boyfriend' mugs.",
      minnesota_leave_apartment: "Studio apartment, no roommates. Just me and my anxiety.",
      minnesota_leave_roommate: "My roommate collects taxidermy. At least they pay rent on time.",
      connecticut_bake_recipe: "I created a viral TikTok recipe. Mom says I'm 'exploiting the family.'",
      connecticut_bake_manager: "I'm the assistant manager now. Mom still corrects my piping technique.",
      connecticut_escape_road: "Road trip with $800 and a dream. The check engine light is on.",
      connecticut_escape_friend: "Crashing on Sarah's couch. She has 3 cats and questionable boundaries.",
      chicago_pitch_viral: "My story went viral. My boss said 'don't get cocky, kid.'",
      chicago_pitch_fired: "They fired me for 'tone issues.' I'm freelancing from a coffee shop.",
      chicago_grad_bootcamp: "Bootcamp complete. I debug code and my life choices.",
      chicago_grad_pivot: "I'm a junior dev now. My impostor syndrome has impostor syndrome.",
    };

    const entry = journalEntries[outcome];
    if (entry) setJournal((prev) => [...prev, entry]);

    setSceneId(nextScene);
  };

  const getSceneImage = () => {
    if (sceneId === 'scene1') return '/assets/cassey-cracked-phone.png';
    if (sceneId === 'scene2_minnesota' || sceneId.includes('minnesota')) return '/assets/cassey-boyfriend.png';
    if (sceneId === 'scene2_connecticut' || sceneId.includes('connecticut')) return '/assets/cassey-neutral.png';
    if (sceneId === 'scene2_chicago' || sceneId.includes('chicago')) return '/assets/cassey-bold.png';
    return '/assets/cassey-neutral.png';
  };

  const getCurrentPrompt = () => {
    const prompts: Record<string, string> = {
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
    const npcs: Record<string, any> = {
      scene2_minnesota: { name: "Zeke", bio: "Pothead boyfriend, aspiring DJ, allergic to responsibility", reaction: "Yo babe, I forgot to pay rent again. Can you cover it again?" },
      scene2_connecticut: { name: "Mom", bio: "Bakery owner, emotionally manipulative, frosting perfectionist", reaction: "Your posture is terrible. Customers can smell weakness." },
      scene2_chicago: { name: "Editor", bio: "Grizzled newsroom vet, drinks cold brew and hard bagels", reaction: "Kid, you're lucky we even hired you. Now fix that tabloid piece." },
      scene3_minnesota_stay: { name: "Zeke", bio: "Still hasn't learned what a vacuum is", reaction: "Babe, I signed us up for therapy! ...With a YouTube life coach." },
      scene3_connecticut_bake: { name: "Mom", bio: "Discovered TikTok, thinks she invented social media", reaction: "Why are YOU getting likes? I taught you everything you know!" },
      scene3_chicago_pitch: { name: "Editor", bio: "Actually impressed but won't admit it", reaction: "Fine. It's good. Don't let it go to your head, temp." },
    };
    return npcs[sceneId];
  };

  const getCurrentChoices = () => {
    const choices: Record<string, any[]> = {
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

  // WELCOME SCREEN
  if (sceneId === 'welcome') {
    return (
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
                <div className="animate-typing" style={{ animationDelay: '0.5s' }}>
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

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
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
        `}</style>
      </div>
    );
  }

  // ALL GAME SCENES - Consistent two-column layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] via-[#fbc2eb] to-[#b5fffc] flex items-center justify-center p-6 font-sans animate-gradient">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SECTION - Blog + Scenario + Choices */}
        <div className="space-y-6">
          {/* Laptop Blog */}
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

          {/* Current Scenario */}
          <Scene
            npc={getCurrentNPC()}
            prompt={getCurrentPrompt()}
            choices={[]}
            onChoose={handleChoice}
            showScenarioOnly={true}
          />

          {/* Choices */}
          <div className="space-y-4">
            <Scene
              choices={getCurrentChoices()}
              prompt=""
              onChoose={handleChoice}
              showChoicesOnly={true}
            />

            <button
              onClick={() => {
                setSceneId('welcome');
                setJournal([]);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
            >
              🔄 Restart SimuLife
            </button>
          </div>
        </div>

        {/* RIGHT SECTION - Image Only */}
        <div className="flex items-start">
          <div className="bg-white rounded-2xl p-4 shadow-2xl animate-fadeIn w-full h-[800px] flex items-center justify-center">
            <img 
              src={getSceneImage()} 
              alt="Scene" 
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
};