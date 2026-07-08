import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled, { keyframes } from 'styled-components';
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
 * Muestra el listado de personajes con paginación, filtros y buscador.
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
    const timer = setTimeout(() => {
      const params = {};
      if (searchValue) params.name = searchValue;
      if (statusFilter) params.status = statusFilter;
      // Reset page when search changes
      setSearchParams(params);
    }, 300);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, statusFilter]);

  /**
   * Maneja el cambio de filtro de estado (Vivo, Muerto, Desconocido).
   * Actualiza la URL y reinicia a la primera página.
   * 
   * @param {string} status - El nuevo estado a filtrar.
   */
  const handleStatusChange = (status) => {
    const params = {};
    if (searchValue) params.name = searchValue;
    if (status) params.status = status;
    // Reset to page 1 when filter changes
    setSearchParams(params);
  };

  /**
   * Navega a una página específica de resultados.
   * Mantiene los filtros actuales y hace scroll hacia arriba.
   * 
   * @param {number} page - El número de página a navegar.
   */
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
    <PageWrapper>
      {/* ── HERO ─────────────────────────────── */}
      <HeroSection>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line1">MULTIVERSO</span>
            <span className="line2">EXPLORER</span>
          </h1>

          <p className="hero-sub">
            Más de <strong>826 personajes</strong> de todas las dimensiones.<br />
            Encuentra a tus favoritos del universo de <em>Rick and Morty</em>.
          </p>

          {/* Search centered in hero */}
          <div className="search-container">
            <SearchInput
              register={register}
              currentStatus={statusFilter}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Active filters */}
          {hasActiveFilter && (
            <div className="active-filters">
              {nameFilter && (
                <span className="filter-tag">
                  🔍 "{nameFilter}"
                  <button onClick={() => {
                    const p = {};
                    if (statusFilter) p.status = statusFilter;
                    setSearchParams(p);
                  }}>✕</button>
                </span>
              )}
              {statusFilter && (
                <span className="filter-tag status">
                  {statusFilter === 'alive' ? '🟢' : statusFilter === 'dead' ? '🔴' : '⚪'} {STATUS_LABELS[statusFilter]}
                  <button onClick={() => {
                    const p = {};
                    if (nameFilter) p.name = nameFilter;
                    setSearchParams(p);
                  }}>✕</button>
                </span>
              )}
            </div>
          )}
        </div>
      </HeroSection>

      {/* ── RESULTS ──────────────────────────── */}
      <ResultsSection>
        {isError && (
          <ErrorBox>
            <span>⚠️</span>
            <div>
              <p className="err-title">Error al cargar datos</p>
              <p className="err-msg">{error.message}</p>
            </div>
          </ErrorBox>
        )}

        {/* Results count */}
        {!isActuallyLoading && !isError && data?.info && (
          <div className="results-meta">
            <span className="count">{data.info.count} personajes encontrados</span>
            {data.info.pages > 1 && (
              <span className="pages">· Página {pageFilter} de {data.info.pages}</span>
            )}
          </div>
        )}

        {isActuallyLoading ? (
          <div className="cards-grid">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <>
            {data?.results?.length > 0 ? (
              <>
                <div className="cards-grid">
                  {data.results.map(c => <CharacterCard key={c.id} character={c} />)}
                </div>
                <Pagination
                  currentPage={pageFilter}
                  totalPages={data.info?.pages || 1}
                  onPrev={() => goToPage(pageFilter - 1)}
                  onNext={() => goToPage(pageFilter + 1)}
                />
              </>
            ) : (
              !isError && (
                <EmptyState>
                  <div className="portal" />
                  <p className="emoji">🌌</p>
                  <h3>Ningún personaje encontrado</h3>
                  <p>Prueba con otra búsqueda o cambia el filtro de estado</p>
                  <button onClick={() => setSearchParams({})}>Limpiar filtros</button>
                </EmptyState>
              )
            )}
          </>
        )}
      </ResultsSection>
    </PageWrapper>
  );
};

/* ── Animations ─────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -400% center; }
  100% { background-position: 400% center; }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(139,92,246,0.4); }
  50%       { opacity: 0.8; box-shadow: 0 0 40px rgba(249,115,22,0.5); }
`;
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── Styled Components ──────────────────── */
const PageWrapper = styled.div`
  min-height: 100vh;
  color: white;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 60px 24px 80px;
  text-align: center;
  overflow: hidden;

  /* Subtle radial glow behind hero content */
  &::before {
    content: '';
    position: absolute;
    top: -100px; left: 50%;
    transform: translateX(-50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: ${fadeUp} 0.7s ease both;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #c084fc;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.3);
    animation: ${pulse} 3s ease-in-out infinite;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    line-height: 1;
    margin: 0;
    user-select: none;
  }

  .line1 {
    font-size: clamp(56px, 10vw, 100px);
    font-weight: 900;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #e879f9, #8B5CF6, #06b6d4, #8B5CF6, #e879f9);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 5s linear infinite;
    filter: drop-shadow(0 0 30px rgba(139,92,246,0.5));
    animation: ${float} 4s ease-in-out infinite, ${shimmer} 5s linear infinite;
  }

  .line2 {
    font-size: clamp(42px, 7vw, 72px);
    font-weight: 900;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    background: linear-gradient(90deg, #F97316, #fbbf24, #F97316);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
    filter: drop-shadow(0 0 20px rgba(249,115,22,0.6));
  }

  .hero-sub {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(200, 185, 230, 0.8);
    max-width: 480px;
    margin: 0;

    strong { color: #c084fc; }
    em { color: #fb923c; font-style: normal; }
  }

  .search-container {
    width: 100%;
    max-width: 520px;
    margin-top: 8px;
  }

  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .filter-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid rgba(139, 92, 246, 0.35);
    color: #c084fc;

    &.status {
      background: rgba(249, 115, 22, 0.12);
      border-color: rgba(249, 115, 22, 0.35);
      color: #fb923c;
    }

    button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-size: 11px;
      opacity: 0.6;
      padding: 0 2px;
      line-height: 1;
      &:hover { opacity: 1; }
    }
  }
`;

const ResultsSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 80px;

  .results-meta {
    margin-bottom: 24px;
    font-size: 14px;
    color: rgba(167, 139, 250, 0.7);
    display: flex;
    align-items: center;
    gap: 8px;

    .count { font-weight: 600; color: #a78bfa; }
    .pages { opacity: 0.6; }
  }

  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 14px;
  margin-bottom: 24px;
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.3);
  color: #fca5a5;
  font-size: 14px;

  span { font-size: 22px; }
  .err-title { font-weight: 700; margin-bottom: 2px; }
  .err-msg { opacity: 0.7; }
`;

const EmptyState = styled.div`
  position: relative;
  text-align: center;
  padding: 80px 20px;

  .portal {
    position: absolute;
    top: 40px; left: 50%;
    transform: translateX(-50%);
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%);
    animation: ${pulse} 3s ease-in-out infinite;
  }

  .emoji { font-size: 56px; margin-bottom: 16px; position: relative; }
  h3 { font-size: 22px; font-weight: 700; color: #a78bfa; margin-bottom: 8px; }
  p { color: rgba(167,139,250,0.5); font-size: 15px; margin-bottom: 20px; }

  button {
    padding: 10px 24px;
    border-radius: 999px;
    background: linear-gradient(135deg, #7C3AED, #EA580C);
    border: none;
    color: white;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    &:hover { opacity: 0.85; transform: scale(1.04); }
  }
`;

export default Home;
