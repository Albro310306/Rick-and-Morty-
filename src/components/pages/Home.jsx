import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { fetchCharacters } from '../../api/rickAndMorty';
import CharacterCard from '../ui/CharacterCard';
import SkeletonCard from '../ui/SkeletonCard';

const Home = () => {
  const [searchParams] = useSearchParams();
  const nameFilter = searchParams.get('name') || '';
  
  // Artificial delay state to ensure skeletons are visible as requested
  const [showSkeletons, setShowSkeletons] = useState(true);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', nameFilter],
    queryFn: () => fetchCharacters(nameFilter),
    retry: false
  });

  useEffect(() => {
    // Force showing skeletons for at least 1.5 seconds when loading starts
    if (isLoading) {
      setShowSkeletons(true);
      const timer = setTimeout(() => {
        setShowSkeletons(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const isActuallyLoading = isLoading || showSkeletons;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          {nameFilter ? `Resultados para "${nameFilter}"` : 'Personajes de Rick and Morty'}
        </h1>
        <p className="text-gray-400 text-lg">
          Explora el multiverso a través de la API oficial
        </p>
      </div>

      {isError && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg my-8">
          <p className="font-bold">Error al cargar los datos</p>
          <p>{error.message}</p>
        </div>
      )}

      {isActuallyLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Mostramos 8 skeletons como placeholders */}
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {data?.results && data.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            !isError && (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-500">No se encontraron personajes</h3>
                <p className="text-gray-600 mt-2">Prueba con otro término de búsqueda</p>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Home;
