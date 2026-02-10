"use client";

import React, { useState, useEffect, use } from 'react';
import DBHeader from '@/components/DBHeader';
import DBFooter from '@/components/DBFooter';
import Link from 'next/link';
import { Newspaper, X } from 'lucide-react';

const BASE_PATH = '/divebomb';

const CATEGORIES = ['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];
const SITE_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Esports (ARC)', href: '/esports' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Partners', href: '/partners' }
];

export default function CategoryClient({ params }: { params: Promise<{ slug: string }> }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const resolvedParams = use(params);
    
    const getSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

    const slugName = resolvedParams.slug?.replace(/-/g, ' ');
    const activeCategory = CATEGORIES.find(
        cat => cat.toLowerCase() === slugName?.toLowerCase()
    ) || 'All Articles';

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

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-db-black" />;

    const featured = {
        title: "Technical Analysis: The evolution of floor aero in 2025",
        description: "A deep dive into how teams are managing vortex structures under the new technical directives to find stability in high-speed corners.",
        author: "Umut Yelbasi",
        cleanDate: "OCT 24, 2025",
        categories: [activeCategory],
        displayImage: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=2000&auto=format&fit=crop",
        link: "#"
    };

    const latestNews = Array(5).fill({
        title: "Paddock Rumors: Major technical shakeup expected for 2026 power units",
        cleanDate: "2H AGO",
        link: "#"
    });

    return (
        <div className="min-h-screen bg-white dark:bg-db-black transition-colors duration-300 relative">
            <div className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.07] z-0" 
                 style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
            />

            <div className="relative z-10">
                <DBHeader 
                    theme={theme} 
                    setTheme={setTheme} 
                />

                <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 h-[150px] flex items-center">
                  <div className="absolute inset-0 z-0">
                      <img src="/Jolt4.avif" alt="Background" className="w-full h-full object-cover object-left opacity-60 dark:opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 dark:to-transparent" />
                  </div>
                  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                      <div className="max-w-xl mr-auto text-left">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="h-[2px] w-4 bg-neutral-500 dark:bg-db-lime" />
                              <span className="text-[10px] font-black uppercase tracking-tight text-neutral-500 dark:text-db-lime italic">Articles</span>
                          </div>
                          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white mb-3">{activeCategory}</h1>
                      </div>
                  </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 py-4 space-y-4 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-gray">
                      <div className="lg:col-span-8 border-r border-neutral-200 dark:border-neutral-800 p-6 relative group/article">
                          <a href={featured?.link} target="_blank" className="absolute inset-0 z-20" />
                          <div className="relative aspect-[21/9] overflow-hidden bg-black mb-6 border border-neutral-200 dark:border-neutral-800">
                              <img src={featured?.displayImage} className="object-cover w-full h-full group-hover/article:scale-105 transition-transform duration-700" alt="Main story" />
                          </div>
                          <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-3 text-[10px] font-bold uppercase">
                                  <Link href={`/${getSlug(featured?.categories?.[0])}`} className="text-db-lime hover:underline underline-offset-4 transition-all relative z-30">
                                      {featured?.categories?.[0]}
                                  </Link>
                                  <span className="text-neutral-400 dark:text-neutral-700">/</span>
                                  <Link href={`/author/${getSlug(featured?.author)}`} className="text-neutral-900 dark:text-white hover:underline underline-offset-4 transition-all relative z-30">
                                      {featured?.author}
                                  </Link>
                                  <span className="text-neutral-400 dark:text-neutral-700">/</span>
                                  <span className="text-neutral-500">{featured?.cleanDate}</span>
                              </div>
                              <h1 className="text-3xl font-semibold leading-tight tracking-tighter text-neutral-900 dark:text-white group-hover/article:text-db-lime transition-colors line-clamp-2">{featured?.title}</h1>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">{featured?.description}</p>
                          </div>
                      </div>
                      <aside className="lg:col-span-4 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Newspaper size={14} className="text-db-lime" />
                          <h4 className="text-[11px] font-black uppercase">Latest News</h4>
                        </div>
                        <div className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
                          {latestNews.map((article, i) => (
                            <a key={i} href={article.link} target="_blank" className="group block py-3 first:pt-0 last:pb-0">
                              <p className="text-[14px] font-semibold leading-snug text-neutral-700 dark:text-neutral-300 group-hover:text-db-lime transition-colors line-clamp-2 uppercase">{article.title}</p>
                              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase mt-1 block">{article.cleanDate}</span>
                            </a>
                          ))}
                        </div>
                      </aside>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <section key={i} className="border border-neutral-200 dark:border-neutral-800 bg-db-gray p-3 flex flex-col group relative">
                                <a href="#" className="absolute inset-0 z-20" />
                                <div className="aspect-[16/9] bg-black border border-neutral-200 dark:border-neutral-800 mb-3 overflow-hidden">
                                    <img src={`https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop&sig=${i}`} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Grid" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 text-[8px] font-bold uppercase text-neutral-500">
                                        <span className="text-db-lime">By Technical Editor</span>
                                        <span>/</span>
                                        <span className="dark:text-neutral-500">Oct {12+i}, 2025</span>
                                    </div>
                                    <h3 className="text-[14px] font-bold leading-tight text-neutral-900 dark:text-white group-hover:text-db-lime line-clamp-2 transition-colors uppercase tracking-tight">The impact of hybrid deployment on corner exit speeds</h3>
                                </div>
                            </section>
                        ))}
                    </div>
                </main>

                <footer className="bg-white dark:bg-neutral-950">
                    <DBFooter theme={theme} />
                </footer>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            )}
            <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 z-[130] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-12">
                    <img src={theme === 'dark' ? "/db-white-logo.svg" : "/db-black-logo.svg"} alt="Logo" className="h-4" />
                    <button onClick={() => setIsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"><X size={24} /></button>
                </div>
                <nav className="flex flex-col gap-8">
                    {SITE_LINKS.map((link) => (
                        <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold tracking-tighter text-neutral-900 dark:text-white hover:text-db-lime transition-colors uppercase italic">{link.name}</Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}