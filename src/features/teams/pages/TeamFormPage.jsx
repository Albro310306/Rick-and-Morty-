import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, X, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { teamSchema } from '../utils/teamSchema';
import { useTeam, useTeamMutations } from '../hooks/useTeams';
import { fetchCharacters, fetchMultipleCharacters } from '../../../api/rickAndMorty';
import CharacterSearchCard from '../components/CharacterSearchCard';
import CharacterSearchCardSkeleton from '../components/CharacterSearchCardSkeleton';

const TeamFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { data: team, isLoading: isTeamLoading } = useTeam(id);
  const { createTeam, updateTeam, isCreating, isUpdating } = useTeamMutations();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [charIds, setCharIds] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ['searchCharacters', debouncedSearch],
    queryFn: () => fetchCharacters(debouncedSearch),
    enabled: debouncedSearch.length >= 2,
    staleTime: 60000,
  });

  const { data: selectedCharsData } = useQuery({
    queryKey: ['selectedCharsForm', charIds],
    queryFn: () => fetchMultipleCharacters(charIds),
    enabled: charIds.length > 0,
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: '',
      description: '',
      characterIds: [],
    }
  });

  useEffect(() => {
    if (isEditing && team) {
      reset({
        name: team.name,
        description: team.description,
        characterIds: team.characterIds,
      });
      setCharIds(team.characterIds);
    }
  }, [isEditing, team, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateTeam({ id, ...data });
    } else {
      createTeam(data);
    }
  };

  const handleAddCharId = (id) => {
    if (!charIds.includes(id)) {
      const newIds = [...charIds, id];
      setCharIds(newIds);
      setValue('characterIds', newIds, { shouldValidate: true });
    }
  };

  const handleRemoveCharId = (idToRemove) => {
    const newIds = charIds.filter(cid => cid !== idToRemove);
    setCharIds(newIds);
    setValue('characterIds', newIds, { shouldValidate: true });
  };

  if (isEditing && isTeamLoading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-purple-400 w-12 h-12" /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      <Link to="/teams" className="text-pink-400 hover:text-pink-300 mb-6 inline-flex items-center gap-2 font-bold transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver a Equipos
      </Link>
      <h1 className="text-4xl font-black mb-8 text-white">{isEditing ? 'Editar Equipo' : 'Crear Nuevo Equipo'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-black/40 p-8 rounded-3xl border border-white/10 space-y-6">
        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Nombre del Equipo</label>
          <input 
            {...register('name')} 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Ej. Los Vengadores de C-137"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Descripción</label>
          <textarea 
            {...register('description')} 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors min-h-[100px]"
            placeholder="Describe el propósito de tu equipo..."
          />
          {errors.description && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-white/60 mb-2">Añadir Personajes (Buscar por Nombre)</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Ej. Rick Sanchez, Morty..."
              type="text"
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
            />
          </div>
          {errors.characterIds && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.characterIds.message}</p>}
          
          <AnimatePresence>
            {searchTerm.length >= 2 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {isSearching ? (
                  <>
                    <CharacterSearchCardSkeleton />
                    <CharacterSearchCardSkeleton />
                  </>
                ) : searchResults?.results?.length > 0 ? (
                  searchResults.results.slice(0, 5).map(char => {
                    const isAdded = charIds.includes(char.id);
                    return (
                      <CharacterSearchCard 
                        key={char.id} 
                        character={char} 
                        isAdded={isAdded}
                        onClick={() => !isAdded && handleAddCharId(char.id)} 
                      />
                    );
                  })
                ) : (
                  <p className="text-white/50 text-sm text-center py-4">No se encontraron personajes con ese nombre.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {charIds.map(id => {
              const charData = selectedCharsData?.find(c => c.id === id);
              return (
                <span key={id} className="bg-purple-500/20 text-purple-200 border border-purple-500/30 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {charData ? charData.name : `Cargando...`}
                  <button type="button" onClick={() => handleRemoveCharId(id)} className="text-purple-400 hover:text-red-400 font-bold transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button 
            type="submit" 
            disabled={isCreating || isUpdating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(219,39,119,0.3)] disabled:opacity-50 transition-all"
          >
            {isCreating || isUpdating ? 'Guardando...' : (isEditing ? 'Actualizar Equipo' : 'Crear Equipo')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TeamFormPage;
