export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  description: string;
  poster: string;
  banner: string;
  category: 'new' | 'classic' | 'trending';
  duration: string;
  genre: string[];
  director: string;
}

export interface DownloadedMovie extends Movie {
  downloadedAt: string;
  fileSize: string;
  status: 'completed' | 'downloading';
  progress?: number;
}