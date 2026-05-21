import React, { useMemo } from 'react';
import { MOVIES } from '../data/movies';
import { MovieGrid } from '../components/MovieGrid';
import { Play, Info } from 'lucide-react';
import { useDownloads } from '../hooks/useDownloads';
import { useNavigate } from 'react-router-dom';

export const Home = ({ searchQuery }: { searchQuery: string }) => {
  const navigate = useNavigate();
  const { downloadMovie } = useDownloads();

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return MOVIES;
    return MOVIES.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const trending = filteredMovies.filter(m => m.category === 'trending');
  const newReleases = filteredMovies.filter(m => m.category === 'new');
  const classics = filteredMovies.filter(m => m.category === 'classic');

  const featured = MOVIES[0];

  return (
    <div className="pb-10">
      {!searchQuery && (
        <div className="relative h-[60vh] md:h-[70vh] w-full mb-8 md:mb-12">
          <img 
            src={featured.banner} 
            alt={featured.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          
          <div className="absolute bottom-10 md:bottom-20 left-4 md:left-12 max-w-2xl px-2">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW RELEASE</span>
              <span className="text-xs md:text-sm font-medium">Streaming Now</span>
            </div>
            <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-tight">
              {featured.title}
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 line-clamp-2 md:line-clamp-3">
              {featured.description}
            </p>
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => navigate(`/movie/${featured.id}`)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:opacity-90 transition-all shadow-lg"
              >
                <Play className="w-4 h-4 md:w-6 md:h-6 fill-current" />
                Play Now
              </button>
              <button 
                onClick={() => navigate(`/movie/${featured.id}`)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-white/20 transition-all"
              >
                <Info className="w-4 h-4 md:w-6 md:h-6" />
                Details
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-12 space-y-10 md:space-y-12">
        {searchQuery ? (
          <MovieGrid 
            title={`Results for "${searchQuery}"`} 
            movies={filteredMovies} 
            onMovieClick={(m) => navigate(`/movie/${m.id}`)}
            onDownload={downloadMovie}
          />
        ) : (
          <>
            <MovieGrid 
              title="Trending Now" 
              movies={trending} 
              onMovieClick={(m) => navigate(`/movie/${m.id}`)}
              onDownload={downloadMovie}
            />
            <MovieGrid 
              title="New Releases" 
              movies={newReleases} 
              onMovieClick={(m) => navigate(`/movie/${m.id}`)}
              onDownload={downloadMovie}
            />
            <MovieGrid 
              title="Classics" 
              movies={classics} 
              onMovieClick={(m) => navigate(`/movie/${m.id}`)}
              onDownload={downloadMovie}
            />
          </>
        )}
      </div>
    </div>
  );
};