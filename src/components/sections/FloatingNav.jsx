import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Users, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Compass, label: 'Explorar' },
  { path: '/teams', icon: Users, label: 'Mis Equipos' },
  { path: '/teams/new', icon: PlusCircle, label: 'Crear Equipo' },
];

const FloatingNav = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-2 p-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/' || path === '/teams'}
            className={({ isActive }) => `
              relative flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300
              ${isActive ? 'text-white' : 'text-white/40 hover:text-white/80 hover:bg-white/5'}
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`} />
                <span className="relative z-10 hidden md:block">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </motion.nav>
    </div>
  );
};

export default FloatingNav;
