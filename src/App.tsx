import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Downloads } from './pages/Downloads';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Toaster } from 'sonner';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-red-600/30 pb-20 md:pb-0">
        <Toaster richColors position="top-center" theme="dark" />
        <Navbar onSearch={setSearchQuery} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>
        
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;