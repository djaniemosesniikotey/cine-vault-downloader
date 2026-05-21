import { useState, useEffect } from 'react';
import { DownloadedMovie, Movie } from '../types/movie';
import { toast } from 'sonner';

export const useDownloads = () => {
  const [downloads, setDownloads] = useState<DownloadedMovie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('movie_downloads');
    if (saved) {
      setDownloads(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (newDownloads: DownloadedMovie[]) => {
    localStorage.setItem('movie_downloads', JSON.stringify(newDownloads));
    setDownloads(newDownloads);
  };

  const downloadMovie = (movie: Movie) => {
    if (downloads.find(d => d.id === movie.id)) {
      toast.info('Movie already downloaded');
      return;
    }

    const newDownload: DownloadedMovie = {
      ...movie,
      downloadedAt: new Date().toISOString(),
      fileSize: `${(Math.random() * 2 + 1).toFixed(1)} GB`,
      status: 'downloading',
      progress: 0
    };

    const updatedDownloads = [newDownload, ...downloads];
    saveToStorage(updatedDownloads);
    toast.success(`Starting download: ${movie.title}`);

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        const currentDownloads = JSON.parse(localStorage.getItem('movie_downloads') || '[]');
        const updated = currentDownloads.map((d: DownloadedMovie) => 
          d.id === movie.id ? { ...d, status: 'completed', progress: 100 } : d
        );
        saveToStorage(updated);
        toast.success(`${movie.title} download complete!`);
      } else {
        const currentDownloads = JSON.parse(localStorage.getItem('movie_downloads') || '[]');
        const updated = currentDownloads.map((d: DownloadedMovie) => 
          d.id === movie.id ? { ...d, progress } : d
        );
        saveToStorage(updated);
      }
    }, 1000);
  };

  const removeDownload = (movieId: string) => {
    const updated = downloads.filter(d => d.id !== movieId);
    saveToStorage(updated);
    toast.error('Movie removed from downloads');
  };

  return { downloads, downloadMovie, removeDownload };
};