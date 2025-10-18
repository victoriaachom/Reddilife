export const TraitMeter = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl">{label}</span>
      <div className="w-20 h-2 bg-gray-300 rounded-full mt-1">
        <div
          className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(value * 33, 100)}%` }}
        />
      </div>
    </div>
  );
};
