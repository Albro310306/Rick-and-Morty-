import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Loader2, ArrowLeft } from 'lucide-react';
import { useTeam, useTeamMutations } from '../hooks/useTeams';
import { fetchMultipleCharacters } from '../../../api/rickAndMorty';
import CharacterCard from '../../../components/ui/CharacterCard';

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: team, isLoading: isTeamLoading, isError: isTeamError } = useTeam(id);
  const { deleteTeam, isDeleting } = useTeamMutations();

  // Integración de la segunda API: Usamos los characterIds obtenidos del JSON Server para consultar a Rick and Morty API
  const { data: characters, isLoading: isCharsLoading } = useQuery({
    queryKey: ['teamCharacters', team?.characterIds],
    queryFn: () => fetchMultipleCharacters(team.characterIds),
    enabled: !!team && team.characterIds.length > 0,
  });

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      deleteTeam(id);
      navigate('/teams');
    }
  };

  if (isTeamLoading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-purple-400 w-12 h-12" /></div>;
  if (isTeamError || !team) return <div className="text-center mt-20 text-red-400">Error al cargar el equipo.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <Link to="/teams" className="text-pink-400 hover:text-pink-300 mb-6 inline-flex items-center gap-2 font-bold transition-colors">
        <ArrowLeft className="w-5 h-5" /> Volver a Equipos
      </Link>

      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mb-4">{team.name}</h1>
            <p className="text-lg text-white/70 max-w-2xl">{team.description}</p>
          </div>
          <div className="flex gap-4">
            <Link 
              to={`/teams/${team.id}/edit`}
              className="px-6 py-2.5 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Editar
            </Link>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-6 py-2.5 flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 rounded-xl font-bold transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Miembros del Equipo ({team.characterIds.length})</h2>
      
      {isCharsLoading ? (
        <div className="flex justify-center mt-10"><Loader2 className="animate-spin text-pink-400 w-12 h-12" /></div>
      ) : characters && characters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {characters.map((char, i) => (
            <motion.div 
              key={char.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
            >
              <CharacterCard character={char} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-lg">Este equipo no tiene personajes asignados.</p>
      )}
    </motion.div>
  );
};

export default TeamDetail;
