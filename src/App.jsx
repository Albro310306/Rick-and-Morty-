import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CharacterDetail from './components/pages/characterInformation/CharacterDetail';
import TeamsList from './features/teams/pages/TeamsList';
import TeamFormPage from './features/teams/pages/TeamFormPage';
import TeamDetail from './features/teams/pages/TeamDetail';

import Header from './components/sections/Header';
import FloatingNav from './components/sections/FloatingNav';
import { ToastProvider } from './components/ui/ToastContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen text-white font-sans relative pb-32" style={{ background: 'rgba(5, 2, 15, 0.15)' }}>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:id" element={<CharacterDetail />} />
                <Route path="/teams" element={<TeamsList />} />
                <Route path="/teams/new" element={<TeamFormPage />} />
                <Route path="/teams/:id" element={<TeamDetail />} />
                <Route path="/teams/:id/edit" element={<TeamFormPage />} />
              </Routes>
            </main>
            
            <FloatingNav />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
