import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
  return (
    <>
      {/* Definición de los filtros SVG necesarios para los efectos de plasma */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="volatile-plasma" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="4"
            result="noise"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="15"
          ></feDisplacementMap>
          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
          <feComposite operator="in" in2="SourceGraphic"></feComposite>
        </filter>
        <filter id="cosmic-plasma" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="TURBULENCE"
            baseFrequency="0.02"
            numOctaves="5"
            seed="5"
            result="noise"
          ></feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
          ></feDisplacementMap>
          <feComposite operator="in" in2="SourceGraphic"></feComposite>
        </filter>
      </svg>

      <div className="flex flex-col gap-6 rounded-3xl border border-neutral-800 bg-[#0e0e0e]/80 backdrop-blur-xl p-8 shadow-2xl w-full max-w-md [perspective:1000px]">
        <div className="mb-2 flex items-center justify-between text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-[pulse_1.5s_infinite]"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-500/70">
              System: Online
            </span>
          </div>
          <div className="text-[10px] font-mono opacity-50">NAV-PORTAL</div>
        </div>

        {/* 1. EXPLORADOR (Home) - Usa el diseño MOLTEN pero adaptado a "INICIO" */}
        <NavLink to="/" end className="group relative flex cursor-pointer items-stretch gap-6 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:bg-neutral-900/50 hover:border-orange-900/20">
          {({ isActive }) => (
            <>
              <input type="checkbox" readOnly checked={isActive} className="peer hidden" />

              <div className="relative h-20 w-20 shrink-0 [transform-style:preserve-3d] group-hover:[transform:translateZ(20px)_rotateX(5deg)] peer-checked:[transform:translateZ(20px)] transition-all duration-500 ease-out">
                <div className="absolute inset-0 animate-[float_4s_ease-in-out_infinite]">
                  <div className="absolute inset-0 rounded-xl border-2 border-orange-500 opacity-0 peer-checked:animate-ping"></div>

                  <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-800 shadow-[inset_0_0_30px_black] transition-all duration-500 group-hover:border-orange-500/50 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,1)] peer-checked:border-orange-500 peer-checked:shadow-[0_0_50px_rgba(249,115,22,0.6),inset_0_0_20px_rgba(249,115,22,0.4)]">
                    <div
                      className="absolute inset-[-20%] opacity-0 transition-opacity duration-500 peer-checked:opacity-100"
                      style={{ filter: 'url(#volatile-plasma)', background: 'linear-gradient(45deg, #ff4500, #ff8c00)', mixBlendMode: 'hard-light' }}
                    ></div>

                    <div className="relative z-10 flex h-full w-full items-center justify-center text-neutral-500 transition-all duration-500 peer-checked:text-orange-100 peer-checked:drop-shadow-[0_0_5px_rgba(249,115,22,1)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center relative flex-grow border-b border-neutral-800 transition-all duration-500 peer-checked:border-orange-500/50">
                <span className="text-2xl font-black tracking-widest text-neutral-500/70 transition-all duration-500 group-hover:text-neutral-300 peer-checked:text-orange-500">
                  INICIO
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 transition-opacity peer-checked:text-orange-400">
                  Explorar Multiverso
                </span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange-500 transition-all duration-700 peer-checked:w-full shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
              </div>
            </>
          )}
        </NavLink>

        {/* 2. MIS EQUIPOS (Teams) - Usa el diseño VOID */}
        <NavLink to="/teams" end className="group relative flex cursor-pointer items-stretch gap-6 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:bg-neutral-900/50 hover:border-purple-900/20">
          {({ isActive }) => (
            <>
              <input type="checkbox" readOnly checked={isActive} className="peer hidden" />

              <div className="relative h-20 w-20 shrink-0 [transform-style:preserve-3d] group-hover:[transform:translateZ(20px)_rotateX(5deg)] peer-checked:[transform:translateZ(20px)] transition-all duration-500 ease-out">
                <div className="absolute inset-0 animate-[float_6s_ease-in-out_infinite_reverse]">
                  <div className="absolute inset-0 rounded-xl border-2 border-purple-500 opacity-0 peer-checked:animate-ping"></div>

                  <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-800 shadow-[inset_0_0_30px_black] transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,1)] peer-checked:border-purple-500 peer-checked:shadow-[0_0_50px_rgba(168,85,247,0.6),inset_0_0_30px_rgba(168,85,247,0.4)]">
                    <div
                      className="absolute inset-[-20%] opacity-0 transition-opacity duration-500 peer-checked:opacity-100"
                      style={{ filter: 'url(#cosmic-plasma)', background: 'linear-gradient(to bottom, #2e026d, #000000, #4c1d95)', mixBlendMode: 'screen' }}
                    ></div>

                    <div className="relative z-10 flex h-full w-full items-center justify-center text-neutral-500 transition-all duration-500 peer-checked:text-purple-100 peer-checked:drop-shadow-[0_0_10px_rgba(168,85,247,1)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center relative flex-grow border-b border-neutral-800 transition-all duration-500 peer-checked:border-purple-500/50">
                <span className="text-2xl font-black tracking-widest text-neutral-500/70 transition-all duration-500 group-hover:text-neutral-300 peer-checked:text-purple-500">
                  EQUIPOS
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 transition-opacity peer-checked:text-purple-400">
                  Base de Datos
                </span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 transition-all duration-700 peer-checked:w-full shadow-[0_0_15px_rgba(168,85,247,1)]"></div>
              </div>
            </>
          )}
        </NavLink>

        {/* 3. CREAR EQUIPO - Usa el diseño TOXIN */}
        <NavLink to="/teams/new" className="group relative flex cursor-pointer items-stretch gap-6 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:bg-neutral-900/50 hover:border-lime-900/20">
          {({ isActive }) => (
            <>
              <input type="checkbox" readOnly checked={isActive} className="peer hidden" />

              <div className="relative h-20 w-20 shrink-0 [transform-style:preserve-3d] group-hover:[transform:translateZ(20px)_rotateX(5deg)] peer-checked:[transform:translateZ(20px)] transition-all duration-500 ease-out">
                <div className="absolute inset-0 animate-[float_5s_ease-in-out_infinite] [animation-delay:1s]">
                  <div className="absolute inset-0 rounded-xl border-2 border-lime-500 opacity-0 peer-checked:animate-ping"></div>

                  <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-neutral-700 bg-neutral-800 shadow-[inset_0_0_30px_black] transition-all duration-500 group-hover:border-lime-500/50 group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,1)] peer-checked:border-lime-500 peer-checked:shadow-[0_0_50px_rgba(132,204,22,0.6),inset_0_0_30px_rgba(132,204,22,0.4)]">
                    <div
                      className="absolute inset-[-20%] opacity-0 transition-opacity duration-500 peer-checked:opacity-100"
                      style={{ filter: 'url(#volatile-plasma)', background: 'linear-gradient(45deg, #3f6212, #84cc16, #bef264)', mixBlendMode: 'hard-light' }}
                    ></div>

                    <div className="relative z-10 flex h-full w-full items-center justify-center text-neutral-500 transition-all duration-500 peer-checked:text-lime-100 peer-checked:drop-shadow-[0_0_10px_rgba(132,204,22,1)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
                        <path d="M12 2.25a.75.75 0 01.75.75v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V3a.75.75 0 01.75-.75z" />
                        <path d="M6.25 15a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H6.25z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center relative flex-grow border-b border-neutral-800 transition-all duration-500 peer-checked:border-lime-500/50">
                <span className="text-2xl font-black tracking-widest text-neutral-500/70 transition-all duration-500 group-hover:text-neutral-300 peer-checked:text-lime-500">
                  CREAR
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 transition-opacity peer-checked:text-lime-400">
                  Nuevo Proyecto
                </span>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-lime-500 transition-all duration-700 peer-checked:w-full shadow-[0_0_15px_rgba(132,204,22,1)]"></div>
              </div>
            </>
          )}
        </NavLink>
      </div>
    </>
  );
};

export default SideNav;
