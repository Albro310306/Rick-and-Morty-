import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const STATUS_OPTIONS = [
  { value: '',        label: 'Todos',        emoji: '🌌' },
  { value: 'alive',   label: 'Vivo',         emoji: '🟢' },
  { value: 'dead',    label: 'Muerto',       emoji: '🔴' },
  { value: 'unknown', label: 'Desconocido',  emoji: '⚪' },
];

/**
 * Componente de barra de búsqueda con filtros desplegables integrados.
 * Tiene un estilo "cyber" avanzado con animaciones y gradientes.
 *
 * @param {object} props.register - Función de registro de react-hook-form.
 * @param {string} props.currentStatus - El estado de filtro actualmente seleccionado.
 * @param {function} props.onStatusChange - Función para actualizar el filtro de estado.
 */
const SearchInput = ({ register, currentStatus = '', onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /**
   * Abre o cierra el menú de filtros.
   * Calcula la posición del botón para renderizar el menú desplegable (Portal) correctamente en pantalla.
   */
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
    <StyledWrapper>
      <div>
        <div id="poda">
          <div className="glow" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="darkBorderBg" />
          <div className="white" />
          <div className="border" />
          <div id="main">
            <input
              placeholder="Buscar personaje..."
              type="text"
              className="input"
              {...(register ? register('search') : {})}
            />
            <div id="input-mask" />
            <div id="pink-mask" />
            <div className="filterBorder" />
            <div
              id="filter-icon"
              ref={filterRef}
              onClick={handleFilterClick}
              title="Filtrar por estado"
            >
              <svg preserveAspectRatio="none" height={27} width={27} viewBox="4.8 4.56 14.832 15.408" fill="none">
                <path
                  d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                  stroke={currentStatus ? '#cf30aa' : '#d6d6e6'}
                  strokeWidth={currentStatus ? 1.5 : 1}
                  strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              {currentStatus && <span className="active-dot" />}
            </div>
            <div id="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" height={24} fill="none">
                <circle stroke="url(#search)" r={8} cy={11} cx={11} />
                <line stroke="url(#searchl)" y2="16.65" y1={22} x2="16.65" x1={22} />
                <defs>
                  <linearGradient gradientTransform="rotate(50)" id="search">
                    <stop stopColor="#f8e7f8" offset="0%" />
                    <stop stopColor="#b6a9b7" offset="50%" />
                  </linearGradient>
                  <linearGradient id="searchl">
                    <stop stopColor="#b6a9b7" offset="0%" />
                    <stop stopColor="#837484" offset="50%" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>

    {/* Portal: renders dropdown at body level to avoid clipping */}
    {open && ReactDOM.createPortal(
      <PortalDropdown
        style={{ top: dropdownPos.top, left: dropdownPos.left }}
        onMouseDown={e => e.stopPropagation()}
      >
        {STATUS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`item ${currentStatus === opt.value ? 'active' : ''}`}
            onClick={() => {
              onStatusChange?.(opt.value);
              setOpen(false);
            }}
          >
            <span>{opt.emoji}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </PortalDropdown>,
      document.body
    )}
    </>
  );
};

const StyledWrapper = styled.div`
  .white, .border, .darkBorderBg, .glow {
    max-height: 70px;
    max-width: 314px;
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    z-index: -1;
    border-radius: 12px;
    filter: blur(3px);
  }

  .input {
    background-color: #010201;
    border: none;
    width: 301px;
    height: 56px;
    border-radius: 10px;
    color: white;
    padding-inline: 59px;
    font-size: 18px;
  }

  #poda {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input::placeholder { color: #c0b9c0; }
  .input:focus { outline: none; }
  #main:focus-within > #input-mask { display: none; }

  #input-mask {
    pointer-events: none;
    width: 100px; height: 20px;
    position: absolute;
    background: linear-gradient(90deg, transparent, black);
    top: 18px; left: 70px;
  }

  #pink-mask {
    pointer-events: none;
    width: 30px; height: 20px;
    position: absolute;
    background: #cf30aa;
    top: 10px; left: 5px;
    filter: blur(20px);
    opacity: 0.8;
    transition: all 2s;
  }
  #main:hover > #pink-mask { opacity: 0; }

  .white {
    max-height: 63px;
    max-width: 307px;
    border-radius: 10px;
    filter: blur(2px);
  }
  .white::before {
    content: "";
    z-index: -2;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(83deg);
    position: absolute;
    width: 600px; height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.4);
    background-image: conic-gradient(
      rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%,
      rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%
    );
    transition: all 2s;
  }

  .border {
    max-height: 59px;
    max-width: 303px;
    border-radius: 11px;
    filter: blur(0.5px);
  }
  .border::before {
    content: "";
    z-index: -2;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(70deg);
    position: absolute;
    width: 600px; height: 600px;
    filter: brightness(1.3);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #1c191c, #402fb5 5%, #1c191c 14%,
      #1c191c 50%, #cf30aa 60%, #1c191c 64%
    );
    transition: all 2s;
  }

  .darkBorderBg { max-height: 65px; max-width: 312px; }
  .darkBorderBg::before {
    content: "";
    z-index: -2;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(82deg);
    position: absolute;
    width: 600px; height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%,
      rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%
    );
    transition: all 2s;
  }

  #poda:hover > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(-98deg); }
  #poda:hover > .glow::before         { transform: translate(-50%, -50%) rotate(-120deg); }
  #poda:hover > .white::before        { transform: translate(-50%, -50%) rotate(-97deg); }
  #poda:hover > .border::before       { transform: translate(-50%, -50%) rotate(-110deg); }

  #poda:focus-within > .darkBorderBg::before { transform: translate(-50%, -50%) rotate(442deg); transition: all 4s; }
  #poda:focus-within > .glow::before         { transform: translate(-50%, -50%) rotate(420deg); transition: all 4s; }
  #poda:focus-within > .white::before        { transform: translate(-50%, -50%) rotate(443deg); transition: all 4s; }
  #poda:focus-within > .border::before       { transform: translate(-50%, -50%) rotate(430deg); transition: all 4s; }

  .glow {
    overflow: hidden;
    filter: blur(30px);
    opacity: 0.4;
    max-height: 130px;
    max-width: 354px;
  }
  .glow::before {
    content: "";
    z-index: -2;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(60deg);
    position: absolute;
    width: 999px; height: 999px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(
      #000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%
    );
    transition: all 2s;
  }

  @keyframes rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }

  #filter-icon {
    position: absolute;
    top: 8px; right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    max-height: 40px; max-width: 38px;
    height: 100%; width: 100%;
    isolation: isolate;
    overflow: visible;
    border-radius: 10px;
    background: linear-gradient(180deg, #161329, black, #1d1b4b);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 0.2s;
  }
  #filter-icon:hover { background: linear-gradient(180deg, #221840, #0a0010, #2a1a50); }

  .active-dot {
    position: absolute;
    top: -3px; right: -3px;
    width: 7px; height: 7px;
    background: #cf30aa;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(207,48,170,0.9);
  }

  /* Dropdown opens to the RIGHT */
  .dropdown {
    position: absolute;
    top: 0;
    left: calc(100% + 10px);
    min-width: 160px;
    background: rgba(10, 2, 20, 0.97);
    border: 1px solid rgba(64, 47, 181, 0.5);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 8px 8px 32px rgba(0,0,0,0.9), 0 0 20px rgba(110,27,96,0.3);
    backdrop-filter: blur(20px);
    z-index: 100;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 16px;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.75);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }
  .dropdown-item:hover { background: rgba(64,47,181,0.2); color: white; }
  .dropdown-item.active { background: rgba(110,27,96,0.3); color: #dfa2da; font-weight: 700; }
  .dropdown-item + .dropdown-item { border-top: 1px solid rgba(64,47,181,0.12); }

  .filterBorder {
    height: 42px; width: 40px;
    position: absolute;
    overflow: hidden;
    top: 7px; right: 7px;
    border-radius: 10px;
  }
  .filterBorder::before {
    content: "";
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    position: absolute;
    width: 600px; height: 600px;
    background-repeat: no-repeat;
    background-position: 0 0;
    filter: brightness(1.35);
    background-image: conic-gradient(
      rgba(0,0,0,0), #3d3a4f, rgba(0,0,0,0) 50%,
      rgba(0,0,0,0) 50%, #3d3a4f, rgba(0,0,0,0) 100%
    );
    animation: rotate 4s linear infinite;
  }

  #main { position: relative; }
  #search-icon { position: absolute; left: 20px; top: 15px; }
`;

const PortalDropdown = styled.div`
  position: fixed;
  z-index: 9999;
  min-width: 165px;
  background: rgba(10, 2, 20, 0.97);
  border: 1px solid rgba(64, 47, 181, 0.5);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 8px 8px 32px rgba(0,0,0,0.9), 0 0 20px rgba(110,27,96,0.3);
  backdrop-filter: blur(20px);

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 16px;
    background: transparent;
    border: none;
    color: rgba(255,255,255,0.75);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }
  .item:hover { background: rgba(64,47,181,0.2); color: white; }
  .item.active { background: rgba(110,27,96,0.3); color: #dfa2da; font-weight: 700; }
  .item + .item { border-top: 1px solid rgba(64,47,181,0.12); }
`;

export default SearchInput;
