import { useState } from 'react';
import { Scene } from './Scene';

export const App = () => {
  const [sceneId, setSceneId] = useState('scene1');
  const [journal, setJournal] = useState<string[]>([]);

  const handleChoice = (outcome: string) => {
    const nextScene = 'scene2_' + outcome;

    const journalEntries: Record<string, string> = {
      minnesota: "I chose love over logic. I hope he’s worth it.",
      connecticut: "Back to the bakery. I hope no one notices the bruises.",
      chicago: "32k and a broken heater. But it’s mine.",
      minnesota_stay: "I cleaned the mess. Maybe I can fix this.",
      minnesota_leave: "I packed my bag. I’m done being someone’s excuse.",
      connecticut_bake: "I baked quietly. I’m good at disappearing.",
      connecticut_escape: "I left a note on the flour sack. I’m not coming back.",
      chicago_pitch: "I pitched a story. They laughed. I wrote it anyway.",
      chicago_grad: "I applied to a python course. Journalism can wait.",
    };

    const entry = journalEntries[outcome];
    if (entry) setJournal((prev) => [...prev, entry]);

    setSceneId(nextScene);
  };

  const getAvatarSrc = () => {
    if (journal.includes("I packed my bag. I’m done being someone’s excuse.")) return '/assets/cassey-chaos.png';
    if (journal.includes("I pitched a story. They laughed. I wrote it anyway.")) return '/assets/cassey-bold.png';
    if (journal.includes("Back to the bakery. I hope no one notices the bruises..")) return '/assets/cassey-awkward.png';
    return '/assets/cassey-neutral.png';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdee9] to-[#b5fffc] flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full">
        <div className="text-center mb-4">
          <img src={getAvatarSrc()} alt="Cassey avatar" className="w-24 h-24 rounded-full mx-auto" />
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">📝 Cassey's Journal</h2>
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
            prompt={`🍞 Cassey returns to Connecticut. Her mom critiques her posture while frosting cupcakes. Her stepdad calls her “kiddo” and hands her a mop. What now?`}
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
              reaction: "Kid, you’re lucky we even hired you. Now fix that tabloid piece.",
            }}
            prompt={`📰 Cassey stays in Chicago. She’s editing obits in a freezing newsroom with a broken heater. Her boss calls her “temporary hire.” What now?`}
            choices={[
              { label: '💻 Suck it up, this is what work life is supposed to be like', outcome: 'chicago_pitch' },
              { label: '🧣 Learn a new skill and leave my passion', outcome: 'chicago_grad' },
            ]}
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
