import React, { useState, useEffect, useRef } from 'react';
import { Share2, ArrowRight } from 'lucide-react';

export default function ShareButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out this article: " + window.location.href)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsOpen(false);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={containerRef}>
            {showCopied && (
                <div className="absolute -top-8 right-0 bg-db-lime text-black text-[9px] font-black uppercase px-2 py-1 italic animate-in fade-in slide-in-from-bottom-2 duration-300 z-[160]">
                    Link Copied
                </div>
            )}

            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:bg-db-lime hover:border-db-lime hover:text-black transition-all duration-200 group cursor-pointer"
            >
                <span className="text-[10px] font-black uppercase italic">Share</span>
                <Share2 size={14} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-[150] animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col py-0">
                        <button 
                            onClick={copyToClipboard}
                            className="w-full text-left px-4 py-2 text-[10px] font-black uppercase italic hover:bg-db-lime hover:text-black transition-colors border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between cursor-pointer"
                        >
                            Copy Link <Share2 size={12} />
                        </button>
                        <a href={shareLinks.twitter} target="_blank" rel="noreferrer" className="px-4 py-2 text-[10px] font-black uppercase italic hover:bg-db-lime hover:text-black transition-colors flex items-center justify-between">
                            X (Twitter) <ArrowRight size={12} />
                        </a>
                        <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="px-4 py-2 text-[10px] font-black uppercase italic hover:bg-db-lime hover:text-black transition-colors flex items-center justify-between">
                            Facebook <ArrowRight size={12} />
                        </a>
                        <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 text-[10px] font-black uppercase italic hover:bg-db-lime hover:text-black transition-colors flex items-center justify-between">
                            LinkedIn <ArrowRight size={12} />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}