export const NPC = ({
  name,
  bio,
  reaction,
}: {
  name: string;
  bio: string;
  reaction: string;
}) => (
  <div className="bg-gray-50 border-l-4 border-indigo-400 p-4 mb-4 rounded">
    <div className="text-sm text-gray-600 font-semibold">{name}</div>
    <div className="text-xs text-gray-500 italic">{bio}</div>
    <div className="mt-2 text-md text-gray-800">💬 {reaction}</div>
  </div>
);
