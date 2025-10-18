import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

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
  showIntro?: boolean;
  isFirstScene?: boolean;
  showScenarioOnly?: boolean;
  showChoicesOnly?: boolean;
};

export const Scene = ({ 
  prompt, 
  choices, 
  onChoose, 
  imageSrc, 
  npc, 
  showIntro,
  isFirstScene,
  showScenarioOnly,
  showChoicesOnly
}: SceneProps) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const messages = [
    "Hi, my name is Cassey! Your choices will define me, so choose wisely... ✨",
    "Make your first choice! 💭"
  ];

  useEffect(() => {
    if (showIntro) {
      let charIndex = 0;
      const currentMessage = messages[messageIndex];
      
      const typeTimer = setInterval(() => {
        if (charIndex <= currentMessage.length) {
          setTypedText(currentMessage.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => {
            if (messageIndex < messages.length - 1) {
              setMessageIndex(prev => prev + 1);
            }
          }, 2000);
        }
      }, 50);
      
      return () => clearInterval(typeTimer);
    }
  }, [showIntro, messageIndex]);

  // If showing only choices (right section)
  if (showChoicesOnly) {
    return (
      <div className="flex flex-col gap-4">
        {choices.map((choice, index) => (
          <ThoughtBubbleChoice
            key={choice.outcome}
            label={choice.label}
            onClick={() => onChoose(choice.outcome)}
            delay={index * 0.15}
            index={index}
          />
        ))}
      </div>
    );
  }

  // If showing only scenario (left section)
  if (showScenarioOnly) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl p-6 border-2 border-blue-200 animate-float-gentle">
        {npc && <NPC name={npc.name} bio={npc.bio} reaction={npc.reaction} />}
        
        <div className="text-gray-800 text-base whitespace-pre-line leading-relaxed font-medium">
          {prompt}
        </div>
      </div>
    );
  }

  // First scene layout (original)
  return (
    <div className="relative">
      {/* Persistent Speech Bubble */}
      {showIntro && isFirstScene && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-5 border-4 border-purple-300 relative animate-float-slow">
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-transparent border-t-white"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[14px] border-transparent border-t-purple-300"></div>
            <p className="text-gray-800 font-semibold text-center text-lg">
              {typedText}
              <span className="animate-pulse text-purple-500">|</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Decision Cloud Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8"
      >
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-6 border-2 border-blue-200 animate-float-gentle relative">
          {imageSrc && (
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              src={imageSrc}
              alt="Scene illustration"
              className="w-full h-auto rounded-lg mb-4 shadow-md"
            />
          )}

          {npc && <NPC name={npc.name} bio={npc.bio} reaction={npc.reaction} />}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-800 text-base whitespace-pre-line leading-relaxed mb-6 font-medium"
          >
            {prompt}
          </motion.div>
        </div>
        
        {/* Cloud bubble decorative circles */}
        <div className="absolute -bottom-4 left-8 w-6 h-6 bg-gradient-to-br from-white to-blue-100 rounded-full border-2 border-blue-200 animate-float-delay-1"></div>
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-gradient-to-br from-white to-blue-100 rounded-full border-2 border-blue-200 animate-float-delay-2"></div>
      </motion.div>

      {/* Thought Bubble Choices */}
      {choices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col gap-5"
        >
          {choices.map((choice, index) => (
            <ThoughtBubbleChoice
              key={choice.outcome}
              label={choice.label}
              onClick={() => onChoose(choice.outcome)}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const ThoughtBubbleChoice = ({
  label,
  onClick,
  delay,
  index,
}: {
  label: string;
  onClick: () => void;
  delay: number;
  index: number;
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
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 15px 35px rgba(139, 92, 246, 0.4)",
          y: -5
        }}
        whileTap={{ scale: 0.95 }}
        className={`w-full px-6 py-4 rounded-2xl text-white font-bold text-base bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-lg transform transition-all duration-300 relative overflow-hidden animate-float-choice-${index}`}
        onClick={onClick}
        aria-label={`Choose: ${label}`}
      >
        <span className="relative z-10">{label}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      </motion.button>
      
      {/* Thought bubble decorative circles */}
      <div className={`absolute ${floatDirection === 'left' ? '-left-6' : '-right-6'} top-1/2 transform -translate-y-1/2`}>
        <div className="w-4 h-4 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-70 animate-pulse"></div>
        <div className={`w-3 h-3 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-50 absolute ${floatDirection === 'left' ? '-left-3' : '-right-3'} -top-2 animate-pulse`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`w-2 h-2 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-30 absolute ${floatDirection === 'left' ? '-left-5' : '-right-5'} -top-4 animate-pulse`} style={{ animationDelay: '0.6s' }}></div>
      </div>
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
      className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-4 mb-4 rounded-lg flex items-start gap-3 shadow-md hover:shadow-lg transition-all duration-300 animate-float-gentle"
    >
      <img
        src={`/assets/npc-${name.toLowerCase()}.png`}
        alt={`${name} avatar`}
        className="w-10 h-10 rounded-full border-2 border-indigo-300"
      />
      <div>
        <div className="text-sm text-gray-600 font-semibold">{name}</div>
        <div className="text-xs text-gray-500 italic">{bio}</div>
        <div className="mt-1 text-md text-gray-800">💬 {reaction}</div>
      </div>
    </motion.div>
  )
);

// Add custom styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes float-gentle {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-5px) translateX(2px); }
      50% { transform: translateY(-3px) translateX(-2px); }
      75% { transform: translateY(-7px) translateX(1px); }
    }
    
    @keyframes float-delay-1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    
    @keyframes float-delay-2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    
    @keyframes float-choice-0 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-3px) translateX(-2px); }
    }
    
    @keyframes float-choice-1 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-4px) translateX(2px); }
    }
    
    @keyframes float-choice-2 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-5px) translateX(-1px); }
    }
    
    .animate-float-slow {
      animation: float-slow 3s ease-in-out infinite;
    }
    
    .animate-float-gentle {
      animation: float-gentle 4s ease-in-out infinite;
    }
    
    .animate-float-delay-1 {
      animation: float-delay-1 2.5s ease-in-out infinite;
      animation-delay: 0.3s;
    }
    
    .animate-float-delay-2 {
      animation: float-delay-2 2s ease-in-out infinite;
      animation-delay: 0.6s;
    }
    
    .animate-float-choice-0 {
      animation: float-choice-0 3.5s ease-in-out infinite;
    }
    
    .animate-float-choice-1 {
      animation: float-choice-1 3.8s ease-in-out infinite;
      animation-delay: 0.2s;
    }
    
    .animate-float-choice-2 {
      animation: float-choice-2 4s ease-in-out infinite;
      animation-delay: 0.4s;
    }
  `;
  document.head.appendChild(style);
}