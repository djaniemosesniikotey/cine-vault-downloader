import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onDownload: (movie: Movie) => void;
}

export const MovieGrid = ({ title, movies, onMovieClick, onDownload }: MovieGridProps) => {
  if (movies.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        <button className="text-sm text-red-500 font-semibold hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={onMovieClick} 
            onDownload={onDownload}
          />
        ))}
      </div>
    </div>
  );
};