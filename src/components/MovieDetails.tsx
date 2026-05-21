import React from 'react';
import { X, Star, Clock, Download, Play, Share2 } from 'lucide-react';
import { Movie } from '../types/movie';
import { motion, AnimatePresence } from 'framer-motion';

interface MovieDetailsProps {
  movie: Movie | null;
  onClose: () => void;
  onDownload: (movie: Movie) => void;
}

export const MovieDetails = ({ movie, onClose, onDownload }: MovieDetailsProps) => {
  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-2xl overflow-y-auto shadow-2xl border border-border/50"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative aspect-video md:aspect-[21/9] w-full">
            <img 
              src={movie.banner} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end gap-6">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="hidden md:block w-40 aspect-[2/3] rounded-lg shadow-xl border-2 border-white/10"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold text-white rounded uppercase tracking-wider">
                    HD 4K
                  </span>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {movie.rating}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {movie.duration}
                  </div>
                  <span className="text-sm text-muted-foreground">{movie.year}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-4">{movie.title}</h2>
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Now
                  </button>
                  <button 
                    onClick={() => onDownload(movie)}
                    className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold hover:bg-accent transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button className="p-3 bg-muted text-foreground rounded-full hover:bg-accent transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 grid md:grid-cols-[1fr,300px] gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {movie.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Director</h4>
                  <p>{movie.director}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-1">Genre</h4>
                  <p>{movie.genre.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <h4 className="font-bold mb-2">Streaming Quality</h4>
                <div className="flex gap-2">
                  {['720p', '1080p', '4K'].map(q => (
                    <span key={q} className="text-xs px-2 py-1 bg-background rounded border border-border">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                <h4 className="font-bold mb-2">Available Subtitles</h4>
                <p className="text-sm text-muted-foreground">English, Spanish, French, Arabic + 12 more</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};