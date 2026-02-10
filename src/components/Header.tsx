// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "next-themes"; 

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 

  // 1. Destructure all theme values, focusing on 'resolvedTheme' for logic
  const { theme, setTheme, resolvedTheme } = useTheme();

  // 2. Client-side mounting check for hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    // Use resolvedTheme to get the current effective theme (light or dark)
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Prevent rendering the theme switcher on the server to avoid hydration mismatch
  if (!mounted) {
    return (
      // Placeholder structure must match the final structure for seamless transition
      <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 shadow-md transition-colors duration-300">
          <div className="max-w-[1400px] mx-auto px-5 h-20 flex justify-between items-center">
            {/* Logo needs responsive text color */}
            <div className="font-display text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
              APEX<span className="text-primary-red">RACING</span>
            </div>
            <nav className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wide">
              {['Home', 'Latest', 'Team', 'Shop', 'Contact'].map((item) => (
                <Link key={item} href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-red transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
            {/* Placeholder for Controls (to reserve space) */}
            <div className="flex items-center gap-4 h-[34px] w-[34px]"></div>
          </div>
          
          {/* Category Scroller Placeholder: needs responsive background/border */}
          <div className="bg-zinc-800 dark:bg-zinc-950 text-white overflow-x-auto no-scrollbar border-t border-zinc-800 dark:border-zinc-700">
            <div className="flex px-5 max-w-[1400px] mx-auto">
              {['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Endurance', 'Interviews'].map((cat, i) => (
                <Link 
                  key={cat} 
                  href="#" 
                  className={`whitespace-nowrap px-4 py-3 text-sm font-bold uppercase hover:text-primary-red transition-colors ${i === 2 ? 'text-primary-red' : 'text-gray-300'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </header>
    );
  }

  // --- Fully Mounted Client Render ---
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 shadow-md transition-colors duration-300">
      {/* Top Bar */}
      <div className="max-w-[1400px] mx-auto px-5 h-20 flex justify-between items-center">
        
        {/* Logo - Ensured responsive text color */}
        <div className="font-display text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
          APEX<span className="text-primary-red">RACING</span>
        </div>

        {/* Desktop Menu - Ensured responsive link colors */}
        <nav className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wide">
          {['Home', 'Latest', 'Team', 'Shop', 'Contact'].map((item) => (
            <Link key={item} href="#" className="text-gray-700 dark:text-gray-300 hover:text-primary-red transition-colors">
              {item}
            </Link>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-current rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            aria-label="Toggle Dark Mode"
          >
            {/* Display Sun icon when resolvedTheme is 'dark', Moon otherwise */}
            {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Category Scroller - Fixed to be responsive */}
      {/* Light mode: uses bg-zinc-800 for contrast; Dark mode: bg-zinc-950 for deeper contrast */}
      <div className="bg-zinc-800 dark:bg-zinc-950 text-white overflow-x-auto no-scrollbar border-t border-zinc-800 dark:border-zinc-700">
        <div className="flex px-5 max-w-[1400px] mx-auto">
          {['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Endurance', 'Interviews'].map((cat, i) => (
            <Link 
              key={cat} 
              href="#" 
              // Links inherit text-white from the parent div, which is fine
              className={`whitespace-nowrap px-4 py-3 text-sm font-bold uppercase hover:text-primary-red transition-colors ${i === 2 ? 'text-primary-red' : 'text-gray-300'}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Mobile Menu Overlay - Ensured responsive background and text */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-900 shadow-lg p-5 border-t text-gray-900 dark:text-gray-200 dark:border-zinc-700">
          <nav className="flex flex-col gap-3 font-semibold text-base uppercase tracking-wide">
            {['Home', 'Latest', 'Team', 'Shop', 'Contact'].map((item) => (
              <Link key={item} href="#" className="hover:text-primary-red transition-colors py-1">
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}