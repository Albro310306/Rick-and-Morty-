import React from 'react';

/**
 * Componente de paginación
 * Permite navegar a la página anterior o siguiente y muestra la página actual.
 */
const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-12">
      <div className="flex flex-row items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        
        {/* ◄ PREV */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
            currentPage <= 1 
              ? 'text-gray-600 bg-transparent cursor-not-allowed' 
              : 'text-purple-300 hover:text-white hover:bg-purple-600/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]'
          }`}
          aria-label="Página anterior"
        >
          <span aria-hidden>◄</span> PREV
        </button>

        {/* Center: page indicator */}
        <div className="flex items-center gap-2 px-4 border-x border-purple-500/20">
          <span className="text-[10px] text-purple-400/70 tracking-widest uppercase">Page</span>
          <span className="text-white font-bold text-lg">{currentPage}</span>
          <span className="text-purple-500/50">/</span>
          <span className="text-purple-300/80 font-medium">{totalPages}</span>
        </div>

        {/* NEXT ► */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
            currentPage >= totalPages 
              ? 'text-gray-600 bg-transparent cursor-not-allowed' 
              : 'text-purple-300 hover:text-white hover:bg-purple-600/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]'
          }`}
          aria-label="Página siguiente"
        >
          NEXT <span aria-hidden>►</span>
        </button>

      </div>
    </div>
  );
};

export default Pagination;
