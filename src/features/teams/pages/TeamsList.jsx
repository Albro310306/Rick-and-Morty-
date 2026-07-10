import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { useTeams } from '../hooks/useTeams';

const TeamsList = () => {
  const { data: teams, isLoading, isError } = useTeams();

  if (isLoading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-purple-400 w-12 h-12" /></div>;
  if (isError) return <div className="text-center mt-20 text-red-400">Error al cargar los equipos. Asegúrate de correr npm run dev:all</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Mis Equipos
        </h1>
        <Link 
          to="/teams/new" 
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all"
        >
          + Crear Equipo
        </Link>
      </div>

      {!teams || teams.length === 0 ? (
        <div className="text-center py-20 bg-black/40 rounded-3xl border border-white/5">
          <p className="text-xl text-white/50 mb-4">Aún no has creado ningún equipo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <motion.div 
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-purple-500/50 transition-colors group cursor-pointer"
            >
              <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{team.name}</h2>
              <p className="text-white/60 text-sm mb-4 line-clamp-2">{team.description}</p>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                  {team.characterIds.length} Personajes
                </span>
                <Link to={`/teams/${team.id}`} className="flex items-center gap-1 text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors">
                  Ver Detalles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TeamsList;
