import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse w-full">
      {/* Image skeleton */}
      <div className="skeleton h-64 w-full bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title skeleton */}
        <div className="skeleton h-6 w-3/4 bg-gray-700 rounded"></div>
        
        {/* Status/Species skeleton */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-3 w-3 rounded-full bg-gray-700"></div>
          <div className="skeleton h-4 w-1/2 bg-gray-700 rounded"></div>
        </div>
        
        {/* Last known location skeleton */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="skeleton h-3 w-1/3 bg-gray-700 rounded"></div>
          <div className="skeleton h-4 w-full bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
