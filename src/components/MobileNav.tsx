import React from 'react';
import { Home, Download, Search, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export const MobileNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Search', icon: Search, path: '/' },
    { label: 'Downloads', icon: Download, path: '/downloads' },
    { label: 'Profile', icon: User, path: '/downloads' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-background/90 backdrop-blur-xl border-t border-border/50 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className="flex flex-col items-center gap-1 group"
        >
          <item.icon 
            className={cn(
              "w-5 h-5 transition-all",
              location.pathname === item.path 
                ? "text-primary scale-110" 
                : "text-muted-foreground group-hover:text-primary"
            )} 
          />
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider transition-all",
            location.pathname === item.path 
              ? "text-primary" 
              : "text-muted-foreground group-hover:text-primary"
          )}>
            {item.label}
          </span>
          {location.pathname === item.path && (
            <div className="w-1 h-1 bg-red-600 rounded-full mt-0.5" />
          )}
        </Link>
      ))}
    </nav>
  );
};