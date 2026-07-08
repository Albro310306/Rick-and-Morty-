import React from 'react';
import styled from 'styled-components';

/**
 * Tarjeta interactiva en 3D para mostrar un personaje.
 * Tiene animaciones estilo sci-fi que reaccionan al movimiento del cursor.
 * 
 * @param {object} props.character - Los datos del personaje (nombre, estado, especie, imagen, etc.).
 */
const CharacterCard = ({ character }) => {
  /**
   * Obtiene el color correspondiente al estado vital del personaje.
   * 
   * @param {string} status - El estado (alive, dead, unknown).
   * @returns {string} El código de color hexadecimal.
   */
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive': return '#4ade80';
      case 'dead':  return '#f87171';
      default:      return '#94a3b8';
    }
  };
  const statusColor = getStatusColor(character.status);

  return (
    <StyledWrapper>
      <div className="container noselect">
        <div className="canvas">
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} className={`tracker tr-${i + 1}`} />
          ))}
          <div id="card">
            <div className="card-content">
              <div className="card-glare" />
              <div className="cyber-lines">
                <span /><span /><span /><span />
              </div>

              {/* Character image */}
              <img className="char-img" src={character.image} alt={character.name} loading="lazy" />

              {/* Prompt visible when not hovered */}
              <p id="prompt">HOVER</p>

              {/* Info shown on hover */}
              <div className="title">{character.name}</div>

              <div className="glowing-elements">
                <div className="glow-1" />
                <div className="glow-2" />
                <div className="glow-3" />
              </div>

              <div className="subtitle">
                <span style={{ color: statusColor }}>● {character.status}</span>
                <span className="highlight">{character.species}</span>
              </div>

              <div className="location-info">
                <span className="loc-label">📍</span>
                <span className="loc-name">{character.location?.name}</span>
              </div>

              <div className="card-particles">
                <span /><span /><span /><span /><span /><span />
              </div>
              <div className="corner-elements">
                <span /><span /><span /><span />
              </div>
              <div className="scan-line" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .container {
    position: relative;
    width: 220px;
    height: 300px;
    transition: 200ms;
  }

  .container:active {
    width: 210px;
    height: 290px;
  }

  #card {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    transition: 700ms;
    background: linear-gradient(45deg, #0d0520, #1a0a3c);
    border: 2px solid rgba(139, 92, 246, 0.2);
    overflow: hidden;
    box-shadow:
      0 0 20px rgba(0, 0, 0, 0.5),
      inset 0 0 20px rgba(0, 0, 0, 0.3);
  }

  .card-content {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Character image */
  .char-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.45;
    transition: 500ms ease-in-out;
    z-index: 1;
  }
  .tracker:hover ~ #card .char-img {
    opacity: 0.15;
    transform: scale(1.05);
  }

  /* Dark overlay gradient at bottom */
  #card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60%;
    background: linear-gradient(to top, rgba(8, 2, 28, 0.95), transparent);
    z-index: 2;
    pointer-events: none;
  }

  #prompt {
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 4px;
    transition: 300ms ease-in-out;
    position: absolute;
    text-align: center;
    color: rgba(167, 139, 250, 0.7);
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  }

  .title {
    opacity: 0;
    transition: 300ms ease-in-out;
    position: absolute;
    z-index: 20;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 1px;
    text-align: center;
    width: 100%;
    padding: 16px 12px 0;
    line-height: 1.2;
    background: linear-gradient(45deg, #c084fc, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.5));
  }

  .subtitle {
    position: absolute;
    bottom: 52px;
    width: 100%;
    text-align: center;
    font-size: 11px;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(10px);
    transition: 300ms ease-in-out 50ms;
    z-index: 20;
    display: flex;
    justify-content: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.6);
  }

  .location-info {
    position: absolute;
    bottom: 22px;
    width: 100%;
    text-align: center;
    font-size: 10px;
    opacity: 0;
    transform: translateY(10px);
    transition: 300ms ease-in-out 100ms;
    z-index: 20;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .loc-label { font-size: 11px; }
  .loc-name {
    color: rgba(249, 115, 22, 0.85);
    font-weight: 600;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 160px;
  }

  .highlight {
    background: linear-gradient(90deg, #8B5CF6, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }

  /* Hover: show content */
  .tracker:hover ~ #card .title        { opacity: 1; transform: translateY(-4px); }
  .tracker:hover ~ #card .subtitle     { opacity: 1; transform: translateY(0); }
  .tracker:hover ~ #card .location-info { opacity: 1; transform: translateY(0); }
  .tracker:hover ~ #card #prompt       { opacity: 0; }
  .tracker:hover ~ #card               { transition: 300ms; filter: brightness(1.15); }

  /* Glowing elements */
  .glowing-elements { position: absolute; inset: 0; pointer-events: none; z-index: 3; }

  .glow-1, .glow-2, .glow-3 {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    filter: blur(15px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .glow-1 {
    top: -20px; left: -20px;
    background: radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%);
  }
  .glow-2 {
    top: 50%; right: -30px; transform: translateY(-50%);
    background: radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 70%);
  }
  .glow-3 {
    bottom: -20px; left: 30%;
    background: radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%);
  }
  .tracker:hover ~ #card .glowing-elements div { opacity: 1; }

  /* Particles */
  .card-particles span {
    position: absolute;
    width: 3px; height: 3px;
    background: #c084fc;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  }
  .tracker:hover ~ #card .card-particles span { animation: particleFloat 2s infinite; }

  @keyframes particleFloat {
    0%   { transform: translate(0,0); opacity: 0; }
    50%  { opacity: 1; }
    100% { transform: translate(calc(var(--x,0)*30px),calc(var(--y,0)*30px)); opacity: 0; }
  }
  .card-particles span:nth-child(1) { --x:1;  --y:-1; top:40%; left:20%; }
  .card-particles span:nth-child(2) { --x:-1; --y:-1; top:60%; right:20%; }
  .card-particles span:nth-child(3) { --x:.5; --y:1;  top:20%; left:40%; }
  .card-particles span:nth-child(4) { --x:-.5;--y:1;  top:80%; right:40%; }
  .card-particles span:nth-child(5) { --x:1;  --y:.5; top:30%; left:60%; }
  .card-particles span:nth-child(6) { --x:-1; --y:.5; top:70%; right:60%; }

  /* Card glow bg */
  #card::before {
    content: "";
    background: radial-gradient(circle at center, rgba(139,92,246,0.12) 0%, rgba(249,115,22,0.06) 50%, transparent 100%);
    filter: blur(20px);
    opacity: 0;
    width: 150%; height: 150%;
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%,-50%);
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  .tracker:hover ~ #card::before { opacity: 1; }
  .container:hover #card::before  { opacity: 0.8; }

  /* Trackers */
  .tracker {
    position: absolute;
    z-index: 200;
    width: 100%; height: 100%;
    cursor: pointer;
  }

  /* Canvas grid */
  .canvas {
    perspective: 800px;
    inset: 0;
    z-index: 200;
    position: absolute;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-template-areas:
      "tr-1  tr-2  tr-3  tr-4  tr-5"
      "tr-6  tr-7  tr-8  tr-9  tr-10"
      "tr-11 tr-12 tr-13 tr-14 tr-15"
      "tr-16 tr-17 tr-18 tr-19 tr-20"
      "tr-21 tr-22 tr-23 tr-24 tr-25";
  }
  .tr-1  { grid-area: tr-1; }  .tr-2  { grid-area: tr-2; }  .tr-3  { grid-area: tr-3; }
  .tr-4  { grid-area: tr-4; }  .tr-5  { grid-area: tr-5; }  .tr-6  { grid-area: tr-6; }
  .tr-7  { grid-area: tr-7; }  .tr-8  { grid-area: tr-8; }  .tr-9  { grid-area: tr-9; }
  .tr-10 { grid-area: tr-10; } .tr-11 { grid-area: tr-11; } .tr-12 { grid-area: tr-12; }
  .tr-13 { grid-area: tr-13; } .tr-14 { grid-area: tr-14; } .tr-15 { grid-area: tr-15; }
  .tr-16 { grid-area: tr-16; } .tr-17 { grid-area: tr-17; } .tr-18 { grid-area: tr-18; }
  .tr-19 { grid-area: tr-19; } .tr-20 { grid-area: tr-20; } .tr-21 { grid-area: tr-21; }
  .tr-22 { grid-area: tr-22; } .tr-23 { grid-area: tr-23; } .tr-24 { grid-area: tr-24; }
  .tr-25 { grid-area: tr-25; }

  /* 3D rotations */
  .tr-1:hover~#card  { transform: rotateX(20deg) rotateY(-10deg); }
  .tr-2:hover~#card  { transform: rotateX(20deg) rotateY(-5deg); }
  .tr-3:hover~#card  { transform: rotateX(20deg) rotateY(0deg); }
  .tr-4:hover~#card  { transform: rotateX(20deg) rotateY(5deg); }
  .tr-5:hover~#card  { transform: rotateX(20deg) rotateY(10deg); }
  .tr-6:hover~#card  { transform: rotateX(10deg) rotateY(-10deg); }
  .tr-7:hover~#card  { transform: rotateX(10deg) rotateY(-5deg); }
  .tr-8:hover~#card  { transform: rotateX(10deg) rotateY(0deg); }
  .tr-9:hover~#card  { transform: rotateX(10deg) rotateY(5deg); }
  .tr-10:hover~#card { transform: rotateX(10deg) rotateY(10deg); }
  .tr-11:hover~#card { transform: rotateX(0deg) rotateY(-10deg); }
  .tr-12:hover~#card { transform: rotateX(0deg) rotateY(-5deg); }
  .tr-13:hover~#card { transform: rotateX(0deg) rotateY(0deg); }
  .tr-14:hover~#card { transform: rotateX(0deg) rotateY(5deg); }
  .tr-15:hover~#card { transform: rotateX(0deg) rotateY(10deg); }
  .tr-16:hover~#card { transform: rotateX(-10deg) rotateY(-10deg); }
  .tr-17:hover~#card { transform: rotateX(-10deg) rotateY(-5deg); }
  .tr-18:hover~#card { transform: rotateX(-10deg) rotateY(0deg); }
  .tr-19:hover~#card { transform: rotateX(-10deg) rotateY(5deg); }
  .tr-20:hover~#card { transform: rotateX(-10deg) rotateY(10deg); }
  .tr-21:hover~#card { transform: rotateX(-20deg) rotateY(-10deg); }
  .tr-22:hover~#card { transform: rotateX(-20deg) rotateY(-5deg); }
  .tr-23:hover~#card { transform: rotateX(-20deg) rotateY(0deg); }
  .tr-24:hover~#card { transform: rotateX(-20deg) rotateY(5deg); }
  .tr-25:hover~#card { transform: rotateX(-20deg) rotateY(10deg); }

  .noselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Glare */
  .card-glare {
    position: absolute; inset: 0; z-index: 4;
    background: linear-gradient(125deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.04) 45%,
      rgba(255,255,255,0.08) 50%,
      rgba(255,255,255,0.04) 55%,
      rgba(255,255,255,0) 100%);
    opacity: 0; transition: opacity 300ms;
    pointer-events: none;
  }
  #card:hover .card-glare { opacity: 1; }

  /* Cyber lines */
  .cyber-lines { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
  .cyber-lines span {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent);
    width: 100%; height: 1px;
    transform: scaleX(0);
  }
  .cyber-lines span:nth-child(1) { top:20%; transform-origin:left;  animation: lineGrow 3s linear infinite; }
  .cyber-lines span:nth-child(2) { top:40%; transform-origin:right; animation: lineGrow 3s linear infinite 1s; }
  .cyber-lines span:nth-child(3) { top:65%; transform-origin:left;  animation: lineGrow 3s linear infinite 2s; }
  .cyber-lines span:nth-child(4) { top:85%; transform-origin:right; animation: lineGrow 3s linear infinite 1.5s; }

  /* Corner elements */
  .corner-elements { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
  .corner-elements span {
    position: absolute; width: 14px; height: 14px;
    border: 2px solid rgba(139,92,246,0.3);
    transition: all 0.3s ease;
  }
  .corner-elements span:nth-child(1) { top:10px;    left:10px;  border-right:0; border-bottom:0; }
  .corner-elements span:nth-child(2) { top:10px;    right:10px; border-left:0;  border-bottom:0; }
  .corner-elements span:nth-child(3) { bottom:10px; left:10px;  border-right:0; border-top:0; }
  .corner-elements span:nth-child(4) { bottom:10px; right:10px; border-left:0;  border-top:0; }
  #card:hover .corner-elements span {
    border-color: rgba(249,115,22,0.7);
    box-shadow: 0 0 8px rgba(249,115,22,0.4);
  }

  /* Scan line */
  .scan-line {
    position: absolute; inset: 0; z-index: 6; pointer-events: none;
    background: linear-gradient(to bottom, transparent, rgba(139,92,246,0.08), transparent);
    transform: translateY(-100%);
    animation: scanMove 2.5s linear infinite;
  }

  @keyframes lineGrow {
    0%   { transform: scaleX(0); opacity: 0; }
    50%  { transform: scaleX(1); opacity: 1; }
    100% { transform: scaleX(0); opacity: 0; }
  }
  @keyframes scanMove {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(200%); }
  }
`;

export default CharacterCard;
