import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CharacterDetail from './components/pages/CharacterDetail';
import Header from './components/sections/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen text-white font-sans" style={{ background: 'rgba(5, 2, 15, 0.15)' }}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
