import React from 'react';
import { Plus, Check } from 'lucide-react';

const CharacterSearchCard = ({ character, onClick, isAdded }) => {
  const statusColor = character.status === 'Alive' ? 'bg-green-500 shadow-green-500/50' : character.status === 'Dead' ? 'bg-red-500 shadow-red-500/50' : 'bg-gray-500 shadow-gray-500/50';

  return (
    <button 
      type="button" 
      onClick={onClick} 
      disabled={isAdded}
      className={`group relative w-full text-left outline-none ${isAdded ? 'opacity-50 cursor-default' : ''}`}
    >
      {!isAdded && <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-20 blur-lg transition-all duration-500 group-hover:opacity-70 group-hover:blur-xl"></div>}

      <div className={`relative rounded-lg border ${isAdded ? 'border-green-500/30' : 'border-white/10'} bg-gradient-to-b from-gray-900 via-gray-950 to-black px-6 py-3 shadow-xl`}>
        {!isAdded && (
          <>
            <div className="absolute inset-x-0 top-px h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute inset-x-0 bottom-px h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </>
        )}

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              {!isAdded && <div className="absolute inset-0 rounded-full border border-purple-500/20 border-t-purple-500 transition-transform duration-1000 group-hover:rotate-180"></div>}
              {isAdded && <div className="absolute inset-0 rounded-full border border-green-500/50"></div>}
              <div className="absolute inset-[3px] rounded-full bg-gray-950 overflow-hidden">
                <img src={character.image} alt={character.name} className={`w-full h-full object-cover transition-opacity ${isAdded ? 'opacity-50' : 'opacity-80 group-hover:opacity-100'}`} />
              </div>
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">{character.name}</span>
                <div className={`h-1.5 w-1.5 shrink-0 rounded-full shadow-lg ${statusColor}`}></div>
              </div>

              <div className="h-1 w-24 overflow-hidden rounded-full bg-gray-800">
                <div className={`h-full rounded-full transition-all duration-300 ${isAdded ? 'w-full bg-green-500' : 'w-1/3 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full'}`}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className={`relative flex h-8 w-8 items-center justify-center rounded-lg ${isAdded ? 'bg-green-500/20' : 'bg-purple-500/10'}`}>
              {isAdded ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Plus className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              )}
              {!isAdded && <div className="absolute inset-0 rounded-lg bg-purple-500/10 blur-sm transition-all duration-300 group-hover:blur-md"></div>}
            </div>

            <span className={`text-xs font-bold transition-colors hidden sm:block ${isAdded ? 'text-green-400' : 'text-white/50 group-hover:text-white'}`}>
              {isAdded ? 'AÑADIDO' : 'AÑADIR'}
            </span>

            {!isAdded && (
              <div className="hidden sm:flex gap-1 ml-1">
                <div className="h-1.5 w-1.5 rounded-full bg-pink-500/40 transition-all duration-300 group-hover:bg-pink-500"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-pink-500/40 transition-all duration-300 group-hover:bg-pink-500 group-hover:delay-75"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-pink-500/40 transition-all duration-300 group-hover:bg-pink-500 group-hover:delay-150"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default CharacterSearchCard;
