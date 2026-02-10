"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, Newspaper, Play, Search, Headphones, Youtube, ArrowRight, Loader2, Sun, Moon } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';
import articlesDataRaw from '@/data/articles.json';

interface Article {
  title: string;
  link: string;
  author: string;
  description: string;
  displayImage?: string;
  cleanDate?: string;
  categories?: string[];
  mainCategory?: string;
}

const articlesData = articlesDataRaw as Article[];

const SITE_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Esports (ARC)', href: '/esports' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Partners', href: '/partners' }
];

export default function DivebombGlassPortal() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
        }
        return 'dark';
    });

    // Helper to determine if we show relative time or the static date
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "";
        const isToday = /minute|hour|now/i.test(dateString);
        if (isToday) return dateString;
        
        const isRelative = /day|yesterday/i.test(dateString);
        if (isRelative) {
            const date = new Date();
            const match = dateString.match(/\d+/);
            const daysToSubtract = match ? parseInt(match[0]) : (dateString.toLowerCase().includes('yesterday') ? 1 : 0);
            date.setDate(date.getDate() - daysToSubtract);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        return dateString;
    };

    const isCategoryMatch = (articleCat: string | undefined, sectionCat: string) => {
        if (!articleCat) return false;
        const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '').replace('one', '1');
        return normalize(articleCat) === normalize(sectionCat);
    };

    const getSlug = (name: string) => {
        if (!name) return "";
        return name
            .toLowerCase()
            .replace('formula-one', 'formula-1')
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^a-z0-9-]/g, '');    // Remove all non-alphanumeric chars except hyphens
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    useEffect(() => {
        setArticles(articlesData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin text-db-lime" size={40} />
            </div>
        );
    }

    const featured = articles[0];
    const latestNews = articles.slice(1, 7);

    return (
        <div className="min-h-screen bg-background text-neutral-900 dark:text-neutral-100 font-sans selection:bg-db-lime selection:text-black relative transition-colors duration-300">
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.07] z-0"
                style={{
                    backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="relative z-10">
                <DBHeader theme={theme} setTheme={setTheme} showProgress={false} />

                <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-gray">
                        <div className="lg:col-span-8 border-r border-neutral-200 dark:border-neutral-800 p-6 relative group/article">
                            <a href={featured?.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                            <div className="relative aspect-[21/9] overflow-hidden bg-black mb-6 border border-neutral-200 dark:border-neutral-800">
                                <img src={featured?.displayImage} className="object-cover w-full h-full group-hover/article:scale-105 transition-transform duration-700" alt={featured?.title} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase">
                                    <Link href={`/${getSlug(featured?.mainCategory || "")}`} className="text-[#87AF00] dark:text-db-lime hover:underline underline-offset-4 transition-all relative z-30">
                                        {featured?.mainCategory}
                                    </Link>
                                    <span className="text-neutral-400 dark:text-neutral-700">//</span>
                                    <Link href={`/author/${getSlug(featured?.author)}`} className="text-neutral-900 dark:text-white hover:underline underline-offset-4 transition-all relative z-30">
                                        {featured?.author}
                                    </Link>
                                    <span className="text-neutral-400 dark:text-neutral-700">//</span>
                                    <span className="text-neutral-500">{formatDate(featured?.cleanDate)}</span>
                                </div>
                                <h1 className="text-3xl font-semibold leading-tight tracking-tighter text-neutral-900 dark:text-white group-hover/article:text-[#87AF00] dark:group-hover/article:text-db-lime transition-colors line-clamp-2">
                                    {featured?.title}
                                </h1>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                    {featured?.description}
                                </p>
                            </div>
                        </div>
                        <aside className="lg:col-span-4 flex flex-col h-full border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center gap-2 px-6 py-3 shrink-0">
                                <Newspaper size={14} className="text-[#87AF00] dark:text-db-lime" />
                                <h4 className="text-[11px] text-[#87AF00] dark:text-db-lime font-black uppercase">Latest News</h4>
                            </div>
                            
                            <div className="flex-grow grid grid-rows-6">
                                {latestNews.map((article, i) => (
                                    <a 
                                        key={i} 
                                        href={article.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="group flex flex-col justify-center px-6 border-t border-neutral-200 dark:border-neutral-800/60 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-[14px] font-semibold leading-tight text-neutral-700 dark:text-neutral-300 group-hover:text-[#87AF00] dark:group-hover:text-db-lime transition-colors line-clamp-2">
                                                {article.title}
                                            </p>
                                            <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase block">
                                                {formatDate(article.cleanDate)}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </aside>
                    </div>

                    {/* Category Grids */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {['Formula 1', 'IndyCar', 'Formula E', 'Sportscars'].map((cat) => {
                            const catArticles = articles.filter(art => 
                                isCategoryMatch(art.mainCategory, cat)
                            ).slice(0, 4);
                            
                            if (catArticles.length === 0) return null;

                            return (
                                <section key={cat} className="border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-gray px-4 py-3 flex flex-col">
                                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">
                                        <h2 className="text-[15px] font-black tracking-regular uppercase text-[#87AF00] dark:text-db-lime">{cat}</h2>
                                        <Link href={`/${getSlug(cat)}`} className="text-[9px] font-bold uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-30">
                                            See all {cat} articles <ArrowRight size={12} className="inline-block ml-1" />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow">
                                        <div className="md:col-span-6 relative group/card">
                                            <a href={catArticles[0].link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                                            <div className="aspect-[16/10] bg-black border border-neutral-200 dark:border-neutral-800 mb-3 overflow-hidden">
                                                <img src={catArticles[0].displayImage} className="w-full h-full object-cover opacity-80 group-hover/card:scale-105 transition-transform duration-500" alt={catArticles[0].title} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <h3 className="text-[14px] font-bold leading-tight text-neutral-900 dark:text-white group-hover/card:text-[#87AF00] dark:group-hover/card:text-db-lime line-clamp-2 transition-colors">{catArticles[0].title}</h3>
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-neutral-500">
                                                    <Link href={`/author/${getSlug(catArticles[0].author)}`} className="hover:text-neutral-900 dark:hover:text-white relative z-30 transition-colors">{catArticles[0].author}</Link>
                                                    <span className="text-neutral-300 dark:text-neutral-800">//</span>
                                                    <span>{formatDate(catArticles[0].cleanDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 flex flex-col h-full">
                                            {catArticles.slice(1, 4).map((article, i) => (
                                                <div key={i} className="flex-1 flex flex-col justify-center relative group/list border-b border-neutral-200 dark:border-neutral-800/30 last:border-0 py-2 first:pt-0 last:pb-0">
                                                    <a href={article.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                                                    <h4 className="text-[14px] font-bold text-neutral-700 dark:text-neutral-300 group-hover/list:text-[#87AF00] dark:group-hover/list:text-db-lime leading-tight line-clamp-2 mb-1.5">{article.title}</h4>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-normal">
                                                        <Link href={`/author/${getSlug(article.author)}`} className="text-neutral-500 hover:underline relative z-30 transition-colors">{article.author}</Link>
                                                        <span className="text-neutral-300 dark:text-neutral-700">•</span>
                                                        <span className="text-neutral-400 dark:text-neutral-500">{formatDate(article.cleanDate)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {/* YouTube Section */}
                    <section className="relative border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-black">
                        <div className="p-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/10">
                            <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
                                <Youtube size={16} className="text-red-600" />
                                <h2 className="text-[11px] font-black uppercase tracking-tight">LATEST VIDEOS</h2>
                            </div>
                            <a href="https://www.youtube.com/@DiveBomb" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase text-neutral-500 hover:text-[#87AF00] dark:hover:text-db-lime transition-colors">Visit channel <ArrowRight size={12} className="inline-block ml-1" /></a>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-neutral-200 dark:bg-neutral-800">
                            <div className="lg:col-span-7 bg-background dark:bg-db-gray p-4 group cursor-pointer flex flex-col justify-center border-r border-neutral-200 dark:border-neutral-800 relative">
                                <div className="relative aspect-video bg-black border border-neutral-200 dark:border-neutral-800 overflow-hidden mb-3">
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="w-14 h-14 rounded-full bg-background/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                            <Play size={24} fill="white" className="text-white ml-1" />
                                        </div>
                                    </div>
                                    <img src="https://img.youtube.com/vi/cmi60OoeKvo/maxresdefault.jpg" className="w-full h-full object-cover opacity-80" alt="Video Thumbnail" />
                                </div>
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-[#87AF00] dark:group-hover:text-db-lime transition-colors line-clamp-1 tracking-tighter uppercase">IndyCar Podcast: Episode 153 - IndyCar Content Days Part 2</h3>
                            </div>
                            <div className="lg:col-span-5 bg-background dark:bg-db-black flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                                {[
                                    { title: "IndyCar Content Days Part 1", id: "V_J7uXF_6mY" },
                                    { title: "Interview: Dennis Hauger 2026", id: "hs2Hpu7vtaI" },
                                    { title: "Catching up with Tom Gaymor", id: "cmi60OoeKvo" },
                                    { title: "2025 Trivia Challenge", id: "V_J7uXF_6mY" },
                                    { title: "Interview: Seb Murray on Andretti", id: "hs2Hpu7vtaI" },
                                    { title: "Best of 2025 Roundup", id: "cmi60OoeKvo" }
                                ].map((vid, i) => (
                                    <div key={i} className="flex-1 flex items-center p-2.5 gap-4 group cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors relative">
                                        <div className="w-20 h-11 bg-black border border-neutral-200 dark:border-neutral-800 shrink-0 relative overflow-hidden">
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <div className="w-6 h-6 rounded-full bg-background/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                                    <Play size={8} fill="white" className="text-white ml-0.5" />
                                                </div>
                                            </div>
                                            <img src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`} className="w-full h-full object-cover opacity-50" alt={vid.title} />
                                        </div>
                                        <h4 className="text-[13px] font-bold leading-tight text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white line-clamp-2 transition-all uppercase">{vid.title}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Podcast Section */}
                    <section className="relative border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-black">
                        <div className="p-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-900/10">
                            <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
                                <Headphones size={16} className="text-db-lime" />
                                <h2 className="text-[11px] font-black uppercase">OUR PODCASTS</h2>
                            </div>
                            <a href="#" className="text-[9px] font-black uppercase text-neutral-500 hover:text-[#87AF00] dark:hover:text-db-lime transition-colors">Listen on Spotify <ArrowRight size={12} className="inline-block ml-1" /></a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
                            {[
                                { label: "INDYCAR PODCAST", title: "Louis Foster: 2024 Champion Interview", img: "https://i.scdn.co/image/ab6765630000ba8aafe633e4242b6cc6e3ee9e78" },
                                { label: "FORMULA 1 PODCAST", title: "Chaos at COTA: Reviewing the US GP", img: "https://i.scdn.co/image/ab67656300005f1fc1d4e860b5ac4f01b3439d00" },
                                { label: "ENDURANCE PODCAST", title: "Wet Lone Star Le Mans Review", img: "https://i.scdn.co/image/ab6765630000ba8afe9c96ebcf710e78c21dc9c8" },
                                { label: "NASCAR PODCAST", title: "Playoff Drama at Martinsville", img: "https://static.wixstatic.com/media/c53e80_bcdc44e0bbf5408b8e4691fbebd81b0a~mv2.png/v1/fill/w_980,h_980,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/NASCAR%20Cover.png" }
                            ].map((pod, i) => (
                                <div key={i} className="bg-background dark:bg-db-gray p-4 group cursor-pointer flex flex-col transition-colors relative">
                                    <div className="relative aspect-square bg-black border border-neutral-200 dark:border-neutral-800 overflow-hidden mb-4">
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="w-12 h-12 rounded-full bg-background/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                                <Play size={20} fill="white" className="text-white ml-1" />
                                            </div>
                                        </div>
                                        <img src={pod.img} className="w-full h-full object-cover opacity-100 group-hover:opacity-60 transition-opacity duration-300" alt={pod.title} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-black text-neutral-400 dark:text-db-lime uppercase tracking-normal">{pod.label}</span>
                                        <h4 className="text-[14px] font-bold leading-tight text-neutral-900 dark:text-white group-hover:text-[#87AF00] dark:group-hover:text-db-lime transition-colors line-clamp-2 uppercase">
                                            {pod.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <DBFooter theme={theme} />

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/85 backdrop-blur-sm cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                )}
                <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-background border-l border-neutral-200 dark:border-neutral-800 z-[110] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                        <img src={theme === 'dark' ? "/db-white-logo.svg" : "/db-black-logo.svg"} alt="Logo" className="h-3.5" />
                        <button onClick={() => setIsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors"><X size={24} /></button>
                    </div>
                    <nav className="flex flex-col gap-8">
                        {SITE_LINKS.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white hover:text-db-lime transition-colors uppercase cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}