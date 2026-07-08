import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../api/rickAndMorty';
import ObservationForm from '../ui/ObservationForm';
import styled, { keyframes } from 'styled-components';

/**
 * Componente que muestra un punto de color según el estado vital del personaje.
 *
 * @param {string} props.status - Estado del personaje (alive, dead, unknown).
 */
const StatusBadge = ({ status }) => {
  const config =
    status?.toLowerCase() === 'alive'
      ? { color: '#4ade80', label: 'Vivo' }
      : status?.toLowerCase() === 'dead'
      ? { color: '#f87171', label: 'Muerto' }
      : { color: '#94a3b8', label: 'Desconocido' };

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: config.color }}>
      <span style={{
        width: 10, height: 10, borderRadius: '50%',
        background: config.color,
        boxShadow: `0 0 10px ${config.color}`,
        display: 'inline-block',
      }} />
      {config.label}
    </span>
  );
};

/**
 * Tarjeta de información individual para mostrar un dato del personaje.
 *
 * @param {string} props.icon - Emoji o carácter de icono.
 * @param {string} props.label - Etiqueta del campo.
 * @param {string} props.value - Valor a mostrar.
 */
const InfoCard = ({ icon, label, value }) => (
  <InfoCardWrapper>
    <span className="icon">{icon}</span>
    <div className="content">
      <span className="label">{label}</span>
      <span className="value">{value || '—'}</span>
    </div>
  </InfoCardWrapper>
);

/**
 * Esqueleto de carga para la vista de detalle mientras se traen los datos de la API.
 */
const DetailSkeleton = () => (
  <SkeletonWrapper>
    <div className="back-link skeleton-line" style={{ width: 80, height: 18 }} />
    <div className="hero-skeleton">
      <div className="img-skeleton" />
      <div className="info-skeleton">
        <div className="skeleton-line" style={{ width: '70%', height: 36 }} />
        <div className="skeleton-line" style={{ width: '30%', height: 18 }} />
        <div className="grid-skeleton">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    </div>
  </SkeletonWrapper>
);

/**
 * Página de detalle de un personaje de Rick and Morty.
 * Obtiene los datos por ID desde la API, los muestra con diseño premium
 * e integra un formulario de observación validado con Zod.
 */
const CharacterDetail = () => {
  const { id } = useParams();

  const { data: character, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });

  if (isLoading) return (
    <PageWrapper>
      <DetailSkeleton />
    </PageWrapper>
  );

  if (isError) {
    return (
      <PageWrapper>
        <ErrorContainer>
          <span className="emoji">😢</span>
          <h2>Portal roto</h2>
          <p>{error.message}</p>
          <Link to="/" className="back-btn">← Volver al explorador</Link>
        </ErrorContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        {/* ── Back link ── */}
        <Link to="/" className="back-link">
          ← Volver al explorador
        </Link>

        {/* ── Hero: imagen + info principal ── */}
        <HeroSection>
          <div className="img-wrapper">
            <img src={character.image} alt={character.name} className="char-img" />
            <div className="img-glow" />
          </div>

          <div className="info-panel">
            <div className="name-row">
              <h1 className="char-name">{character.name}</h1>
              <StatusBadge status={character.status} />
            </div>

            <div className="info-grid">
              <InfoCard icon="🧬" label="Especie" value={character.species} />
              <InfoCard icon="⚧" label="Género" value={character.gender} />
              <InfoCard icon="🌍" label="Origen" value={character.origin?.name} />
              <InfoCard icon="📍" label="Última ubicación" value={character.location?.name} />
            </div>

            <div className="episodes-block">
              <span className="ep-label">📺 Apariciones en episodios</span>
              <span className="ep-count">{character.episode?.length}</span>
            </div>
          </div>
        </HeroSection>

        {/* ── Formulario de Observación ── */}
        <ObservationForm characterName={character.name} characterId={character.id} />
      </ContentWrapper>
    </PageWrapper>
  );
};

/* ── Animations ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;
const shimmer = keyframes`
  0%   { background-position: -400% center; }
  100% { background-position:  400% center; }
`;

/* ── Styled Components ─── */
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 24px 80px;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: ${fadeUp} 0.5s ease both;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(167, 139, 250, 0.7);
    text-decoration: none;
    transition: color 0.2s;
    width: fit-content;

    &:hover { color: #fb923c; }
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: rgba(10, 5, 30, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 24px;
  padding: 32px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.08), inset 0 0 40px rgba(0,0,0,0.2);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-start;
  }

  .img-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 100%;
    max-width: 260px;
    align-self: center;
  }

  .char-img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 18px;
    object-fit: cover;
    display: block;
    position: relative;
    z-index: 1;
    border: 2px solid rgba(139, 92, 246, 0.3);
  }

  .img-glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%);
    z-index: 0;
    filter: blur(20px);
  }

  .info-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .name-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .char-name {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 900;
    line-height: 1.1;
    background: linear-gradient(135deg, #e879f9, #8B5CF6, #f97316);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
    margin: 0;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .episodes-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: rgba(139, 92, 246, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
  }

  .ep-label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(167, 139, 250, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .ep-count {
    font-size: 32px;
    font-weight: 900;
    background: linear-gradient(135deg, #c084fc, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const InfoCardWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 14px;
  background: rgba(5, 2, 15, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 12px;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    background: rgba(139, 92, 246, 0.06);
  }

  .icon { font-size: 20px; margin-top: 1px; }

  .content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(167, 139, 250, 0.5);
  }

  .value {
    font-size: 14px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SkeletonWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 28px;

  .skeleton-line {
    background: rgba(139, 92, 246, 0.12);
    border-radius: 8px;
    animation: ${pulse} 1.6s ease-in-out infinite;
  }

  .hero-skeleton {
    display: flex;
    gap: 32px;
    background: rgba(10, 5, 30, 0.6);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 24px;
    padding: 32px;
  }

  .img-skeleton {
    width: 260px;
    height: 260px;
    border-radius: 18px;
    flex-shrink: 0;
    background: rgba(139, 92, 246, 0.12);
    animation: ${pulse} 1.6s ease-in-out infinite;
  }

  .info-skeleton {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .grid-skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 8px;
  }

  .skeleton-card {
    height: 72px;
    background: rgba(139, 92, 246, 0.08);
    border-radius: 12px;
    animation: ${pulse} 1.6s ease-in-out infinite;
  }
`;

const ErrorContainer = styled.div`
  max-width: 480px;
  margin: 80px auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .emoji { font-size: 64px; }
  h2 { font-size: 28px; font-weight: 800; color: #f87171; margin: 0; }
  p  { color: rgba(167,139,250,0.6); font-size: 15px; margin: 0; }

  .back-btn {
    margin-top: 8px;
    padding: 10px 24px;
    border-radius: 999px;
    background: linear-gradient(135deg, #7C3AED, #EA580C);
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 14px;
    transition: opacity 0.2s, transform 0.2s;

    &:hover { opacity: 0.85; transform: translateY(-2px); }
  }
`;

export default CharacterDetail;
