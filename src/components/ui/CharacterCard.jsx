import React from 'react';

const CharacterCard = ({ character }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 w-full text-white">
      <img 
        src={character.image} 
        alt={character.name} 
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-black hover:text-orange-400 transition-colors cursor-pointer truncate" title={character.name}>
            {character.name}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-sm font-medium capitalize">
            <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(character.status)} inline-block`}></span>
            <span>{character.status} - {character.species}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Última ubicación conocida:</span>
          <span className="text-gray-100 hover:text-orange-400 transition-colors cursor-pointer truncate" title={character.location.name}>
            {character.location.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
