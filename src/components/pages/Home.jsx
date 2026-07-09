import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchCharacters } from '../../api/rickAndMorty';
import CharacterCard from '../ui/CharacterCard';
import SkeletonCard from '../ui/SkeletonCard';
import SearchInput from '../ui/SearchInput';
import Pagination from '../ui/Pagination';

const searchSchema = z.object({
  search: z.string().optional(),
});

const STATUS_LABELS = { alive: 'Vivo', dead: 'Muerto', unknown: 'Desconocido' };

/**
 * Componente principal de la página de inicio.
 * Estilizado con Tailwind CSS.
 */
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nameFilter = searchParams.get('name') || '';
  const statusFilter = searchParams.get('status') || '';
  const pageFilter = parseInt(searchParams.get('page') || '1', 10);
  const [showSkeletons, setShowSkeletons] = useState(false);

  const { register, watch } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: nameFilter },
  });

  const searchValue = watch('search');

  useEffect(() => {
    if (searchValue === nameFilter) return;

    const timer = setTimeout(() => {
      const params = {};
      if (searchValue) params.name = searchValue;
      if (statusFilter) params.status = statusFilter;
      setSearchParams(params);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, nameFilter, statusFilter, setSearchParams]);

  const handleStatusChange = (status) => {
    const params = {};
    if (searchValue) params.name = searchValue;
    if (status) params.status = status;
    setSearchParams(params);
  };

  const goToPage = (page) => {
    const params = {};
    if (nameFilter) params.name = nameFilter;
    if (statusFilter) params.status = statusFilter;
    if (page > 1) params.page = page;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', nameFilter, statusFilter, pageFilter],
    queryFn: () => fetchCharacters(nameFilter, statusFilter, pageFilter),
    retry: false,
  });

  useEffect(() => {
    if (isLoading) {
      setShowSkeletons(true);
    } else {
      const t = setTimeout(() => setShowSkeletons(false), 600);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  const isActuallyLoading = isLoading || showSkeletons;
  const hasActiveFilter = nameFilter || statusFilter;

  return (
    <div className="min-h-screen text-white pb-20">
      {/* ── HERO ─────────────────────────────── */}
      <section className="relative pt-16 pb-10 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.18)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 animate-fade-in">
          <h1 className="flex flex-col items-center justify-center mb-6 select-none uppercase">
            <span className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-[0_4px_12px_rgba(139,92,246,0.5)] tracking-[0.2em] animate-pulse">MULTIVERSO</span>
            <span className="text-4xl md:text-7xl font-black text-white/90 tracking-[0.3em] drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] mt-[-10px] md:mt-[-15px]">EXPLORER</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-base text-white/60 mb-8 leading-relaxed">
            Más de <strong className="text-purple-300 font-bold">826 personajes</strong> de todas las dimensiones.<br />
            Encuentra a tus favoritos del universo de <em className="text-orange-400 not-italic font-bold">Rick and Morty</em>.
          </p>

          <div className="relative z-20">
            <SearchInput
              register={register}
              currentStatus={statusFilter}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Active filters */}
          {hasActiveFilter && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {nameFilter && (
                <span className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 text-purple-200 px-4 py-1.5 rounded-full text-sm font-semibold shadow-[0_0_12px_rgba(139,92,246,0.3)] animate-slide-in">
                  🔍 "{nameFilter}"
                  <button className="text-white hover:text-red-400" onClick={() => {
                    const p = {};
                    if (statusFilter) p.status = statusFilter;
                    setSearchParams(p);
                  }}>✕</button>
                </span>
              )}
              {statusFilter && (
                <span className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-200 px-4 py-1.5 rounded-full text-sm font-semibold shadow-[0_0_12px_rgba(249,115,22,0.3)] animate-slide-in">
                  {statusFilter === 'alive' ? '🟢' : statusFilter === 'dead' ? '🔴' : '⚪'} {STATUS_LABELS[statusFilter]}
                  <button className="text-white hover:text-red-400" onClick={() => {
                    const p = {};
                    if (nameFilter) p.name = nameFilter;
                    setSearchParams(p);
                  }}>✕</button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 relative z-10">
        {isError && (
          <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/30 p-6 rounded-2xl max-w-lg mx-auto my-12 text-red-400 animate-shake">
            <span className="text-4xl">⚠️</span>
            <div>
              <p className="font-bold text-lg mb-1">Error al cargar datos</p>
              <p className="text-sm opacity-80">{error.message}</p>
            </div>
          </div>
        )}

        {!isActuallyLoading && !isError && data?.info && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-white/10 text-sm font-bold text-white/40 tracking-wider">
            <span>{data.info.count} personajes encontrados</span>
          </div>
        )}

        {isActuallyLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {data?.results?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                  {data.results.map(c => <CharacterCard key={c.id} character={c} />)}
                </div>
              </>
            ) : (
              !isError && (
                <div className="text-center py-20 px-6 bg-black/40 backdrop-blur-md rounded-3xl border border-white/5 max-w-2xl mx-auto shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                  <p className="text-6xl mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">🌌</p>
                  <h3 className="text-2xl font-bold text-white mb-2">Ningún personaje encontrado</h3>
                  <p className="text-white/40 mb-8">Prueba con otra búsqueda o cambia el filtro de estado</p>
                  <button 
                    onClick={() => setSearchParams({})}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider transition-all"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
