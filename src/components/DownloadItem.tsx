import React from 'react';
import { Download, CheckCircle2, Trash2, Clock, FileVideo } from 'lucide-react';
import { DownloadedMovie } from '../types/movie';
import { motion } from 'framer-motion';

interface DownloadItemProps {
  movie: DownloadedMovie;
  onRemove: (id: string) => void;
}

export const DownloadItem = ({ movie, onRemove }: DownloadItemProps) => {
  const isDownloading = movie.status === 'downloading';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
    >
      <div className="relative w-full sm:w-32 aspect-[2/3] shrink-0">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover rounded-xl"
        />
        {isDownloading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
            <Download className="w-8 h-8 text-white animate-bounce" />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm text-muted-foreground">{movie.year} • {movie.fileSize}</p>
            </div>
            <button 
              onClick={() => onRemove(movie.id)}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {isDownloading ? (
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">Downloading...</span>
                  <span>{movie.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${movie.progress}%` }}
                    className="h-full bg-red-600"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-500 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(movie.downloadedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <FileVideo className="w-3 h-3" />
            MP4
          </span>
        </div>
      </div>
    </motion.div>
  );
};