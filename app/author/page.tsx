"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Mail, Search, Sun, Moon, X, MapPin, FileText, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';

export default function AuthorProfile() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const bioRef = useRef<HTMLParagraphElement>(null);

    const checkOverflow = () => {
        const element = bioRef.current;
        if (element) {
            // Compare the actual scroll height to the visible client height
            // If scrollHeight > clientHeight, the text is truncated
            setIsOverflowing(element.scrollHeight > element.clientHeight);
        }
    };

    const CATEGORIES = ['All Articles', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];
    const SITE_LINKS = ['Home', 'About Us', 'Esports (ARC)', 'Podcasts', 'Partners'];

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) setTheme(savedTheme);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme, mounted]);

    useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                }
            }
    
            if (isSearchOpen) {
                document.addEventListener("mousedown", handleClickOutside);
            }
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [isSearchOpen]);

    const author = {
        name: "Dan Jones",
        role: ["Managing Director", "Head of Indycar"],
        bio: "Covering the technical nuances of open-wheel racing and the feeder series ladder since 2019. Specializing in technical analysis and championship narratives across the Atlantic.",
        stats: [
            { label: 'Articles', value: '201', icon: <FileText size={12} /> },
        ]
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [author.bio]); // Re-check if bio content changes

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-300">
            <DBHeader theme={theme} setTheme={setTheme} />

            <main className="flex-grow">
                {/* Profile Hero Section with Integrated Grid */}
                <div className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950">
                    {/* The Grid Background - Limited to Hero */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] z-0"
                        style={{
                            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
                            backgroundSize: '32px 32px',
                        }}
                    />

                    {/* Radial "Spotlight" Gradients over the grid */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-db-lime/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 z-0" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-neutral-200 dark:bg-db-lime/5 blur-[100px] z-0" />

                    <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                            {/* Author Image */}
                            <div className="relative group">
                                <div className="absolute inset-0 border border-neutral-500 dark:border-db-lime translate-x-2 translate-y-2 transition-transform" />
                                <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                                    <img src="/author-images/dan-jones.avif" alt={author.name} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Author Details */}
                            <div className="flex-1 space-y-6 my-4 text-center md:text-left">
                                <div className="space-y-0">
                                    <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase italic dark:text-white leading-none">
                                        {author.name}
                                    </h1>
                                    <div className="inline-flex items-center gap-2">
                                        <span className="h-[1px] w-8 bg-neutral-500 dark:bg-db-lime" />
                                        <span className="text-sm font-black uppercase tracking-[0em] text-neutral-500 dark:text-db-lime">
                                            {author.role.join(", ")}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-2">
                                    {author.stats.map((stat: any, i: number) => (
                                        <div key={i} className="flex flex-col text-left">
                                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-regular mb-1">{stat.label}</span>
                                            <div className="flex items-center gap-2 text-sm font-bold dark:text-white uppercase">
                                                <span className="text-db-lime">{stat.icon}</span>
                                                {stat.value}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-4 ml-0 md:ml-4">
                                        <a href="#" className="p-2 rounded-full border border-neutral-400 dark:border-neutral-800 text-neutral-400 hover:text-db-lime hover:border-db-lime transition-all"><Twitter size={16} /></a>
                                        <a href="#" className="p-2 rounded-full border border-neutral-400 dark:border-neutral-800 text-neutral-400 hover:text-db-lime hover:border-db-lime transition-all"><Mail size={16} /></a>
                                    </div>
                                </div>

                                <div className="relative">
                                    <p 
                                        ref={bioRef}
                                        className={`text-lg md:text-[15px] font-regular leading-snug text-neutral-600 dark:text-neutral-400 max-w-full transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}
                                    >
                                        {author.bio}
                                    </p>
                                    
                                    {/* Only shows if text actually overflows 3 lines */}
                                    {(isOverflowing || isExpanded) && (
                                        <button 
                                            onClick={() => setIsExpanded(!isExpanded)}
                                            className="mt-2 text-[10px] font-black uppercase tracking-widest text-db-lime hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 mx-auto md:mx-0"
                                        >
                                            {isExpanded ? (
                                                <>Read Less <ChevronUp size={12} /></>
                                            ) : (
                                                <>Read More <ChevronDown size={12} /></>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Feed */}
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="flex items-end justify-between mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <h2 className="text-xl font-black uppercase italic tracking-tight dark:text-white">Latest Articles by {author.name}</h2>
                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">{author.stats[0].value} Articles</span>
                    </div>

                    {/* Updated to 3 columns on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <a key={i} href="#" className="group block space-y-4">
                                {/* Reduced image size and adjusted aspect ratio for 3-col layout */}
                                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105 bg-neutral-200 dark:bg-neutral-800" />
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black tracking-tighter uppercase px-1.5 py-0.5 bg-db-lime text-black italic">IndyCar</span>
                                        <span className="text-[10px] font-bold tracking-tighter text-neutral-400 uppercase">Feb 08, 2026</span>
                                    </div>
                                    
                                    {/* Reduced font size and added 3-line truncation */}
                                    <h3 className="text-base font-semibold leading-tight dark:text-white group-hover:text-db-lime transition-colors line-clamp-3">
                                        The Evolution of the IndyCar Aeroscreen for 2026: Technical Breakthroughs and Driver Safety Improvements
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-white dark:bg-neutral-950">
                <DBFooter theme={theme} />
            </footer>

            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/85 backdrop-blur-sm cursor-pointer" onClick={() => setIsMenuOpen(false)} />
            )}
            <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-background border-l border-neutral-200 dark:border-neutral-800 z-[110] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <img src={theme === 'dark' ? "/db-white-logo.svg" : "/db-black-logo.svg"} alt="Logo" className="h-3.5" />
                <button onClick={() => setIsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"><X size={24} /></button>
                </div>
                <nav className="flex flex-col gap-8">
                {SITE_LINKS.map(link => (
                    <a key={link} href="#" className="text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white hover:text-db-lime transition-colors uppercase cursor-pointer">{link}</a>
                ))}
                </nav>
            </div>
        </div>
    );
}