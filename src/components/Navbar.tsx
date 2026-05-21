import React, { useState } from 'react';
import { Search, Home, Download, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Navbar = ({ onSearch }: { onSearch: (q: string) => void }) => {
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-red-700 via-red-500 to-red-400 bg-clip-text text-transparent tracking-tighter">
          ONSTREAM
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={cn(
              "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary",
              location.pathname === '/' ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link 
            to="/downloads" 
            className={cn(
              "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary",
              location.pathname === '/downloads' ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Download className="w-4 h-4" />
            Downloads
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-md ml-4 md:ml-8">
        <div className={cn(
          "flex items-center bg-muted/50 rounded-full px-4 py-2 transition-all duration-300 w-full border",
          isSearchFocused ? "border-red-600/50 bg-muted/80" : "border-transparent"
        )}>
          <Search className={cn("w-4 h-4 shrink-0 transition-colors", isSearchFocused ? "text-red-600" : "text-muted-foreground")} />
          <input 
            type="text" 
            placeholder="Search for movies..." 
            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 ml-8">
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};