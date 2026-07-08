import React from 'react';
import styled from 'styled-components';

/**
 * Componente esqueleto para representar una tarjeta de personaje mientras se cargan los datos.
 * Mantiene la misma dimensión física que la tarjeta real para evitar saltos en la interfaz.
 */
const SkeletonCard = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="skeleton-card">
          <div className="img-skeleton" />
          <div className="text-skeleton title-skeleton" />
          <div className="text-skeleton subtitle-skeleton" />
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
  }

  .skeleton-card {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(45deg, rgba(13, 5, 32, 0.5), rgba(26, 10, 60, 0.5));
    border: 2px solid rgba(139, 92, 246, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }

  .skeleton-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(139,92,246,0.08) 0%, transparent 70%);
    animation: pulse 2s ease-in-out infinite;
  }

  .img-skeleton {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.15);
    animation: pulse 1.5s ease-in-out infinite;
  }

  .text-skeleton {
    height: 14px;
    border-radius: 4px;
    background: rgba(139, 92, 246, 0.15);
    animation: pulse 1.5s ease-in-out infinite 0.2s;
  }

  .title-skeleton {
    width: 140px;
    height: 20px;
  }

  .subtitle-skeleton {
    width: 90px;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

export default SkeletonCard;
