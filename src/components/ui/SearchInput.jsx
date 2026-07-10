import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const STATUS_OPTIONS = [
  { value: '',        label: 'Todos',        emoji: '🌌' },
  { value: 'alive',   label: 'Vivo',         emoji: '🟢' },
  { value: 'dead',    label: 'Muerto',       emoji: '🔴' },
  { value: 'unknown', label: 'Desconocido',  emoji: '⚪' },
];

/**
 * Componente de barra de búsqueda con filtros desplegables integrados.
 * Estilizado puramente con clases de utilidad de Tailwind CSS.
 */
const SearchInput = ({ register, currentStatus = '', onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const filterRef = useRef(null);
  const portalRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      if (
        filterRef.current &&
        !filterRef.current.contains(target) &&
        portalRef.current &&
        !portalRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleFilterClick = () => {
    if (filterRef.current) {
      const rect = filterRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.top,
        left: rect.right + 10,
      });
    }
    setOpen(o => !o);
  };

  return (
    <>
      <div className="flex justify-center w-full max-w-lg mx-auto my-8 px-4">
        <div className="relative flex items-center w-full bg-black/50 backdrop-blur-md rounded-full border border-purple-500/30 p-2 shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 focus-within:shadow-[0_0_30px_rgba(139,92,246,0.4)] focus-within:border-purple-500">
          
          <div className="pl-4 pr-2 text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 24 24" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" height={20} fill="none" stroke="currentColor">
              <circle r={8} cy={11} cx={11} />
              <line y2="16.65" y1={22} x2="16.65" x1={22} />
            </svg>
          </div>

          <input
            placeholder="Buscar personaje..."
            type="text"
            className="flex-1 bg-transparent border-none text-white text-sm font-medium outline-none placeholder:text-gray-500 px-2"
            {...(register ? register('search') : {})}
          />

          <div
            ref={filterRef}
            onClick={handleFilterClick}
            title="Filtrar por estado"
            className="relative flex items-center justify-center p-2 rounded-full cursor-pointer transition-colors duration-200 hover:bg-purple-500/20"
          >
            <svg preserveAspectRatio="none" height={22} width={22} viewBox="4.8 4.56 14.832 15.408" fill="none">
              <path
                d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                stroke={currentStatus ? '#cf30aa' : '#a78bfa'}
                strokeWidth={currentStatus ? 1.5 : 1.5}
                strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            {currentStatus && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_6px_rgba(236,72,153,0.8)] animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Menú de filtros (Portal) */}
      {open &&
        ReactDOM.createPortal(
          <div
            ref={portalRef}
            className="fixed z-[1000] bg-[#0c0716] border border-purple-500/30 rounded-xl p-2 w-48 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-[slide-in_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]"
            style={{
              top: dropdownPos.top,
              left: Math.min(dropdownPos.left, window.innerWidth - 200),
            }}
          >
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-3 py-2 border-b border-white/5 mb-1">
              Estado Vital
            </div>
            {STATUS_OPTIONS.map((opt) => {
              const isActive = currentStatus === opt.value;
              return (
                <button
                  key={opt.value}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500 shadow-[inset_0_0_12px_rgba(139,92,246,0.1)]'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => {
                    onStatusChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span className="text-base">{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
};

export default SearchInput;
