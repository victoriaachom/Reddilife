import { useState } from 'react';
import { Scene } from './Scene';

export const App = () => {
  const [sceneId, setSceneId] = useState('scene1');
  const [journal, setJournal] = useState<string[]>([]);

  const handleChoice = (outcome: string) => {
    let nextScene = '';
    
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
      // Minnesota Stay branch
      minnesota_stay_therapy: "We went to couples therapy. The therapist fell asleep.",
      minnesota_stay_business: "I started an Etsy shop selling 'I survived my boyfriend' mugs.",
      // Minnesota Leave branch
      minnesota_leave_apartment: "Studio apartment, no roommates. Just me and my anxiety.",
      minnesota_leave_roommate: "My roommate collects taxidermy. At least they pay rent on time.",
      // Connecticut Bake branch
      connecticut_bake_recipe: "I created a viral TikTok recipe. Mom says I'm 'exploiting the family.'",
      connecticut_bake_manager: "I'm the assistant manager now. Mom still corrects my piping technique.",
      // Connecticut Escape branch
      connecticut_escape_road: "Road trip with $800 and a dream. The check engine light is on.",
      connecticut_escape_friend: "Crashing on Sarah's couch. She has 3 cats and questionable boundaries.",
      // Chicago Pitch branch
      chicago_pitch_viral: "My story went viral. My boss said 'don't get cocky, kid.'",
      chicago_pitch_fired: "They fired me for 'tone issues.' I'm freelancing from a coffee shop.",
      // Chicago Grad branch
      chicago_grad_bootcamp: "Bootcamp complete. I debug code and my life choices.",
      chicago_grad_pivot: "I'm a junior dev now. My impostor syndrome has impostor syndrome.",
    };

    const entry = journalEntries[outcome];
    if (entry) setJournal((prev) => [...prev, entry]);

    setSceneId(nextScene);
  };

  const getAvatarSrc = () => {
    if (journal.includes("I packed my bag. I'm done being someone's excuse.")) return '/assets/cassey-chaos.png';
    if (journal.includes("I pitched a story. They laughed. I wrote it anyway.")) return '/assets/cassey-bold.png';
    if (journal.includes("Back to the bakery. I hope no one notices the bruises.")) return '/assets/cassey-awkward.png';
    return '/assets/cassey-neutral.png';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] to-[#b5fffc] flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full">
        <div className="text-center mb-4">
          <img src={getAvatarSrc()} alt="Cassey avatar" className="w-24 h-24 rounded-full mx-auto" />
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">📔 Cassey's Journal</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {journal.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>

        {sceneId === 'scene1' && (
          <Scene
            imageSrc="/assets/cassey-cracked-phone.png"
            prompt={`🎓 Cassey (22) just graduated with a journalism degree in Chicago. She's staring at her cracked phone, weighing three impossible paths:\n\n1. Move to Minnesota with her pothead boyfriend.\n2. Return to Connecticut to live with her abusive mom and work in the family bakery.\n3. Stay in Chicago and take a $32k newsroom job.\n\nWhat should Cassey do?`}
            choices={[
              { label: '🌬️ Move to Minnesota', outcome: 'minnesota' },
              { label: '🍞 Return to CT bakery', outcome: 'connecticut' },
              { label: '📰 Stay in Chicago', outcome: 'chicago' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene2_minnesota' && (
          <Scene
            imageSrc="/assets/cassey-boyfriend.png"
            npc={{
              name: "Zeke",
              bio: "Pothead boyfriend, aspiring DJ, allergic to responsibility",
              reaction: "Yo babe, I forgot to pay rent again. Can you cover it again?",
            }}
            prompt={`🌬️ Cassey moves in with her pothead boyfriend. The apartment smells like weed and ramen. He forgot to pay rent. What now?`}
            choices={[
              { label: 'Suck it up, where else would I go?!', outcome: 'minnesota_stay' },
              { label: '🚪 Make a plan to leave him and start from scratch in a city she has never known', outcome: 'minnesota_leave' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene2_connecticut' && (
          <Scene
            npc={{
              name: "Mom",
              bio: "Bakery owner, emotionally manipulative, frosting perfectionist",
              reaction: "Your posture is terrible. Customers can smell weakness.",
            }}
            prompt={`🍞 Cassey returns to Connecticut. Her mom critiques her posture while frosting cupcakes. Her stepdad calls her "kiddo" and hands her a mop. What now?`}
            choices={[
              { label: '🧁 Bake and bear it', outcome: 'connecticut_bake' },
              { label: '📦 Pack and vanish', outcome: 'connecticut_escape' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene2_chicago' && (
          <Scene
            npc={{
              name: "Editor",
              bio: "Grizzled newsroom vet, drinks cold brew and hard bagels",
              reaction: "Kid, you're lucky we even hired you. Now fix that tabloid piece.",
            }}
            prompt={`📰 Cassey stays in Chicago. She's editing obits in a freezing newsroom with a broken heater. Her boss calls her "temporary hire." What now?`}
            choices={[
              { label: '💻 Suck it up, this is what work life is supposed to be like', outcome: 'chicago_pitch' },
              { label: '🧣 Learn a new skill and leave my passion', outcome: 'chicago_grad' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* MINNESOTA STAY PATH - Scene 3 */}
        {sceneId === 'scene3_minnesota_stay' && (
          <Scene
            npc={{
              name: "Zeke",
              bio: "Still hasn't learned what a vacuum is",
              reaction: "Babe, I signed us up for therapy! ...With a YouTube life coach.",
            }}
            prompt={`💚 Three months in. Zeke promises he'll change. The apartment now has a motivational poster that says "Rent is Temporary, Love is Forever." What's Cassey's move?`}
            choices={[
              { label: '🛋️ Try couples therapy (it\'s on YouTube)', outcome: 'minnesota_stay_therapy' },
              { label: '💼 Start a side hustle to escape slowly', outcome: 'minnesota_stay_business' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* MINNESOTA LEAVE PATH - Scene 3 */}
        {sceneId === 'scene3_minnesota_leave' && (
          <Scene
            prompt={`🎒 Cassey left. She's got $1,200 in savings and a friend's couch for two weeks max. Minneapolis is expensive and she knows exactly one person here. What now?`}
            choices={[
              { label: '🏠 Get a tiny studio apartment, eat ramen', outcome: 'minnesota_leave_apartment' },
              { label: '🤝 Find a roommate on Craigslist (risky but cheaper)', outcome: 'minnesota_leave_roommate' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* CONNECTICUT BAKE PATH - Scene 3 */}
        {sceneId === 'scene3_connecticut_bake' && (
          <Scene
            npc={{
              name: "Mom",
              bio: "Discovered TikTok, thinks she invented social media",
              reaction: "Why are YOU getting likes? I taught you everything you know!",
            }}
            prompt={`🧁 Six months of baking. Cassey's getting really good at it, but her mom takes credit for everything. A food blogger wants to feature the bakery. What's the play?`}
            choices={[
              { label: '📱 Post her own recipes on TikTok', outcome: 'connecticut_bake_recipe' },
              { label: '👔 Ask for assistant manager role (and a raise)', outcome: 'connecticut_bake_manager' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* CONNECTICUT ESCAPE PATH - Scene 3 */}
        {sceneId === 'scene3_connecticut_escape' && (
          <Scene
            prompt={`🚗 Cassey's driving with no plan. She's got $800, a suitcase, and a Spotify road trip playlist. Her phone keeps buzzing with texts from Mom. Where to?`}
            choices={[
              { label: '🌊 Road trip to a random beach town', outcome: 'connecticut_escape_road' },
              { label: '🏡 Crash with college friend Sarah in Boston', outcome: 'connecticut_escape_friend' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* CHICAGO PITCH PATH - Scene 3 */}
        {sceneId === 'scene3_chicago_pitch' && (
          <Scene
            npc={{
              name: "Editor",
              bio: "Actually impressed but won't admit it",
              reaction: "Fine. It's good. Don't let it go to your head, temp.",
            }}
            prompt={`📰 Cassey's investigative piece on Chicago's food desert crisis gets 50K views. Her editor pretends not to care. A nonprofit offers her a communications job for 45K. Stay or go?`}
            choices={[
              { label: '🔥 Double down, pitch a series', outcome: 'chicago_pitch_viral' },
              { label: '💼 Take the nonprofit job (more money, less chaos)', outcome: 'chicago_pitch_fired' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* CHICAGO GRAD PATH - Scene 3 */}
        {sceneId === 'scene3_chicago_grad' && (
          <Scene
            prompt={`💻 Cassey finishes a 12-week Python bootcamp. She can now write "Hello World" and has a portfolio website. Tech recruiters are flooding her LinkedIn. What's next?`}
            choices={[
              { label: '🎓 Apply to junior dev jobs', outcome: 'chicago_grad_bootcamp' },
              { label: '🔄 Pivot to data journalism (combine both skills)', outcome: 'chicago_grad_pivot' },
            ]}
            onChoose={handleChoice}
          />
        )}

        {/* ENDING SCENES - Scene 4 */}
        {sceneId === 'scene4_minnesota_stay_therapy' && (
          <Scene
            prompt={`🎬 ENDING: The YouTube therapist was actually pretty helpful. Zeke got a job. They're in a better place. Cassey's still not sure this is forever, but it's okay for now. She learned she can't fix people, but she can set boundaries.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_minnesota_stay_business' && (
          <Scene
            prompt={`🎬 ENDING: Cassey's Etsy shop "Survived and Thriving" makes $2K/month. She moves into her own place but stays with Zeke... kind of. They're "figuring it out." She's learning that independence doesn't mean loneliness.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_minnesota_leave_apartment' && (
          <Scene
            prompt={`🎬 ENDING: Cassey's studio apartment is 400 sq ft of freedom. She eats ramen and writes in coffee shops. She's lonely sometimes, but she's hers. She got a job at a local newspaper. It's not much, but it's hers.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_minnesota_leave_roommate' && (
          <Scene
            prompt={`🎬 ENDING: The roommate with taxidermy turned out to be cool. They became friends. Cassey learned that taking risks on people can pay off. She's working at a marketing agency and saving up. Life's weird but good.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_connecticut_bake_recipe' && (
          <Scene
            prompt={`🎬 ENDING: Cassey's TikTok blew up. 500K followers. She got a cookbook deal. Her mom is furious but also secretly proud. Cassey moved out and opened her own bakery. She's still healing, but she's FREE.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_connecticut_bake_manager' && (
          <Scene
            prompt={`🎬 ENDING: Assistant manager at 23. Cassey's making decent money and learned to set boundaries with her mom (mostly). It's not her dream, but she's good at it. Sometimes "fine" is enough while you figure out what's next.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_connecticut_escape_road' && (
          <Scene
            prompt={`🎬 ENDING: Cassey ended up in a random beach town in Rhode Island. She works at a surf shop and writes poetry at sunset. She's broke and happy. She learned that running away isn't always bad—sometimes it's survival.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_connecticut_escape_friend' && (
          <Scene
            prompt={`🎬 ENDING: Boston with Sarah was chaos. Three cats, constant noise, but also laughter. Cassey got a job at a bookstore and started therapy. She's rebuilding. She learned that asking for help isn't weakness.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_chicago_pitch_viral' && (
          <Scene
            prompt={`🎬 ENDING: Cassey's series won a local journalism award. She's still at the paper making $38K, but she's writing stories that matter. Her editor finally called her by her actual name. She learned that persistence beats talent.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_chicago_pitch_fired' && (
          <Scene
            prompt={`🎬 ENDING: Turns out she got fired for refusing to kill a story. She's freelancing now, making MORE money. She learned that getting fired isn't failure—sometimes it's redirection. She's pitching to national outlets.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_chicago_grad_bootcamp' && (
          <Scene
            prompt={`🎬 ENDING: Junior dev at a startup. $65K salary. Cassey codes all day and occasionally misses writing, but her bank account doesn't. She learned that pivoting isn't giving up—it's adapting. She might go back to journalism someday.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        {sceneId === 'scene4_chicago_grad_pivot' && (
          <Scene
            prompt={`🎬 ENDING: Data journalist at a major publication. Cassey combines coding and storytelling. She's making $55K and loving it. She learned that you don't have to choose between passions—you can merge them. She's exactly where she needs to be.`}
            choices={[]}
            onChoose={handleChoice}
          />
        )}

        <button
          onClick={() => {
            setSceneId('scene1');
            setJournal([]);
          }}
          className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          🔄 Restart SimuLife
        </button>
      </div>
    </div>
  );
};