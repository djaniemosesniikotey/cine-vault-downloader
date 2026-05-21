import React from 'react';
import { Star, Download, Play } from 'lucide-react';
import { Movie } from '../types/movie';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onDownload: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onDownload }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-muted"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-white">{movie.rating}</span>
          <span className="text-xs text-gray-300 ml-auto">{movie.year}</span>
        </div>
        <h3 className="text-white font-bold truncate mb-3">{movie.title}</h3>
        
        <div className="flex items-center gap-2">
          <button 
            className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${movie.id}`);
            }}
          >
            <Play className="w-3 h-3 fill-current" />
            Watch
          </button>
          <button 
            className="p-2 bg-white/20 backdrop-blur-md text-white rounded-lg hover:bg-white/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(movie);
            }}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};