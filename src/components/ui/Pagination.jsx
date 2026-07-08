import React from 'react';
import styled from 'styled-components';

/**
 * Componente de paginación con estilo "cyber".
 * Permite navegar a la página anterior o siguiente y muestra la página actual.
 * 
 * @param {number} props.currentPage - La página en la que nos encontramos actualmente.
 * @param {number} props.totalPages - El número total de páginas disponibles.
 * @param {function} props.onPrev - Función que se ejecuta al presionar "Página anterior".
 * @param {function} props.onNext - Función que se ejecuta al presionar "Página siguiente".
 */
const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <StyledWrapper>
      <div className="container">

        {/* ◄ PREV */}
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={onPrev}
            disabled={currentPage <= 1}
            aria-label="Página anterior"
          >
            <span aria-hidden>◄</span> PREV
            <span aria-hidden className="btn__glitch">◄_PREV</span>
            <span className="number">pg</span>
          </button>
        </div>

        {/* Center: page indicator (no button) */}
        <div className="center-display">
          <span className="page-label">PAGE</span>
          <span className="page-num">{currentPage}</span>
          <span className="page-sep">/</span>
          <span className="page-total">{totalPages}</span>
        </div>

        {/* NEXT ► */}
        <div className="btn-wrapper">
          <button
            className="btn"
            onClick={onNext}
            disabled={currentPage >= totalPages}
            aria-label="Página siguiente"
          >
            NEXT <span aria-hidden>►</span>
            <span aria-hidden className="btn__glitch">NEXT_►</span>
            <span className="number">pg</span>
          </button>
        </div>

      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0 24px;

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  .btn-wrapper {
    position: relative;
    height: 38px;
    width: 90px;
  }

  .btn {
    --primary: #3B0764;
    --shadow-primary: #7C3AED;
    --color: #ffffff;
    --font-size: 9px;
    --shadow-secondary: #000000;
    --clip: polygon(
      11% 0, 95% 0, 100% 25%, 90% 90%,
      95% 90%, 85% 90%, 85% 100%,
      7% 100%, 0 80%
    );
    --border: 5px;
    --shimmy-distance: 5;
    --clip-one:   polygon(0 2%, 100% 2%, 100% 95%, 95% 95%, 95% 90%, 85% 90%, 85% 95%, 8% 95%, 0 70%);
    --clip-two:   polygon(0 78%, 100% 78%, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 8% 100%, 0 78%);
    --clip-three: polygon(0 44%, 100% 44%, 100% 54%, 95% 54%, 95% 54%, 85% 54%, 85% 54%, 8% 54%, 0 54%);
    --clip-four:  polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
    --clip-five:  polygon(0 0, 100% 0, 100% 0, 95% 0, 95% 0, 85% 0, 85% 0, 8% 0, 0 0);
    --clip-six:   polygon(0 40%, 100% 40%, 100% 85%, 95% 85%, 95% 85%, 85% 85%, 85% 85%, 8% 85%, 0 70%);
    --clip-seven: polygon(0 63%, 100% 63%, 100% 80%, 95% 80%, 95% 80%, 85% 80%, 85% 80%, 8% 80%, 0 70%);

    color: var(--color);
    text-transform: uppercase;
    font-size: var(--font-size);
    letter-spacing: 3px;
    position: relative;
    font-weight: 900;
    width: 100%;
    height: 100%;
    line-height: 38px;
    text-align: center;
    transition: background 0.2s, font-size 0.3s;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Orbitron', 'Segoe UI', sans-serif;
  }

  .btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn:hover:not(:disabled) {
    --primary: #EA580C;
    --shadow-primary: #F97316;
    --font-size: 11px;
  }

  .btn:after, .btn:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    clip-path: var(--clip);
    z-index: -1;
  }
  .btn:before {
    background: var(--shadow-primary);
    transform: translate(var(--border), 0);
  }
  .btn:after {
    background: var(--primary);
  }

  .btn__glitch {
    position: absolute;
    top: calc(var(--border) * -1);
    left: calc(var(--border) * -1);
    right: calc(var(--border) * -1);
    bottom: calc(var(--border) * -1);
    background: var(--shadow-primary);
    text-shadow: 2px 2px var(--shadow-primary), -2px -2px var(--shadow-secondary);
    clip-path: var(--clip);
    display: none;
  }

  .btn:hover:not(:disabled) .btn__glitch {
    display: block;
    animation: glitch 2s infinite;
  }

  .btn__glitch:before {
    content: "";
    position: absolute;
    top: calc(var(--border) * 1);
    right: calc(var(--border) * 1);
    bottom: calc(var(--border) * 1);
    left: calc(var(--border) * 1);
    clip-path: var(--clip);
    background: var(--primary);
    z-index: -1;
  }

  /* Center display - not a button */
  .center-display {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 18px;
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 6px;
    font-family: 'Orbitron', 'Segoe UI', sans-serif;
    letter-spacing: 2px;
    clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%);
  }

  .page-label {
    font-size: 8px;
    font-weight: 700;
    color: rgba(167, 139, 250, 0.5);
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .page-num {
    font-size: 20px;
    font-weight: 900;
    background: linear-gradient(135deg, #c084fc, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  .page-sep {
    font-size: 12px;
    color: rgba(167, 139, 250, 0.4);
  }
  .page-total {
    font-size: 14px;
    font-weight: 700;
    color: rgba(167, 139, 250, 0.6);
  }

  .number {
    background: var(--shadow-primary);
    color: #1a0040;
    font-size: 5.5px;
    font-weight: 700;
    letter-spacing: 1px;
    position: absolute;
    width: 15px;
    height: 6px;
    top: 0;
    left: 81%;
    line-height: 6.2px;
  }

  @keyframes glitch {
    0%               { clip-path: var(--clip-one); }
    2%, 8%           { clip-path: var(--clip-two);   transform: translate(calc(var(--shimmy-distance) * -1%), 0); }
    6%               { clip-path: var(--clip-two);   transform: translate(calc(var(--shimmy-distance) * 1%), 0); }
    9%               { clip-path: var(--clip-two);   transform: translate(0, 0); }
    10%              { clip-path: var(--clip-three); transform: translate(calc(var(--shimmy-distance) * 1%), 0); }
    13%              { clip-path: var(--clip-three); transform: translate(0, 0); }
    14%, 21%         { clip-path: var(--clip-four);  transform: translate(calc(var(--shimmy-distance) * 1%), 0); }
    25%              { clip-path: var(--clip-five);  transform: translate(calc(var(--shimmy-distance) * 1%), 0); }
    30%              { clip-path: var(--clip-five);  transform: translate(calc(var(--shimmy-distance) * -1%), 0); }
    35%, 45%         { clip-path: var(--clip-six);   transform: translate(calc(var(--shimmy-distance) * -1%)); }
    40%              { clip-path: var(--clip-six);   transform: translate(calc(var(--shimmy-distance) * 1%)); }
    50%              { clip-path: var(--clip-six);   transform: translate(0, 0); }
    55%              { clip-path: var(--clip-seven); transform: translate(calc(var(--shimmy-distance) * 1%), 0); }
    60%              { clip-path: var(--clip-seven); transform: translate(0, 0); }
    31%, 61%, 100%   { clip-path: var(--clip-four); }
  }
`;

export default Pagination;
