import React from 'react';
import { Youtube, Play, Headphones, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
    theme: 'dark' | 'light';
}

const CATEGORIES = ['All Articles', 'Live Coverage', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];

const SITE_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Esports (ARC)', href: 'https://autoracingconnected.wixstudio.com/league' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Partners', href: '/partners' }
];

export default function DBFooter({ theme }: FooterProps) {
    const getSlug = (name: string) => {
        if (!name) return "";
        let slug = name.toLowerCase().replace(/\s+/g, '-');
        if (slug === 'formula-one') return 'formula-1';
        return slug;
    };

    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-background dark:bg-db-black pt-8 pb-8 transition-colors duration-300">
            <div className="max-w-full mx-auto px-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-8">
                    <div className="md:col-span-5 space-y-6">
                        <Link href="/" className="inline-block cursor-pointer">
                            <img 
                                src={theme === 'dark' ? "/db-white-logo.svg" : "/db-black-logo.svg"} 
                                alt="DIVEBOMB" 
                                className="h-5" 
                            />
                        </Link>
                        <div className="flex gap-4">
                            {[Youtube, Play, Headphones].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-db-lime hover:text-black transition-all">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                        <h4 className="text-[11px] font-black uppercase">Navigation</h4>
                        <nav className="flex flex-col gap-2">
                            {SITE_LINKS.map(link => {
                                const isExternal = link.href.startsWith('http');
                                return (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className="text-xs text-neutral-500 hover:text-db-lime uppercase transition-colors flex items-center gap-1.5"
                                    >
                                        {link.name}
                                        {isExternal && <ExternalLink size={10} className="text-neutral-500/50" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <h4 className="text-[11px] font-black uppercase">Series</h4>
                        <nav className="flex flex-col gap-2">
                            {CATEGORIES.slice(1, 7).map(cat => (
                                <Link 
                                    key={cat} 
                                    href={`/${getSlug(cat)}`} 
                                    className="text-xs text-neutral-500 hover:text-db-lime uppercase transition-colors"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                        <h4 className="text-[11px] font-black uppercase">Contact Us</h4>
                        <a href="mailto:info@dive-bomb.com" className="text-sm text-neutral-700 dark:text-neutral-500 hover:text-db-lime transition-colors">info@dive-bomb.com</a>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[12px] font-medium text-neutral-400 dark:text-db-lime/60 tracking-tighter">
                        © {new Date().getFullYear()} DIVEBOMB Motorsport Magazine Limited. ®
                    </p>
                    
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                        className="group flex items-center gap-3 text-[10px] font-black uppercase text-neutral-500 hover:text-db-lime transition-colors cursor-pointer"
                    >
                        <span>Back to top</span>
                        
                        <div className="relative w-3 h-3 flex items-center justify-center">
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-300 dark:bg-neutral-800 group-hover:bg-db-lime transition-colors" />
                            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-neutral-300 dark:bg-neutral-800 group-hover:bg-db-lime transition-colors" />
                            <div className="absolute -top-1 right-[-2.5px] w-1.5 h-1.5 border-t border-r border-neutral-300 dark:border-neutral-800 group-hover:border-db-lime rotate-[-45deg] transition-colors" />
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    );
}