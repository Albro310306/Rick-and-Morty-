import React from 'react';

const CharacterSearchCardSkeleton = () => {
  return (
    <div className="relative w-full rounded-lg border border-white/5 bg-gray-900/50 px-6 py-3 shadow-xl animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 shrink-0 rounded-full bg-gray-800"></div>

          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded-md bg-gray-800"></div>
            <div className="h-1 w-24 rounded-full bg-gray-800"></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gray-800"></div>
          <div className="h-3 w-12 rounded-md bg-gray-800 hidden sm:block"></div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSearchCardSkeleton;
