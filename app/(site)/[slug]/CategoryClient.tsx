"use client";

import React, { useState, useEffect, use } from 'react';
import DBHeader from '@/components/DBHeader';
import DBFooter from '@/components/DBFooter';
import Link from 'next/link';
import { Newspaper, X, Plus, ChevronDown } from 'lucide-react';

// Import your local JSON database
import allArticlesData from '@/data/articles.json';

const CATEGORIES = ['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];

export default function CategoryClient({ params }: { params: Promise<{ slug: string }> }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);
    // State to track how many grid articles are visible
    const [visibleCount, setVisibleCount] = useState(9);
    
    const resolvedParams = use(params);
    const getSlug = (name: string) => name?.toLowerCase().replace(/\s+/g, '-');

    const slugName = resolvedParams.slug?.replace(/-/g, ' ');
    const activeCategory = CATEGORIES.find(
        cat => cat.toLowerCase() === slugName?.toLowerCase()
    ) || 'All Articles';

    const normalizeCategory = (cat: string) => {
        const map: Record<string, string> = {
            'formula one': 'formula 1',
            'f1': 'formula 1',
        };
        const lower = cat.toLowerCase();
        return map[lower] || lower;
    };

    const filteredArticles = allArticlesData.filter(article => {
        const normalizedActive = normalizeCategory(activeCategory);
        if (normalizedActive === 'all articles') return true;
        const matchesMain = normalizeCategory(article.mainCategory) === normalizedActive;
        const matchesSub = article.categories?.some(
            cat => normalizeCategory(cat) === normalizedActive
        );
        const isLiveCoverageActive = normalizedActive === 'live coverage';
        const hasLiveTitle = article.title.trim().toUpperCase().startsWith("LIVE:");
        return matchesMain || matchesSub || (isLiveCoverageActive && hasLiveTitle);
    });

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) setTheme(savedTheme);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = window.document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-db-black" />;

    const featured = filteredArticles[0]; 
    const latestNews = filteredArticles.slice(1, 7);
    // Slice based on the visibleCount state
    const allGridArticles = filteredArticles.slice(7);
    const displayedGridArticles = allGridArticles.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-db-black transition-colors duration-300 relative">
            <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-0" 
                 style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '20px 20px' }} 
            />

            <div className="relative z-10">
                <DBHeader theme={theme} setTheme={setTheme} />

                <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 h-[150px] flex items-center">
                  <div className="absolute inset-0 z-0">
                      <img src="/Jolt4.avif" alt="Background" className="w-full h-full object-cover object-left opacity-60 dark:opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 dark:to-transparent" />
                  </div>
                  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                      <div className="max-w-xl mr-auto text-left">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="h-[2px] w-4 bg-db-lime" />
                              <span className="text-[10px] font-black tracking-tight text-neutral-500 dark:text-db-lime uppercase italic">Articles</span>
                          </div>
                          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white mb-3">{activeCategory}</h1>
                      </div>
                  </div>
                </div>

                <main className="max-w-7xl mx-auto px-4 py-4 space-y-4 relative">
                    {filteredArticles.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-12 border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-gray">
                                <div className="lg:col-span-8 border-r border-neutral-200 dark:border-neutral-800 p-6 relative group/article">
                                    {/* Main Article Overlay - z-20 */}
                                    <a 
                                        href={featured?.link || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="absolute inset-0 z-20" 
                                    />
                                    
                                    <div className="relative aspect-[21/9] overflow-hidden bg-black mb-6 border border-neutral-200 dark:border-neutral-800">
                                        <img 
                                            src={featured?.displayImage} 
                                            className="object-cover w-full h-full group-hover/article:scale-105 transition-transform duration-700" 
                                            alt={featured?.title} 
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase relative z-30">
                                            {/* Category Display */}
                                            <span className="text-db-lime uppercase">{activeCategory}</span>
                                            <span className="text-neutral-400 dark:text-neutral-700">//</span>

                                            {/* Author Link - Independent clickability via higher z-index */}
                                            <Link 
                                                href={`/author/${getSlug(featured?.author || "")}`} 
                                                className="text-neutral-900 dark:text-white hover:underline underline-offset-4 transition-all"
                                            >
                                                {featured?.author}
                                            </Link>

                                            <span className="text-neutral-400 dark:text-neutral-700">//</span>

                                            <span className="text-neutral-500">{featured?.cleanDate}</span>
                                        </div>

                                        <h2 className="text-3xl font-semibold leading-tight tracking-tighter text-neutral-900 dark:text-white group-hover/article:text-db-lime transition-colors line-clamp-2 relative z-0">
                                            {featured?.title}
                                        </h2>
                                        
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed relative z-0">
                                            {featured?.description}
                                        </p>
                                    </div>
                                </div>

                                <aside className="lg:col-span-4 flex flex-col h-full border-neutral-200 dark:border-neutral-800">
                                    {/* Header - Fixed height */}
                                    <div className="flex items-center gap-2 px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
                                        <Newspaper size={14} className="text-db-lime" />
                                        <h4 className="text-[11px] font-black uppercase text-[#87AF00] dark:text-db-lime">Recent Articles</h4>
                                    </div>
                                    
                                    {/* Articles Container - Fills remaining height and divides into 6 equal rows */}
                                    <div className="flex-grow grid grid-rows-6">
                                        {latestNews.map((article, i) => (
                                            <div 
                                                key={i} 
                                                onClick={() => window.open(article.link, '_blank', 'noopener,noreferrer')}
                                                className="group flex flex-col justify-center px-6 border-b last:border-b-0 border-neutral-200 dark:border-neutral-800/60 cursor-pointer transition-colors"
                                            >
                                                <div className="space-y-1">
                                                    <p className="text-[14px] font-semibold leading-tight text-neutral-700 dark:text-neutral-300 group-hover:text-db-lime transition-colors line-clamp-2">
                                                        {article.title}
                                                    </p>
                                                    
                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase">
                                                        <a 
                                                            href={`/author/${getSlug(article.author)}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation(); 
                                                            }}
                                                            className="text-neutral-400 dark:text-neutral-500 hover:underline underline-offset-2 decoration-neutral-400 dark:decoration-neutral-500 transition-all relative z-30"
                                                        >
                                                            {article.author}
                                                        </a>
                                                        
                                                        <span className="text-neutral-300 dark:text-neutral-600">//</span>
                                                        
                                                        <span className="text-neutral-400 dark:text-neutral-500">
                                                            {article.cleanDate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </aside>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {displayedGridArticles.map((article, i) => (
                                    <section key={i} className="border border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-gray p-3 flex flex-col group relative">
                                        <Link href={article.link} className="absolute inset-0 z-20" />
                                        <div className="aspect-[16/9] bg-black border border-neutral-200 dark:border-neutral-800 mb-3 overflow-hidden">
                                            <img src={article.displayImage} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                                                <span className="text-db-lime uppercase">{article.author}</span>
                                                <span>//</span>
                                                <span className="uppercase">{article.cleanDate}</span>
                                            </div>
                                            <h3 className="text-[16px] font-bold leading-tight text-neutral-900 dark:text-white group-hover:text-db-lime line-clamp-2 transition-colors">{article.title}</h3>
                                        </div>
                                    </section>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {visibleCount < allGridArticles.length && (
                                <div className="mt-8 mb-6 flex justify-center">
                                    <button 
                                        onClick={handleLoadMore}
                                        className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-regular text-neutral-500 dark:text-neutral-400 hover:text-[#87AF00] dark:hover:text-db-lime transition-colors cursor-pointer"
                                    >
                                        <span className="relative">
                                            Load More Articles
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-db-lime transition-all duration-300 group-hover:w-full" />
                                        </span>
                                        <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center text-neutral-500 uppercase font-black italic text-xl">
                            No articles found in {activeCategory}
                        </div>
                    )}
                </main>

                <footer className="bg-white dark:bg-neutral-950">
                    <DBFooter theme={theme} />
                </footer>
            </div>
        </div>
    );
}