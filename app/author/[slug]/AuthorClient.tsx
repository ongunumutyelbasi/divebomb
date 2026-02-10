"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
    Twitter, 
    Mail, 
    FileText, 
    ChevronUp, 
    ChevronDown, 
    Search,
    Filter,
    Check,
    X
} from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';
import { Author } from '@/data/authors';
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

export default function AuthorClient({ author }: { author: Author }) {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const ARTICLES_PER_PAGE = 6; // Set the number of articles to display per load
    const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

    // Reset visible count whenever search or category changes
    useEffect(() => {
        setVisibleCount(ARTICLES_PER_PAGE);
    }, [searchQuery, selectedCategories]);

    const bioRef = useRef<HTMLParagraphElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getSlug = (name: string) => {
        if (!name) return "";
        return name.toLowerCase().replace('formula-one', 'formula-1').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    const authorArticles = useMemo(() => 
        articlesData.filter(art => getSlug(art.author) === getSlug(author.name)),
    [author.name]);

    const categories = useMemo(() => {
        const cats = new Set(authorArticles.map(a => a.mainCategory).filter((cat): cat is string => !!cat));
        return Array.from(cats).sort();
    }, [authorArticles]);

    const filteredArticles = useMemo(() => {
        // Refined fuzzy search logic
        const isFuzzyMatch = (query: string, itemTitle: string) => {
            const search = query.toLowerCase().replace(/\s/g, ''); // Remove spaces from search
            const target = itemTitle.toLowerCase();
            
            let searchIndex = 0;
            for (let i = 0; i < target.length; i++) {
                if (target[i] === search[searchIndex]) {
                    searchIndex++;
                }
                if (searchIndex === search.length) return true;
            }
            return searchIndex === search.length;
        };

        const results = authorArticles.filter(art => {
            // 1. Check if search query is empty
            if (!searchQuery.trim()) {
                const matchesCat = selectedCategories.length === 0 || 
                    (art.mainCategory && selectedCategories.includes(art.mainCategory));
                return matchesCat;
            }

            // 2. Perform fuzzy match
            const matchesSearch = isFuzzyMatch(searchQuery, art.title);
            
            // 3. Category filter
            const matchesCat = selectedCategories.length === 0 || 
                (art.mainCategory && selectedCategories.includes(art.mainCategory));
                
            return matchesSearch && matchesCat;
        });

        // Helpful for debugging: remove this once you see it working in the console
        console.log(`Search: "${searchQuery}" | Results: ${results.length}`);
        
        return results;
    }, [authorArticles, searchQuery, selectedCategories]);

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategories([]);
    };

    const isFilterActive = searchQuery.length > 0 || selectedCategories.length > 0;
    const hasTotalArticles = authorArticles.length > 0;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) setTheme(savedTheme);
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    useEffect(() => {
        if (!mounted || !bioRef.current) return;
        const checkOverflow = () => {
            const element = bioRef.current;
            if (element) {
                const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
                setIsOverflowing(element.scrollHeight > (lineHeight * 3) + 5);
            }
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [mounted, author.bio]);

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />;

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-300">
            <DBHeader theme={theme} setTheme={setTheme} />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950">
                    {/* The Grid Background */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] z-0" 
                        style={{ 
                            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, 
                            backgroundSize: '32px 32px' 
                        }} 
                    />

                    {/* Radial "Spotlight" Gradients - These were missing from your top snippet */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-db-lime/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 z-0" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-neutral-200 dark:bg-db-lime/5 blur-[100px] z-0" />

                    <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                            <div className="relative group">
                                <div className="absolute inset-0 border border-neutral-500 dark:border-db-lime translate-x-2 translate-y-2 transition-transform" />
                                <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                                    <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="flex-1 space-y-6 my-4 text-center md:text-left">
                                <div className="space-y-0">
                                    <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase dark:text-white leading-none">{author.name}</h1>
                                    <div className="inline-flex items-center gap-2">
                                        <span className="h-[1px] w-8 bg-neutral-500 dark:bg-db-lime" />
                                        <span className="text-sm font-black uppercase text-neutral-500 italic dark:text-db-lime">{author.role.join(", ")}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-2">
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] font-black text-neutral-400 uppercase mb-1">Articles</span>
                                        <div className="flex items-center gap-2 text-sm font-bold dark:text-white uppercase">
                                            <span className="text-db-lime"><FileText size={15} /></span>
                                            {authorArticles.length}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-0 md:ml-4">
                                        {author.twitter && <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-neutral-400 dark:border-neutral-800 text-neutral-400 hover:text-db-lime hover:border-db-lime transition-all"><Twitter size={16} /></a>}
                                        {author.email && <a href={`mailto:${author.email}`} className="p-2 rounded-full border border-neutral-400 dark:border-neutral-800 text-neutral-400 hover:text-db-lime hover:border-db-lime transition-all"><Mail size={16} /></a>}
                                    </div>
                                </div>

                                <div className="relative">
                                    <p ref={bioRef} className={`text-lg md:text-[15px] font-regular leading-snug text-neutral-600 dark:text-neutral-300 max-w-full transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : ''}`}>{author.bio}</p>
                                    {(isOverflowing || isExpanded) && (
                                        <button onClick={() => setIsExpanded(!isExpanded)} className="mt-2 text-[10px] font-black uppercase text-db-lime hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 mx-auto md:mx-0 cursor-pointer">
                                            {isExpanded ? <>Read Less <ChevronUp size={12} /></> : <>Read More <ChevronDown size={12} /></>}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Articles Section */}
                <div className="max-w-6xl mx-auto px-6 py-10">
                    {hasTotalArticles ? (
                        <>
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-6 gap-6">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-black uppercase italic tracking-tight dark:text-white leading-tight">Latest Articles by {author.name}</h2>
                                    <span className="block text-sm font-medium text-neutral-400 leading-normal">Showing {Math.min(visibleCount, filteredArticles.length)} of {filteredArticles.length} articles</span>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    {isFilterActive && (
                                        <button onClick={resetFilters} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-neutral-400 hover:text-db-lime transition-colors mr-2 cursor-pointer">
                                            <X size={12} /> Reset
                                        </button>
                                    )}
                                    <div className="relative w-full sm:w-64 group">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-db-lime transition-colors" />
                                        <input type="text" placeholder="Search stories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium focus:outline-none focus:border-db-lime dark:text-white transition-all" />
                                    </div>
                                    <div className="relative w-full sm:w-56" ref={dropdownRef}>
                                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center justify-between px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm font-medium transition-all hover:border-neutral-300 dark:hover:border-neutral-700 dark:text-white cursor-pointer">
                                            <span className="flex items-center gap-2 truncate">
                                                <Filter size={14} className="text-neutral-500" />
                                                {selectedCategories.length > 0 ? `${selectedCategories.length} Selected` : "All Categories"}
                                            </span>
                                            <ChevronDown size={14} className={`text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden">
                                                <div className="max-h-60 overflow-y-auto py-1">
                                                    {categories.map((cat) => (
                                                        <button key={cat} onClick={() => toggleCategory(cat)} className="w-full flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors dark:text-neutral-300 dark:hover:text-white">
                                                            {cat}
                                                            {selectedCategories.includes(cat) && <Check size={14} className="text-db-lime" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {filteredArticles.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                        {filteredArticles.slice(0, visibleCount).map((article, i) => (
                                            <a key={i} href={article.link} target="_blank" rel="noopener noreferrer" className="group block space-y-4">
                                                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                                                    <img src={article.displayImage} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-db-lime text-black italic">{article.mainCategory}</span>
                                                        <span className="text-[10px] font-bold text-neutral-400 uppercase">{article.cleanDate}</span>
                                                    </div>
                                                    <h3 className="text-base font-semibold leading-tight dark:text-white group-hover:text-db-lime transition-colors line-clamp-3">{article.title}</h3>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {filteredArticles.length > visibleCount && (
                                        <div className="mt-8 flex justify-center">
                                            <button 
                                                onClick={() => setVisibleCount(prev => prev + ARTICLES_PER_PAGE)}
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
                                <div className="py-24 text-center">
                                    <h3 className="text-lg font-bold dark:text-white">No articles found matching your criteria.</h3>
                                    <button onClick={resetFilters} className="mt-4 px-6 py-2.5 bg-db-lime hover:bg-db-lime/85 text-black text-xs font-bold uppercase cursor-pointer rounded-sm">Reset Filters</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-24 text-center border-t border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-bold dark:text-white">This author hasn't published any articles yet.</h3>
                            <p className="text-neutral-500 text-sm mt-2">Check back later for new stories.</p>
                        </div>
                    )}
                </div>
            </main>

            <DBFooter theme={theme} />
        </div>
    );
}