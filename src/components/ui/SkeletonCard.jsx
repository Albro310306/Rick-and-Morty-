import React from 'react';

/**
 * Componente esqueleto para representar una tarjeta de personaje mientras se cargan los datos.
 * Mantiene la misma dimensión física que la tarjeta real para evitar saltos en la interfaz.
 */
const SkeletonCard = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-80 h-72">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#0c0716]/50 to-[#1a0a3c]/50 border border-purple-500/10 flex flex-col justify-center items-center gap-4 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          {/* Radial gradient background pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] animate-pulse" />
          
          <div className="w-28 h-28 rounded-full bg-purple-500/15 animate-pulse z-10" />
          <div className="w-[180px] h-[20px] rounded bg-purple-500/15 animate-pulse z-10 delay-200" />
          <div className="w-[100px] h-[14px] rounded bg-purple-500/15 animate-pulse z-10 delay-200" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
