import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../api/rickAndMorty';
import { ArrowLeft, MapPin, Tv, User } from 'lucide-react';

/**
 * Componente que muestra una pequeña insignia de estado (vivo/muerto/desconocido) con un círculo de color.
 * 
 * @param {string} props.status - El estado vital del personaje.
 */
const StatusBadge = ({ status }) => {
  const color =
    status?.toLowerCase() === 'alive'
      ? 'bg-green-500'
      : status?.toLowerCase() === 'dead'
      ? 'bg-red-500'
      : 'bg-gray-400';
  return (
    <span className="flex items-center gap-2 capitalize font-medium">
      <span className={`h-3 w-3 rounded-full ${color} inline-block`}></span>
      {status}
    </span>
  );
};

/**
 * Componente de fila de información reutilizable para mostrar un dato específico del personaje.
 * 
 * @param {ReactNode} props.icon - El icono (por ejemplo, de Lucide-react) a mostrar junto a la etiqueta.
 * @param {string} props.label - La etiqueta o título del dato (ej. "Especie").
 * @param {string} props.value - El valor a mostrar.
 */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1 p-4 bg-gray-700/50 rounded-lg">
    <span className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider font-semibold">
      {icon}
      {label}
    </span>
    <span className="text-white font-medium truncate capitalize">{value}</span>
  </div>
);

/**
 * Estado de carga con diseño "esqueleto" (skeleton) que imita la estructura de la página de detalle.
 * Se muestra mientras los datos del personaje están siendo traídos por la API.
 */
const DetailSkeleton = () => (
  <div className="animate-pulse max-w-3xl mx-auto">
    <div className="h-8 w-32 bg-gray-700 rounded mb-8"></div>
    <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-2xl overflow-hidden p-6">
      <div className="w-full md:w-72 h-72 bg-gray-700 rounded-xl flex-shrink-0"></div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
        <div className="h-5 w-1/3 bg-gray-700 rounded"></div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Componente de la página de detalles de un personaje.
 * Muestra información extendida obtenida de la API por su ID.
 */
const CharacterDetail = () => {
  const { id } = useParams();

  const { data: character, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });

  if (isLoading) return <DetailSkeleton />;

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <p className="text-6xl mb-4">😢</p>
        <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
        <p className="text-gray-400">{error.message}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Volver
      </Link>

      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <img
          src={character.image}
          alt={character.name}
          className="w-full md:w-72 h-72 md:h-auto object-cover flex-shrink-0"
        />
        <div className="p-8 flex flex-col gap-4 flex-1">
          <div>
            <h1 className="text-4xl font-black text-white leading-tight mb-1">
              {character.name}
            </h1>
            <StatusBadge status={character.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <InfoRow
              icon={<User className="w-3.5 h-3.5" />}
              label="Especie"
              value={character.species}
            />
            <InfoRow
              icon={<User className="w-3.5 h-3.5" />}
              label="Género"
              value={character.gender}
            />
            <InfoRow
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Origen"
              value={character.origin?.name}
            />
            <InfoRow
              icon={<MapPin className="w-3.5 h-3.5" />}
              label="Última ubicación"
              value={character.location?.name}
            />
          </div>

          <div className="mt-2">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
              <Tv className="w-3.5 h-3.5" /> Episodios
            </span>
            <p className="text-white font-bold text-3xl mt-1">
              {character.episode?.length}
              <span className="text-gray-400 text-base font-normal ml-2">apariciones</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
