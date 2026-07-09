import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById, fetchLocationByUrl, fetchEpisodeByUrl } from '../../../api/rickAndMorty';
import { ObservationInput, ObservationList } from './ObservationForm';
import SpotifyWidget from './SpotifyWidget';

const getSeason = (epString) => {
  if (!epString) return null;
  const match = epString.match(/S(\d{2})/);
  return match ? parseInt(match[1], 10) : null;
};

const getStatusConfig = (status) => {
  switch (status?.toLowerCase()) {
    case 'alive': return { color: '#4ade80', glow: 'rgba(74,222,128,0.2)', label: 'VIVO' };
    case 'dead':  return { color: '#f87171', glow: 'rgba(248,113,113,0.2)', label: 'MUERTO' };
    default:      return { color: '#94a3b8', glow: 'rgba(148,163,184,0.2)', label: 'DESCONOCIDO' };
  }
};

const DetailSkeleton = () => (
  <div className="flex flex-col gap-6 max-w-4xl mx-auto px-6 py-12">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
    </div>
  </div>
);

const CharacterDetail = () => {
  const { id } = useParams();
  const [observations, setObservations] = useState([]);
  const [loadingObs, setLoadingObs] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      setLoadingObs(true);
      const timer = setTimeout(() => {
        const stored = localStorage.getItem(`obs_${id}`);
        setObservations(stored ? JSON.parse(stored) : []);
        setLoadingObs(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleObservationSubmit = (data, resetForm) => {
    setSubmitStatus('loading');
    setTimeout(() => {
      const newObs = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...data,
        isNew: true
      };
      
      const updated = [newObs, ...observations];
      setObservations(updated);
      localStorage.setItem(`obs_${id}`, JSON.stringify(updated.map(o => ({...o, isNew: false}))));
      
      setSubmitStatus('success');
      resetForm();
      
      setTimeout(() => {
        setObservations(prev => prev.map(o => o.id === newObs.id ? {...o, isNew: false} : o));
      }, 3000);
      
      setTimeout(() => setSubmitStatus(null), 4000);
    }, 1500);
  };

  const { data: character, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });

  const { data: firstEp } = useQuery({
    queryKey: ['episode', character?.episode?.[0]],
    queryFn: () => fetchEpisodeByUrl(character?.episode?.[0]),
    enabled: !!character?.episode?.[0],
  });

  const lastEpUrl = character?.episode?.[character?.episode?.length - 1];
  const { data: lastEp } = useQuery({
    queryKey: ['episode', lastEpUrl],
    queryFn: () => fetchEpisodeByUrl(lastEpUrl),
    enabled: !!lastEpUrl && lastEpUrl !== character?.episode?.[0],
  });

  const { data: originDetails } = useQuery({
    queryKey: ['location', character?.origin?.url],
    queryFn: () => fetchLocationByUrl(character?.origin?.url),
    enabled: !!character?.origin?.url,
  });

  const { data: locationDetails } = useQuery({
    queryKey: ['location', character?.location?.url],
    queryFn: () => fetchLocationByUrl(character?.location?.url),
    enabled: !!character?.location?.url,
  });

  if (isLoading) return <div className="min-h-screen text-white"><DetailSkeleton /></div>;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-white">
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl text-center max-w-md w-full backdrop-blur-md">
          <span className="text-red-400 flex justify-center mb-4">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" /></svg>
          </span>
          <h2 className="text-2xl font-black text-red-400 mb-2 uppercase tracking-wider">Portal roto</h2>
          <p className="text-white/60 mb-6">{error.message}</p>
          <Link to="/" className="inline-block bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-bold transition-all">← Volver al explorador</Link>
        </div>
      </div>
    );
  }

  const status = getStatusConfig(character.status);
  const epCount = character.episode?.length || 0;
  const totalEps = 51;
  const firstSeason = getSeason(firstEp?.episode);
  const lastSeason = getSeason((lastEp ?? firstEp)?.episode);

  return (
    <div className="min-h-screen text-white pb-20 overflow-x-hidden">
      {/* Top Nav */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6">
        <Link to="/" className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
          Explorador
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 mb-12 flex justify-center animate-fade-in border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[60px] opacity-30 mix-blend-screen scale-110"
          style={{ backgroundImage: `url(${character.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-black/50 to-[#0a0a0f] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12 max-w-6xl w-full">
          {/* Avatar */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
            <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-[border-spin_4s_linear_infinite]" />
            <div className="absolute inset-[-10px] rounded-full border border-orange-500/20 border-dashed animate-[border-spin_8s_linear_infinite_reverse]" />
            <img src={character.image} alt={character.name} className="w-full h-full rounded-full object-cover border-4 border-black shadow-[0_0_40px_rgba(139,92,246,0.3)] relative z-10" />
            <div 
              className="absolute bottom-4 right-4 w-6 h-6 rounded-full border-4 border-[#0a0a0f] z-20"
              style={{ background: status.color, boxShadow: `0 0 12px ${status.color}` }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left min-w-0 w-full">
            <h1 className="text-4xl md:text-6xl font-black mb-4 truncate drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-tight">
              {character.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
              <span 
                className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border backdrop-blur-md shadow-md"
                style={{ borderColor: status.color, color: status.color, background: status.glow }}
              >
                {status.label}
              </span>
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.572 3-3.143 3-5" /><path d="M12 7c-1.798-1.572-3-3.143-3-5" /><path d="M15 2c1.798 1.572 3 3.143 3 5" /><path d="M12 17c1.798 1.572 3 3.143 3 5" /><path d="M9 2c-1.798 1.572-3 3.143-3 5" /><path d="M2 9c6.667 6 13.333 0 20 6" /></svg>
                {character.species}
              </span>
              {character.type && (
                <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-orange-400"><path d="M19.8 18.4L14 10.67V6.5l1.35-1.69C15.61 4.48 15.38 4 14.96 4H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6zM12 6h2v4H10V6z" /></svg>
                  {character.type}
                </span>
              )}
              <span className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-blue-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                {character.gender}
              </span>
            </div>

            <div className="w-full max-w-lg mx-auto md:mx-0">
              <SpotifyWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 animate-[slide-in_0.5s_ease-out] items-start">
        
        {/* HUD Datos Operativos */}
        <div className="bg-[#080414]/80 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 md:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)] flex flex-col">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
            <span className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>
            </span>
            <h2 className="text-xl md:text-2xl font-black m-0 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Datos Operativos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center justify-center relative bg-black/30 rounded-2xl p-4 border border-white/5">
              <svg viewBox="0 0 36 36" className="w-20 h-20">
                <path className="fill-none stroke-purple-500/10 stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="fill-none stroke-purple-500 stroke-[3] drop-shadow-[0_0_6px_rgba(168,85,247,0.8)] animate-[border-spin_2s_ease-out]" strokeDasharray={`${(epCount / totalEps) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">{epCount}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400">Eps</span>
              </div>
            </div>

            <div className="col-span-2 bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1">Temporadas activo</span>
              <span className="text-2xl font-black text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] flex items-center gap-2 mb-1">
                {firstSeason || '?'} <span className="text-white/20 text-sm">→</span> {lastSeason || '?'}
              </span>
              <span className="text-xs text-white/40">Un total de {lastSeason - firstSeason + 1 || 1} temporadas</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-white/50 mb-2">
              <span>Nivel de Relevancia</span>
              <span>{epCount > 10 ? 'Alto' : 'Bajo'} Perfil</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-orange-500 shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-1000"
                style={{ width: `${Math.min(100, (epCount / totalEps) * 100)}%` }}
              />
            </div>
          </div>

          <ObservationInput 
            characterName={character.name}
            submitStatus={submitStatus}
            onFormSubmit={handleObservationSubmit}
          />
        </div>

        <div className="flex flex-col gap-8">
          {/* ADN e Identidad */}
          <div className="bg-[#080414]/80 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 md:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)] flex flex-col relative overflow-hidden">
            <svg className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.02] -rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/></svg>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <span className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.572 3-3.143 3-5"/><path d="M12 7c-1.798-1.572-3-3.143-3-5"/><path d="M15 2c1.798 1.572 3 3.143 3 5"/><path d="M12 17c1.798 1.572 3 3.143 3 5"/><path d="M9 2c-1.798 1.572-3 3.143-3 5"/><path d="M2 9c6.667 6 13.333 0 20 6"/></svg>
              </span>
              <h2 className="text-xl md:text-2xl font-black m-0 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Origen Biológico</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">Dimensión Natal</span>
                  <strong className="text-base font-extrabold text-white">{originDetails?.dimension || 'Dimensión Desconocida'}</strong>
                  <span className="text-xs text-white/50">{character.origin?.name}</span>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-0.5">Tipo de Mundo Natal</span>
                  <strong className="text-base font-extrabold text-white">{originDetails?.type || 'Tipo Desconocido'}</strong>
                  <span className="text-xs text-white/50">{originDetails?.residents?.length || 0} residentes conocidos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación Actual */}
          <div className="bg-[#080414]/80 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 md:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)] flex flex-col relative overflow-hidden">
             <svg className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.02] -rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <span className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </span>
              <h2 className="text-xl md:text-2xl font-black m-0 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Coordenadas Actuales</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">Dimensión Actual</span>
                  <strong className="text-base font-extrabold text-white">{locationDetails?.dimension || 'Dimensión Desconocida'}</strong>
                  <span className="text-xs text-white/50">{character.location?.name}</span>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex justify-center items-center shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-0.5">Tipo de Localidad</span>
                  <strong className="text-base font-extrabold text-white">{locationDetails?.type || 'Tipo Desconocido'}</strong>
                  <span className="text-xs text-white/50">{locationDetails?.residents?.length || 0} residentes detectados</span>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Observaciones */}
          <div className="bg-[#080414]/80 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 md:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(139,92,246,0.15)] flex flex-col">
            <ObservationList 
              characterName={character.name}
              observations={observations}
              loadingObs={loadingObs}
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default CharacterDetail;
