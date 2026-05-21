import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOVIES } from '../data/movies';
import { Star, Clock, Download, Play, Share2, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDownloads } from '../hooks/useDownloads';

export const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { downloadMovie } = useDownloads();
  
  const movie = MOVIES.find(m => m.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="pt-32 px-8 text-center">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-primary font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="relative aspect-video md:aspect-[21/9] w-full">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-12 z-10 p-2 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <img 
          src={movie.banner} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        
        <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 flex flex-col md:flex-row md:items-end gap-6">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="hidden md:block w-48 aspect-[2/3] rounded-xl shadow-2xl border-2 border-white/10"
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
            <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tight">{movie.title}</h1>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg">
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </button>
              <button 
                onClick={() => downloadMovie(movie)}
                className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3.5 rounded-full font-bold hover:bg-accent transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="p-3.5 bg-muted text-foreground rounded-full hover:bg-accent transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-10 grid md:grid-cols-[1fr,350px] gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold mb-4 border-l-4 border-red-600 pl-3">Storyline</h3>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
            {movie.description}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Director</h4>
              <p className="font-medium">{movie.director}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Genre</h4>
              <div className="flex flex-wrap gap-1">
                {movie.genre.map(g => (
                  <span key={g} className="text-sm">{g}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Release</h4>
              <p className="font-medium">{movie.year}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-red-600 rounded-full"></span>
              Information
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-bold text-red-500">Ultra HD 4K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Audio</span>
                <span className="font-medium">Dolby Atmos 5.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium uppercase">~2.4 GB</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['720p', '1080p', '4K'].map(q => (
                <span key={q} className="text-[10px] font-bold px-2 py-1 bg-background rounded-md border border-border uppercase">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};