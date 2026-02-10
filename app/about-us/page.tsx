"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Search, Sun, Moon, MapPin, Twitter, Globe, Linkedin, FileText, X } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';

export default function AboutUs() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const CATEGORIES = ['All Articles', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];
    const SITE_LINKS = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about-us' },
        { name: 'Esports (ARC)', href: '/esports' },
        { name: 'Podcasts', href: '/podcasts' },
        { name: 'Partners', href: '/partners' }
    ];

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

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />

    const teamSection = (title: string, members: any[], accentColor: string, textColor: string, hoverColor: string) => (
        <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-lg font-black uppercase italic tracking-normal dark:text-white shrink-0">{title}</h2>
                <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member, i) => {
                    const sanitize = (name: string) => {
                        return name.toLowerCase()
                            .replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
                    };

                    const firstSlug = sanitize(member.firstName);
                    const lastSlug = sanitize(member.lastName);
                    const email = `${firstSlug}.${lastSlug}@dive-bomb.com`;
                    const imagePath = `/cabinet-images/${firstSlug}-${lastSlug}.avif`;
                    
                    return (
                        <div key={i} className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 p-5 transition-colors h-full relative">
                            <div className={`absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] ${accentColor}`} />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-300 dark:border-neutral-700" />
                            
                            <div className="w-full aspect-square mb-4 bg-neutral-200 dark:bg-neutral-800 overflow-hidden border border-neutral-200 dark:border-neutral-700 relative">
                                <img 
                                    src={imagePath} 
                                    alt={`${member.firstName} ${member.lastName}`}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="flex flex-col flex-grow">
                                <div className="mb-4">
                                    <h3 className="text-[20px] font-bold text-base tracking-tight leading-tight dark:text-white mb-1.5">
                                        {member.firstName} <span className="uppercase">{member.lastName}</span>
                                    </h3>
                                    <div className="min-h-[32px] flex items-start">
                                        <p className={`text-[11px] font-medium uppercase leading-tight ${textColor}`}>
                                            {member.role}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-neutral-400 mt-2">
                                        <MapPin size={10} />
                                        <span className="text-[11px] font-medium uppercase tracking-normal">{member.location}</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                                    <a 
                                        href={`mailto:${email}`} 
                                        className={`flex items-center justify-center h-8 w-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 ${hoverColor} hover:text-black transition-all`}
                                    >
                                        <Mail size={14} />
                                    </a>
                                    <button className="flex items-center justify-center h-8 w-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-300 dark:text-neutral-600 cursor-not-allowed">
                                        <Twitter size={14} />
                                    </button>
                                    <button className="flex items-center justify-center h-8 w-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-300 dark:text-neutral-600 cursor-not-allowed">
                                        <Linkedin size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-300">
            <DBHeader 
                theme={theme} 
                setTheme={setTheme} 
                showProgress={false} // Decide here whether to activate it
            />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 h-[250px] flex items-center">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="/Jolt4.avif" 
                            alt="Background" 
                            className="w-full h-full object-cover object-left opacity-70 dark:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-neutral-900/70 via-neutral-900/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 dark:to-transparent" />
                    </div>
                    
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] z-5" style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <div className="max-w-xl ml-auto">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-[2px] w-4 bg-db-lime" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-db-lime italic">Built by fans, for fans</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-white mb-3">
                                About Us
                            </h1>
                            <div className="space-y-3 text-xs md:text-sm font-medium leading-[1.2] text-neutral-200 dark:text-neutral-400">
                                <p>DIVEBOMB is an exciting and leading voice in worldwide motorsport journalism. We are creatives, analysts, and storytellers dedicated to producing the very best coverage of the racing world.</p>
                                <p>From the paddocks to the podiums, we are your destination for all things motorsport news.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar Section */}
                <div className="max-w-full mx-auto px-0 mb-0">
                    <div className="relative bg-neutral-50/50 dark:bg-neutral-900/20 p-8 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden">
                        {/* Technical Corner Furnishing */}
                        {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-db-lime opacity-60" /> */}
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                            {/* Stat 1 */}
                            <div className="flex flex-col items-center md:items-start md:px-8 border-neutral-200 dark:border-neutral-800 md:border-r">
                                <span className="text-[10px] font-black uppercase tracking-regular text-neutral-400 mb-2">Global Presence</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black italic dark:text-white uppercase tracking-tighter">80+</span>
                                    <span className="text-neutral-500 dark:text-db-lime font-bold italic uppercase text-sm">Writers</span>
                                </div>
                                <p className="text-[11px] text-neutral-500 mt-1 uppercase font-medium">Reporting from 6 continents</p>
                            </div>

                            {/* Stat 2 */}
                            <div className="flex flex-col items-center md:items-start md:px-8 border-neutral-200 dark:border-neutral-800 md:border-r">
                                <span className="text-[10px] font-black uppercase tracking-regular text-neutral-400 mb-2">Accredited by</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black italic dark:text-white uppercase tracking-tighter">10+</span>
                                    <span className="text-neutral-500 dark:text-db-lime font-bold italic uppercase text-sm">Series</span>
                                </div>
                                <p className="text-[11px] text-neutral-500 mt-1 uppercase font-medium">Formula E, IndyCar, WEC & more</p>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex flex-col items-center md:items-start md:px-8">
                                <span className="text-[10px] font-black uppercase tracking-regular text-neutral-400 mb-2">Legacy</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-neutral-500 dark:text-db-lime font-bold italic uppercase text-sm">EST.</span>
                                    <span className="text-4xl font-black italic dark:text-white uppercase tracking-tighter">2020</span>
                                </div>
                                <p className="text-[11px] text-neutral-500 mt-1 uppercase font-medium">Built by fans, for fans</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Directory */}
                <div className="max-w-7xl mx-auto px-6 pt-8">
                    {teamSection(
                        "Administrative Team", 
                        [
                            { firstName: "Dan", lastName: "Jones", role: "Managing Director, Head of Indycar", location: "Kent, England" },
                            { firstName: "Archie", lastName: "O'Reilly", role: "General Manager", location: "Manchester, England" },
                            { firstName: "Aaron", lastName: "Carroll", role: "Assistant General Manager, Head of Supercars", location: "Louth, Ireland" },
                            { firstName: "Vyas", lastName: "Ponnuri", role: "Editor-in-Chief, Head of Formula E", location: "Bengaluru, India" },
                            { firstName: "Morgan", lastName: "Holiday", role: "Head of Editorial & Feeder Series", location: "Philadelphia, PA, USA" },
                            { firstName: "Sakura", lastName: "Yoshino", role: "Marketing Lead", location: "Tochigi, Japan" },
                            { firstName: "Leah", lastName: "Halsey", role: "Head of Social Media", location: "Oxford, England" },
                            { firstName: "Vianne", lastName: "Lee", role: "Head of Digital Media", location: "Singapore" },
                            { firstName: "Scar", lastName: "Stewart", role: "Director, Administrator", location: "London, England" }
                        ], 
                        "border-[#86af11] dark:border-db-lime", 
                        "text-[#86af11] dark:text-db-lime", 
                        "hover:bg-db-lime hover:border-db-lime"
                    )}
                    
                    {teamSection(
                        "Advisory Team", 
                        [
                            { firstName: "Sage", lastName: "Hou", role: "Founder", location: "Los Angeles, CA, USA" },
                            { firstName: "Umut", lastName: "Yelbaşı", role: "Advisor, Head of Accreditations, Design & IT", location: "İstanbul, Türkiye" },
                            { firstName: "Sasha", lastName: "Macmillen", role: "Journalism Advisor", location: "London, England" }
                        ], 
                        "border-amber-600 dark:border-amber-400", 
                        "text-amber-600 dark:text-amber-400", 
                        "hover:bg-amber-500 hover:border-amber-500"
                    )}

                    {teamSection(
                        "Department Heads", 
                        [
                            { firstName: "Meghana", lastName: "Sree", role: "Deputy Editor-in-Chief, Head of Formula One", location: "Chennai, India" },
                            { firstName: "Ellie", lastName: "McLarty", role: "Deputy Head of Social Media", location: "Sydney, Australia" },
                            { firstName: "Isha", lastName: "Mohan", role: "Head of MotoGP", location: "Kochi, Kerala, India" }
                        ], 
                        "border-sky-600 dark:border-sky-400", 
                        "text-sky-600 dark:text-sky-400", 
                        "hover:bg-sky-500 hover:border-sky-500"
                    )}
                </div>

                {/* Join the Team CTA */}
                <section className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 py-20 px-6">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center">
                            
                            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-neutral-800 dark:text-db-lime mb-6">
                                Want to join the team?
                            </h2>
                            
                            <p className="max-w-2xl text-sm md:text-base font-medium leading-normal text-neutral-500 dark:text-neutral-400 mb-10">
                                We are always looking for passionate writers, designers, and creators to join our growing team. 
                                If you have a voice that needs to be heard in the paddock, we want to hear from you.
                            </p>

                            <a 
                                href="mailto:info@dive-bomb.com" 
                                className="inline-flex items-center gap-2 bg-db-lime border border-db-lime px-6 py-3 text-neutral-900 hover:bg-db-lime/70 hover:text-black hover:border-db-lime transition-all"
                            >
                                <Mail size={16} />
                                <span className="font-black italic uppercase tracking-tighter text-sm">
                                    Write to us today
                                </span>
                            </a>

                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-neutral-950">
                <DBFooter theme={theme} />
            </footer>

            {isMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/85 backdrop-blur-sm cursor-pointer" onClick={() => setIsMenuOpen(false)} />
            )}
            <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-background border-l border-neutral-200 dark:border-neutral-800 z-[130] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <img src={theme === 'dark' ? "/db-white-logo.svg" : "/db-black-logo.svg"} alt="Logo" className="h-3.5" />
                    <button onClick={() => setIsMenuOpen(false)} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">
                        <X size={24} />
                    </button>
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
    );
}