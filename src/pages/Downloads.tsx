import React from 'react';
import { useDownloads } from '../hooks/useDownloads';
import { DownloadItem } from '../components/DownloadItem';
import { Download, Film, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Downloads = () => {
  const { downloads, removeDownload } = useDownloads();

  return (
    <div className="pt-24 px-4 md:px-12 pb-20 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black mb-2">My Downloads</h1>
          <p className="text-muted-foreground">Manage your offline movies and shows</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-muted px-4 py-2 rounded-full">
          <Download className="w-4 h-4 text-red-500" />
          {downloads.length} Items
        </div>
      </div>

      {downloads.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Film className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No downloads yet</h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Movies you download will appear here for you to watch anytime, even without an internet connection.
          </p>
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Browse Movies
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {downloads.map((movie) => (
              <DownloadItem 
                key={movie.id} 
                movie={movie} 
                onRemove={removeDownload} 
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-12 p-6 rounded-2xl bg-muted/20 border border-dashed border-border flex flex-col items-center text-center">
        <h3 className="font-bold mb-2">Storage Usage</h3>
        <div className="w-full max-w-md h-2 bg-muted rounded-full mb-2">
          <div className="h-full bg-red-600 rounded-full w-[15%]" />
        </div>
        <p className="text-xs text-muted-foreground">Using 4.2 GB of 64 GB available on your device</p>
      </div>
    </div>
  );
};