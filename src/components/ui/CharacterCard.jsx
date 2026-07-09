import React from 'react';

/**
 * Tarjeta para mostrar un personaje (no cliqueable ni navegable).
 */
const CharacterCard = ({ character }) => {
  return (
    <div className="flex justify-center w-full">
      <div 
        className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl before:from-purple-500/40 before:via-pink-500/30 before:to-orange-500/40 before:absolute before:top-0 w-80 h-72 relative bg-[#0c0716]/80 border border-purple-500/20 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden"
      >
        <div className="w-28 h-28 rounded-full border-4 border-[#0c0716] z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 overflow-hidden shadow-lg">
          <img src={character.image} alt={character.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="z-10 group-hover:-translate-y-10 transition-all duration-500 px-4">
          <span className="text-2xl font-black text-white block truncate max-w-[280px]">{character.name}</span>
          <p className="text-purple-300 font-semibold">{character.species}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
