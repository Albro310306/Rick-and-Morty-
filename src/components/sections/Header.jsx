import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" 
            alt="Rick and Morty" 
            className="h-10 object-contain drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
