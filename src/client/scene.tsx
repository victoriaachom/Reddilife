import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type Choice = {
  label: string;
  outcome: string;
};

type SceneProps = {
  prompt: string;
  choices: Choice[];
  onChoose: (outcome: string) => void;
  imageSrc?: string;
  npc?: {
    name: string;
    bio: string;
    reaction: string;
  };
};

export const Scene = ({ prompt, choices, onChoose, imageSrc, npc }: SceneProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-xl shadow-2xl p-6"
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Scene illustration"
            className="w-full h-auto rounded-lg mb-4"
          />
        )}

        {npc && <NPC name={npc.name} bio={npc.bio} reaction={npc.reaction} />}

        <div className="text-gray-800 text-lg whitespace-pre-line leading-relaxed mb-6">
          {prompt}
        </div>

        <div className="flex flex-col gap-4">
          {choices.map((choice) => (
            <ChoiceButton
              key={choice.outcome}
              label={choice.label}
              onClick={() => onChoose(choice.outcome)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ChoiceButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-5 py-3 rounded-lg text-white font-bold text-md bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform duration-200"
    onClick={onClick}
    aria-label={`Choose: ${label}`}
    role="button"
  >
    {label}
  </motion.button>
);

export const NPC = React.memo(
  ({
    name,
    bio,
    reaction,
  }: {
    name: string;
    bio: string;
    reaction: string;
  }) => (
    <div className="bg-gray-50 border-l-4 border-indigo-400 p-4 mb-4 rounded flex items-start gap-3">
      <img
        src={`/assets/npc-${name.toLowerCase()}.png`}
        alt={`${name} avatar`}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="text-sm text-gray-600 font-semibold">{name}</div>
        <div className="text-xs text-gray-500 italic">{bio}</div>
        <div className="mt-1 text-md text-gray-800">💬 {reaction}</div>
      </div>
    </div>
  )
);
