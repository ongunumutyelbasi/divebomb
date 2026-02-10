"use client";

import React, { useState, useRef, useEffect } from 'react';
// Added ChevronRight and Radio to imports
import { Search, Sun, Moon, X, ExternalLink, ChevronRight, Radio } from 'lucide-react';
import Link from 'next/link';

const BASE_PATH = '/divebomb';

const CheckeredSquare = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={`${className} text-black dark:text-white`}>
        <rect x="0" y="0" width="8" height="8" /><rect x="16" y="0" width="8" height="8" />
        <rect x="8" y="8" width="8" height="8" /><rect x="0" y="16" width="8" height="8" />
        <rect x="16" y="16" width="8" height="8" />
    </svg>
);

interface DBHeaderProps {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
    showProgress?: boolean;
    visualProgress?: number;
}

const CATEGORIES = ['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];
const SITE_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Esports (ARC)', href: 'https://autoracingconnected.wixstudio.com/league' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Partners', href: '/partners' }
];

export default function DBHeader({ theme, setTheme, showProgress = false, visualProgress = 0 }: DBHeaderProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Live Banner States
    const [isLiveActive, setIsLiveActive] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

    // Live Article Info
    const liveTitle = "24 Hours of Daytona 2026 - Live Updates";
    const liveLink = "/sportscars/live-imsa-24-hours-of-daytona";

    const getSlug = (name: string) => {
        if (!name) return "";
        let slug = name.toLowerCase().replace(/\s+/g, '-');
        if (slug === 'formula-one') return 'formula-1';
        return slug;
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Alt + L to toggle live mode
            if (e.key.toLowerCase() === 'l' && e.altKey) {
                setIsLiveActive(prev => !prev);
                setShowBanner(true);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) setIsSearchOpen(false);
        };
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            inputRef.current?.focus();
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    return (
        <>
            {/* Wrap both in a sticky container so they scroll together */}
            <div className="sticky top-0 z-[100] w-full">
                {isLiveActive && showBanner && (
                    <div className="bg-db-lime dark:bg-db-lime text-neutral-950 border-b border-white/10 dark:border-black/10">
                        <div className="max-w-7xl mx-auto px-4 h-7 flex items-center justify-between">
                            <Link href={liveLink} className="flex-grow flex items-center gap-3 group overflow-show">
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.1em] italic">Live</span>
                                </div>
                                <p className="text-[11px] font-black uppercase tracking-tight truncate">
                                    {liveTitle}
                                </p>
                                <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                            </Link>

                            {/* BANNER CLOSE BUTTON */}
                            {/*
                            <button 
                                onClick={() => setShowBanner(false)}
                                className="p-1.5 hover:bg-white/10 dark:hover:bg-black/10 rounded transition-colors ml-4"
                            >
                                <X size={14} />
                            </button>
                            */}
                        </div>
                    </div>
                )}

                <header className="bg-background/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 h-12">
                    <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            {/* Added double-click to toggle live for easy testing */}
                            <div onDoubleClick={() => setIsLiveActive(!isLiveActive)} className="shrink-0 cursor-pointer">
                                <Link href="/">
                                    <img src={theme === 'dark' ? `${BASE_PATH}/db-white-logo.svg` : `${BASE_PATH}/db-black-logo.svg`} alt="DIVEBOMB" className="h-3.5 w-auto" />
                                </Link>
                            </div>
                            <nav className="hidden lg:flex items-center gap-4">
                                {CATEGORIES.map(cat => (
                                    <Link 
                                        key={cat} 
                                        href={`/${getSlug(cat)}`} 
                                        className="text-[12px] font-medium uppercase text-neutral-500 hover:text-db-lime transition-colors cursor-pointer"
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center" ref={searchRef}>
                                <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'bg-neutral-100 dark:bg-neutral-800/50 rounded-md px-2' : ''}`}>
                                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-neutral-500 hover:text-db-lime transition-colors cursor-pointer shrink-0">
                                        <Search size={18} />
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 flex items-center ${isSearchOpen ? 'w-32 md:w-48 opacity-100' : 'w-0 opacity-0'}`}>
                                        <input 
                                            ref={inputRef}
                                            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search..." className="bg-transparent border-none outline-none text-[12px] w-full text-neutral-900 dark:text-white py-1"
                                        />
                                        {searchQuery.length > 0 && (
                                            <button onClick={() => setSearchQuery("")} className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0 cursor-pointer">
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 text-neutral-500 hover:text-db-lime transition-colors cursor-pointer shrink-0">
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button onClick={() => setIsMenuOpen(true)} className="group flex flex-col items-end gap-1.5 p-2 cursor-pointer w-10 shrink-0">
                                <div className="h-0.5 w-6 bg-neutral-900 dark:bg-neutral-200 group-hover:bg-db-lime group-hover:w-4 transition-all duration-300" />
                                <div className="h-0.5 w-4 bg-neutral-600 dark:bg-neutral-400 group-hover:bg-db-lime group-hover:w-6 transition-all duration-300" />
                                <div className="h-0.5 w-5 bg-neutral-400 dark:bg-neutral-600 group-hover:bg-db-lime group-hover:w-3 transition-all duration-300" />
                            </button>
                        </div>
                    </div>

                    {showProgress && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-200/50 dark:bg-neutral-800/50 flex items-center">
                            <div className="flex h-full w-full relative">
                                <div className="h-full bg-db-lime" style={{ width: '33.33%', transform: `scaleX(${Math.min(visualProgress, 33.33) / 33.33})`, transformOrigin: 'left', willChange: 'transform' }} />
                                <div className="h-full bg-db-lime" style={{ width: '33.33%', transform: `scaleX(${Math.max(0, Math.min(visualProgress - 33.33, 33.33)) / 33.33})`, transformOrigin: 'left', willChange: 'transform' }} />
                                <div className="h-full bg-db-lime" style={{ width: '33.34%', transform: `scaleX(${Math.max(0, Math.min(visualProgress - 66.66, 33.34)) / 33.34})`, transformOrigin: 'left', willChange: 'transform' }} />
                                <div className="absolute right-0 top-[2px] bottom-[-14px] transition-all duration-300 ease-out z-[110]" style={{ opacity: visualProgress > 99.9 ? 1 : 0 }}>
                                    <CheckeredSquare />
                                </div>
                            </div>
                        </div>
                    )}
                </header>
            </div>

            {/* Menu overlays (Mobile) */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            )}
            <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-[130] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-12">
                    <img src={theme === 'dark' ? `${BASE_PATH}/db-white-logo.svg` : `${BASE_PATH}/db-black-logo.svg`} alt="Logo" className="h-4" />
                    <button onClick={() => setIsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"><X size={24} /></button>
                </div>
                <nav className="flex flex-col gap-4">
                    {SITE_LINKS.map((link) => {
                        const isExternal = link.href.startsWith('http');
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href} 
                                onClick={() => setIsMenuOpen(false)} 
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-white hover:text-db-lime transition-colors uppercase cursor-pointer flex items-center gap-2"
                            >
                                {link.name}
                                {isExternal && <ExternalLink size={16} className="text-neutral-400" />}
                            </Link>
                        );
                    })}
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-2" />
                    {CATEGORIES.slice(1).map((cat) => (
                        <Link 
                            key={cat} 
                            href={`/${getSlug(cat)}`} 
                            onClick={() => setIsMenuOpen(false)} 
                            className="text-lg font-semibold tracking-tight text-neutral-500 hover:text-db-lime transition-colors uppercase cursor-pointer"
                        >
                            {cat}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}