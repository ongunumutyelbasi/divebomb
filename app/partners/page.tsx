"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Shield, Handshake, Send, Globe, ChevronDown, Upload, Paperclip } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import DBHeader from '@/components/DBHeader';

const PARTNERS = [
    {
        name: "National Motorsport Academy",
        role: "World's Leading Online Motorsport Degrees",
        description: "NMA are leaders in online, on-demand learning and offer flexible online motorsport degrees that fit around your work and personal life.",
        image: "/nma.jpg",
        link: "https://motorsport.nda.ac.uk/"
    },
];

export default function PartnersPage() {
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
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    }, [theme, mounted]);

    if (!mounted) return <div className="min-h-screen bg-white dark:bg-neutral-950" />;

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-300">
            <DBHeader theme={theme} setTheme={setTheme} />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 h-[260px] flex items-center">
                    <div className="absolute inset-0 z-0">
                        <img src="/Jolt4.avif" alt="Background" className="w-full h-full object-cover object-left opacity-60 dark:opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 dark:to-transparent" />
                    </div>
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] z-5" style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    
                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                        <div className="max-w-xl ml-auto"> {/* Pushed to the right to reveal the left side of the image */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="h-[2px] w-4 bg-neutral-500 dark:bg-db-lime" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-neutral-500 dark:text-db-lime italic">Our Network</span>
                            </div>
                            
                            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white mb-3">
                                Partners
                            </h1>
                            
                            <div className="space-y-3 text-xs md:text-sm font-medium leading-[1.2] text-neutral-600 dark:text-neutral-400">
                                <p>Every year, DIVEBOMB partners with names in the motorsport world from various backgrounds to develop relations and increase awareness.</p>
                                <p>If you would like to discuss partnership possibilities, please fill in the Partnership Contact Form at the bottom of this page.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Partners Grid */}
                <section className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-black uppercase italic tracking-normal dark:text-white shrink-0">Official Partners</h2>
                        <div className="h-[1px] w-full bg-neutral-200 dark:bg-neutral-800" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PARTNERS.map((partner, i) => (
                            <div key={i} className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 transition-all relative">
                                {/* Technical Corner Accent */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-900 dark:border-db-lime opacity-0 group-hover:opacity-100 transition-all z-10" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-900 dark:border-db-lime opacity-0 group-hover:opacity-100 transition-all z-10" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-900 dark:border-db-lime opacity-0 group-hover:opacity-100 transition-all z-10" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-900 dark:border-db-lime opacity-0 group-hover:opacity-100 transition-all z-10" />

                                {/* Large Image Container */}
                                <div className="w-full aspect-[16/7] overflow-hidden bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-800 relative">
                                    <img 
                                        src={partner.image} 
                                        alt={partner.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    />
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors" />
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase text-db-lime italic tracking-normal">{partner.role}</span>
                                            <h3 className="text-xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mt-1">
                                                {partner.name}
                                            </h3>
                                        </div>
                                        <a 
                                            href={partner.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-db-lime hover:text-black transition-all"
                                        >
                                            <Globe size={16} />
                                        </a>
                                    </div>
                                    
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
                                        {partner.description}
                                    </p>
                                
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Compact Partnership Inquiry Form */}
                <section className="relative overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950 py-12 px-6">
                    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" style={{ backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                    <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <Handshake size={28} className="text-db-lime mb-4 opacity-80" />
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white mb-3">Work with us!</h2>
                            </div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-tight font-medium mb-5">
                                If you are a driver, a driver representative, or a team representative and would like to partner with us, please fill in our Partnership Contact Form to discuss how we can help you.
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-tight font-medium">
                                Our previous partnerships included social media posts, interviews, and driver columns on our website.
                            </p>
                        </div>

                        <form className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name / Organization" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[14px] outline-none focus:border-db-lime transition-colors" />
                            <input type="email" placeholder="Email Address" className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[14px] outline-none focus:border-db-lime transition-colors" />
                            
                            {/* Custom Designed Dropdown */}
                            <div className="md:col-span-2 relative">
                                <select 
                                    defaultValue="" // Set the initial value here
                                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[14px] outline-none focus:border-db-lime transition-colors appearance-none cursor-pointer pr-10 text-neutral-500 dark:text-neutral-400"
                                >
                                    {/* Remove the 'selected' attribute from here */}
                                    <option value="" disabled>Nature of Partnership</option>
                                    <option value="driver">Driver Management / PR</option>
                                    <option value="technical">Technical / Media</option>
                                    <option value="sponsorship">Sponsorship Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
                            </div>

                            {/* File Upload Section */}
                            <div className="md:col-span-2">
                                <label className="relative group cursor-pointer">
                                    <input type="file" className="hidden" onChange={(e) => console.log(e.target.files)} />
                                    <div className="flex items-center justify-between border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 px-3 py-3 group-hover:border-db-lime transition-colors">
                                        <div className="flex items-center gap-2">
                                            <Paperclip size={14} className="text-neutral-400 group-hover:text-db-lime" />
                                            <span className="text-[11px] font-bold uppercase text-neutral-500">Attach Media Kit / Proposal</span>
                                        </div>
                                        <Upload size={14} className="text-neutral-400" />
                                    </div>
                                </label>
                                <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-tighter">Max file size: 10MB (PDF, PNG, JPG)</p>
                            </div>

                            <textarea rows={3} placeholder="Your Message..." className="md:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[14px] outline-none focus:border-db-lime transition-colors resize-none" />
                            
                            <button className="md:col-span-2 bg-db-lime py-3 text-neutral-900 hover:bg-db-lime/80 transition-all cursor-pointer flex items-center justify-center gap-2">
                                <Send size={12} />
                                <span className="font-black italic uppercase tracking-tighter text-xs">Send Inquiry</span>
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <DBFooter theme={theme} />
        </div>
    );
}