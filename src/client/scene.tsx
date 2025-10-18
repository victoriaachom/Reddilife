import { motion } from 'framer-motion';
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
  showScenarioOnly?: boolean;
  showChoicesOnly?: boolean;
  hasVoted?: boolean;
};

export const Scene = ({ 
  prompt, 
  choices, 
  onChoose, 
  npc, 
  showScenarioOnly,
  showChoicesOnly,
  hasVoted
}: SceneProps) => {

  // If showing only choices (for left section bottom)
  if (showChoicesOnly) {
    return (
      <div className="flex flex-col gap-4">
        {choices.map((choice, index) => (
          <ThoughtBubbleChoice
            key={choice.outcome}
            label={choice.label}
            onClick={() => onChoose(choice.outcome)}
            delay={index * 0.1}
            index={index}
            disabled={hasVoted}
          />
        ))}
        {hasVoted && (
          <p className="text-center text-white font-bold text-lg bg-green-500 rounded-lg py-2 animate-pulse">
            ✅ Vote Recorded! Waiting for others...
          </p>
        )}
      </div>
    );
  }

  // If showing only scenario (for left section middle)
  if (showScenarioOnly) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-5 border-2 border-blue-200 min-h-[250px]">
        {npc && <NPC name={npc.name} bio={npc.bio} reaction={npc.reaction} />}
        
        <div className="text-gray-800 text-base whitespace-pre-line leading-relaxed font-medium">
          {prompt}
        </div>
      </div>
    );
  }

  return null;
};

const ThoughtBubbleChoice = ({
  label,
  onClick,
  delay,
  index,
  disabled,
}: {
  label: string;
  onClick: () => void;
  delay: number;
  index: number;
  disabled?: boolean;
}) => {
  const floatDirection = index % 2 === 0 ? 'left' : 'right';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: floatDirection === 'left' ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <motion.button
        whileHover={!disabled ? { 
          scale: 1.03, 
          boxShadow: "0 12px 30px rgba(139, 92, 246, 0.4)",
        } : {}}
        whileTap={!disabled ? { scale: 0.97 } : {}}
        className={`w-full px-5 py-3 rounded-xl text-white font-bold text-base shadow-lg transform transition-all duration-300 relative overflow-hidden ${
          disabled 
            ? 'bg-gray-400 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:shadow-2xl'
        }`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-label={`Choose: ${label}`}
      >
        <span className="relative z-10">{label}</span>
      </motion.button>
      
      {/* Thought bubble decorative circles */}
      {!disabled && (
        <div className={`absolute ${floatDirection === 'left' ? '-left-6' : '-right-6'} top-1/2 transform -translate-y-1/2`}>
          <div className="w-4 h-4 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-70 animate-pulse"></div>
          <div className={`w-3 h-3 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-50 absolute ${floatDirection === 'left' ? '-left-3' : '-right-3'} -top-2 animate-pulse`} style={{ animationDelay: '0.3s' }}></div>
          <div className={`w-2 h-2 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-30 absolute ${floatDirection === 'left' ? '-left-5' : '-right-5'} -top-4 animate-pulse`} style={{ animationDelay: '0.6s' }}></div>
        </div>
      )}
    </motion.div>
  );
};

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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-4 mb-4 rounded-lg flex items-start gap-3 shadow-md"
    >
      <img
        src={`/assets/npc-${name.toLowerCase()}.png`}
        alt={`${name} avatar`}
        className="w-10 h-10 rounded-full border-2 border-indigo-300 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-600 font-semibold">{name}</div>
        <div className="text-xs text-gray-500 italic">{bio}</div>
        <div className="mt-1 text-sm text-gray-800">💬 {reaction}</div>
      </div>
    </motion.div>
  )
);