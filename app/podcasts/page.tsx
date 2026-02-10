"use client";

import React, { useState, useEffect } from 'react';
import { Play, Headphones, Radio, Mic2 } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';

const PODCAST_SERIES = [
    {
        title: "IndyCar Podcast",
        description: "Join Dan Jones and Archie O'Reilly for a fresh take on the premier single-seater series in the United States, featuring exclusive driver interviews.",
        platform: "YouTube, Spotify, Apple Podcasts",
        image: "/podcast-covers/indycar-podcast.png",
        link: "https://open.spotify.com/show/3SMXd5bD8gJG4o8RAKR9d9?si=1c76180c35e44140",
        status: "Weekly",
        color: "#da291c" // IndyCar Red
    },
    {
        title: "Formula 1 Podcast",
        description: "Your destination for race reviews, championship analysis, and controversies at the pinnacle of motorsport with Maham, Marit, and Rohan.",
        platform: "Spotify, Apple Podcasts",
        image: "/podcast-covers/f1-podcast.png",
        link: "https://open.spotify.com/show/2dndroOylmH1Ev6qx9im6v?si=b30e4d8a55bc41ec",
        status: "Weekly",
        color: "#b4eb16" // DIVEBOMB Lime
    },
    {
        title: "Formula E Podcast",
        description: "Deep-dives into the latest electric racing updates, team performances, and technical analysis from across the Formula E world.",
        platform: "Spotify, Apple Podcasts",
        image: "/podcast-covers/fe-podcast.png",
        link: "https://open.spotify.com/show/3feKRJfoJa7Bj2AEfwSiRM?si=0866d33f51184356",
        status: "Weekly",
        color: "#23f1f1" // Formula E Electric Blue
    },
    {
        title: "NASCAR Podcast",
        description: "Bailey, Gabe, and Sean break down the high-octane world of stock car racing, from the Daytona 500 to the championship finale.",
        platform: "Spotify, Apple Podcasts",
        image: "/podcast-covers/nascar-podcast.png",
        link: "https://open.spotify.com/show/2TUMr1P998x8PwVqGyaetY?si=7158814bb5194841",
        status: "Weekly",
        color: "#fec10d" // NASCAR Yellow
    }
];

export default function PodcastsPage() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

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
        } else {
            root.classList.remove('dark');
        }
    }, [theme, mounted]);

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />;

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-300">
            <DBHeader theme={theme} setTheme={setTheme} />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 h-[300px] flex items-center">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/Jolt4.avif" 
                            alt="Background" 
                            className="w-full h-full object-cover object-left opacity-60 dark:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 dark:to-transparent" />
                    </div>
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] z-5" style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <div className="max-w-xl ml-auto">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-[2px] w-4 bg-neutral-500 dark:bg-db-lime" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-neutral-500 dark:text-db-lime italic">Audio Experience</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white mb-3">
                                Podcasts
                            </h1>
                            <p className="text-xs md:text-sm font-medium leading-[1.2] text-neutral-600 dark:text-neutral-400">
                                Beyond the written word. Join our editors and special guests as we dissect the world of motorsport through long-form discussion and expert analysis.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Podcast Grid */}
                <section className="max-w-full mx-auto px-18 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {PODCAST_SERIES.map((pod, i) => (
                            <div 
                                key={i} 
                                className="group relative bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 transition-all"
                                style={{ '--hover-color': pod.color } as React.CSSProperties}
                            >
                                {/* The colored corner accent */}
                                <div 
                                    className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" 
                                    style={{ borderColor: pod.color }}
                                />
                                
                                <div className="flex flex-col md:flex-row p-6 gap-6">
                                    <div className="w-full md:w-44 aspect-square shrink-0 bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden relative">
                                        <img src={pod.image} alt={pod.title} className="w-full h-full object-cover transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>

                                    <div className="flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Radio size={12} style={{ color: pod.color }} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{pod.status}</span>
                                            </div>
                                            <h2 
                                                className="text-xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white mb-2 transition-colors group-hover:text-[var(--hover-color)]"
                                            >
                                                {pod.title}
                                            </h2>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal mb-6">
                                                {pod.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 mt-auto">
                                            <a 
                                                href={pod.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2.5 transition-all hover:text-black"
                                                style={{ '--btn-hover': pod.color } as React.CSSProperties}
                                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = pod.color)}
                                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
                                            >
                                                <Play size={12} fill="currentColor" />
                                                Listen on Spotify
                                            </a>
                                            <div className="flex items-center gap-1.5 text-neutral-400">
                                                <Headphones size={14} />
                                                <span className="text-[9px] font-bold uppercase">{pod.platform}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Subscription CTA remains the same */}
                <section className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-10 px-6">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/jolt-full.webp" 
                            alt="Subscription Background" 
                            className="w-full h-full object-cover opacity-30 dark:opacity-20"
                        />
                        {/* Radial Gradient to focus attention on the center text */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80 dark:from-neutral-950/80 dark:via-transparent dark:to-neutral-950/80" />
                    </div>

                    {/* Technical Square Grid Overlay */}
                    <div 
                        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] z-5" 
                        style={{ 
                            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, 
                            backgroundSize: '24px 24px' 
                        }} 
                    />
                    
                    <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                        <Mic2 size={32} className="text-db-lime mb-6 opacity-80" />
                        
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white mb-4">
                            Never miss an episode
                        </h2>
                        
                        <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400 mb-10 uppercase font-bold tracking-tight">
                            Subscribe to your favorite series for weekly racing insights.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {['Apple Podcasts', 'Spotify', 'RSS Feed'].map((plat) => (
                                <button 
                                    key={plat} 
                                    className="bg-white/50 dark:bg-neutral-100/20 backdrop-blur-sm text-[11px] font-black uppercase border border-neutral-200 dark:border-neutral-800 px-8 py-3 hover:border-neutral-400 hover:text-neutral-600 dark:hover:border-db-lime dark:hover:text-db-lime transition-all cursor-pointer"
                                >
                                    {plat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <DBFooter theme={theme} />
        </div>
    );
}