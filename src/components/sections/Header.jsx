import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-inner">
        <Link to="/" className="logo-link">
          <img
            src="/logo.png"
            alt="Rick and Morty"
            className="logo-img"
          />
        </Link>

        <nav className="nav-links">
          <span className="nav-tag">🛸 Rick &amp; Morty API</span>
        </nav>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(6, 2, 18, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.25);
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.5);

  .header-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .logo-img {
    height: 60px;
    width: auto;
    object-fit: contain;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.8))
            drop-shadow(0 0 20px rgba(249, 115, 22, 0.4));
  }
  .logo-img:hover {
    transform: scale(1.06);
  }

  .nav-tag {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(167, 139, 250, 0.6);
    padding: 5px 14px;
    border-radius: 999px;
    border: 1px solid rgba(139, 92, 246, 0.2);
    background: rgba(139, 92, 246, 0.06);
  }
`;

export default Header;
