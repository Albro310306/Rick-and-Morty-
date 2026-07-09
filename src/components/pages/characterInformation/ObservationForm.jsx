import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const observationSchema = z.object({
  investigator: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre no puede superar 50 caracteres'),
  rank: z.string().min(1, 'Debes seleccionar un rango'),
  observation: z.string().min(10, 'La observación debe tener al menos 10 caracteres').max(300, 'La observación no puede superar 300 caracteres'),
});

const RANKS = [
  { value: '', label: 'Selecciona un rango...' },
  { value: 'junior', label: 'Científico Júnior' },
  { value: 'senior', label: 'Científico Sénior' },
  { value: 'lead', label: 'Investigador Líder' },
  { value: 'rick', label: 'Nivel Rick' },
];

const RANK_ICON = {
  junior: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  senior: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  lead: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  rick: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

export const ObservationInput = ({ characterName, submitStatus, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(observationSchema),
  });

  const onSubmit = (data) => {
    onFormSubmit(data, reset);
  };

  return (
    <div className="mt-8 pt-6 border-t border-dashed border-white/10 w-full">
      <div className="flex items-center gap-3 mb-5">
        <span className="bg-purple-500/15 p-2.5 rounded-xl text-purple-400">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </span>
        <div>
          <h3 className="m-0 text-base font-extrabold text-slate-100">Registrar Observación</h3>
          <p className="m-0 mt-0.5 text-xs text-purple-300/70">Añade datos empíricos de <em>{characterName}</em></p>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl mb-5 animate-fade-in bg-green-400/10 border border-green-400/30 text-green-400">
          <span className="text-xl">✅</span>
          <div>
            <strong className="block text-sm mb-0.5">Observación guardada</strong>
            <p className="m-0 text-xs opacity-80">Transmitido a la base de datos.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl mb-5 animate-fade-in bg-red-400/10 border border-red-400/30 text-red-400">
          <span className="text-xl">⚠️</span>
          <div>
            <strong className="block text-sm mb-0.5">Error de transmisión</strong>
            <p className="m-0 text-xs opacity-80">No se pudo conectar. Reintenta.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex flex-col flex-1">
            <label className="text-[11px] uppercase font-bold text-white/60 mb-2 tracking-wide" htmlFor="investigator">Investigador</label>
            <input
              id="investigator"
              type="text"
              className={`bg-black/30 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/20 focus:bg-black/50 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(139,92,246,0.2)] ${errors.investigator ? 'border-red-400 animate-shake bg-red-400/5' : 'border-purple-500/30'}`}
              placeholder="Ej. Morty Smith"
              {...register('investigator')}
            />
            {errors.investigator && <span className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 before:content-['⚠️'] before:text-[10px]">{errors.investigator.message}</span>}
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-[11px] uppercase font-bold text-white/60 mb-2 tracking-wide" htmlFor="rank">Rango</label>
            <select
              id="rank"
              className={`bg-black/30 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all cursor-pointer appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg_xmlns='http://www.w3.org/2000/svg'_viewBox='0_0_24_24'_fill='none'_stroke='rgba(167,139,250,0.5)'_stroke-width='2'_stroke-linecap='round'_stroke-linejoin='round'%3e%3cpolyline_points='6_9_12_15_18_9'%3e%3c/polyline%3e%3c/svg%3e")] bg-no-repeat bg-[position:right_12px_center] bg-[length:16px] pr-10 focus:bg-black/50 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(139,92,246,0.2)] ${errors.rank ? 'border-red-400 animate-shake bg-red-400/5' : 'border-purple-500/30'}`}
              {...register('rank')}
            >
              {RANKS.map(r => (
                <option key={r.value} value={r.value} className="bg-[#0f0a1c] text-white">{r.label}</option>
              ))}
            </select>
            {errors.rank && <span className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 before:content-['⚠️'] before:text-[10px]">{errors.rank.message}</span>}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-[11px] uppercase font-bold text-white/60 mb-2 tracking-wide" htmlFor="observation">Observación</label>
          <textarea
            id="observation"
            rows={2}
            className={`resize-y min-h-[80px] bg-black/30 border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-white/20 focus:bg-black/50 focus:border-purple-400 focus:shadow-[0_0_12px_rgba(139,92,246,0.2)] ${errors.observation ? 'border-red-400 animate-shake bg-red-400/5' : 'border-purple-500/30'}`}
            placeholder="Describe la anomalía detectada..."
            {...register('observation')}
          />
          {errors.observation && <span className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 before:content-['⚠️'] before:text-[10px]">{errors.observation.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={submitStatus === 'loading'}
          className="group relative overflow-hidden w-full p-3.5 rounded-xl border-none bg-gradient-to-br from-purple-600 to-orange-600 text-white font-extrabold text-sm tracking-wider uppercase cursor-pointer flex justify-center items-center gap-2 transition-all duration-300 disabled:bg-slate-600 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed disabled:opacity-80 hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_24px_rgba(139,92,246,0.4)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {submitStatus === 'loading' ? (
            <><span className="w-4 h-4 border-4 border-white/30 border-t-white rounded-full animate-spin" /> Transmitiendo...</>
          ) : (
            <><span className="flex items-center"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></span> Enviar</>
          )}
        </button>
      </form>
    </div>
  );
};

export const ObservationList = ({ characterName, observations, loadingObs }) => {
  return (
    <div className="w-full mt-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-orange-500/15 p-2.5 rounded-xl text-orange-400">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
        </span>
        <div>
          <h3 className="m-0 text-lg font-extrabold text-white">Historial de Observaciones</h3>
          <p className="m-0 mt-0.5 text-[13px] text-white/50">Reportes sobre <em>{characterName}</em></p>
        </div>
        <span className="ml-auto bg-white/10 px-3 py-1 rounded-full text-xs font-extrabold text-white">
          {observations.length}
        </span>
      </div>

      {loadingObs ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[90px] rounded-2xl bg-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shake" />
            </div>
          ))}
        </div>
      ) : observations.length === 0 ? (
        <div className="text-center p-12 bg-black/20 rounded-2xl border border-dashed border-white/10">
          <span className="inline-flex text-white/20 mb-3">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </span>
          <p className="m-0 text-white/40 text-sm">Base de datos vacía. ¡Sé el primero en reportar anomalías!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {observations.map(obs => (
            <div key={obs.id} className={`bg-white/5 border rounded-2xl p-4 md:p-5 transition-all duration-200 hover:bg-white/10 hover:border-purple-500/30 ${obs.isNew ? 'animate-slide-in border-green-400/40 shadow-[0_0_20px_rgba(74,222,128,0.1)]' : 'border-white/10'}`}>
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-base text-purple-400 flex">
                    {RANK_ICON[obs.rank] || <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                  </span>
                  <span className="text-sm font-extrabold text-white">{obs.investigator}</span>
                  {obs.isNew && <span className="text-[9px] font-extrabold text-black bg-green-400 px-1.5 py-0.5 rounded tracking-wide">NUEVO</span>}
                </div>
                <span className="text-[11px] text-white/40">{obs.date}</span>
              </div>
              <p className="m-0 text-[13px] leading-relaxed text-white/70">{obs.observation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
