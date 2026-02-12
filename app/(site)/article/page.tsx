"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, Newspaper, Play, Search, Headphones, Youtube, ArrowRight, Loader2, Sun, Moon, Share2, MessageSquare, ChevronRight, Camera } from 'lucide-react';
import DBFooter from '@/components/DBFooter';
import ShareButton from '@/components/ShareButton';
import DBHeader from '@/components/DBHeader';

const CheckeredSquare = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        width="16" 
        height="16" 
        fill="currentColor" 
        className={`${className} text-black dark:text-white`}
    >
        <rect x="0" y="0" width="8" height="8" />
        <rect x="16" y="0" width="8" height="8" />
        <rect x="8" y="8" width="8" height="8" />
        <rect x="0" y="16" width="8" height="8" />
        <rect x="16" y="16" width="8" height="8" />
    </svg>
);

const CATEGORIES = ['All Articles', 'Formula 1', 'IndyCar', 'Formula E', 'Feeder Series', 'WRC', 'MotoGP', 'NASCAR', 'Supercars'];
const SITE_LINKS = ['Home', 'About Us', 'Esports (ARC)', 'Podcasts', 'Partners'];

export default function ArticlePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);
    const articleRef = useRef<HTMLElement>(null);
    
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const [visualProgress, setVisualProgress] = useState(0);
    const targetProgress = useRef(0);
    const rafRef = useRef<number | null>(null);

    const [isShareOpen, setIsShareOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const shareRef = useRef<HTMLDivElement>(null);

    const truncateTitle = (title: string, limit: number) => {
        if (title.length <= limit) return title;
        return title.slice(0, limit) + "...";
    };

    useEffect(() => {
        setMounted(true);
        setCurrentUrl(window.location.href);
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=Check out this article: ${encodeURIComponent(currentUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setIsShareOpen(false);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
                setIsShareOpen(false);
            }
        };
        if (isShareOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isShareOpen]);

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
        const handleScroll = () => {
            if (!articleRef.current) return;

            // Calculate total scrollable distance from top of page to bottom of article
            const articleRect = articleRef.current.getBoundingClientRect();
            const articleBottomRelativeToDocument = articleRect.bottom + window.scrollY;
            
            // Progress ends when the bottom of the article is at the bottom of the viewport
            const totalDistance = articleBottomRelativeToDocument - window.innerHeight;
            const currentScroll = window.scrollY;
            
            const progress = Math.max(0, Math.min(100, (currentScroll / totalDistance) * 100));
            targetProgress.current = progress;
        };

        const animate = () => {
            setVisualProgress(prev => {
                const diff = targetProgress.current - prev;
                
                // If we are within 1% of the target, snap to it to trigger the flag immediately
                if (Math.abs(diff) < 1) return targetProgress.current;
                
                // Increase the speed as we get closer to the end
                // If we're past 90%, move at 0.3 speed, otherwise 0.15
                const speed = targetProgress.current > 90 ? 0.3 : 0.15;
                
                return prev + diff * speed; 
            });
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }
        if (isSearchOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isSearchOpen]);

    if (!mounted) return <div className="min-h-screen bg-background" />;

    return (
        <div className="min-h-screen bg-background text-neutral-900 dark:text-neutral-100 font-sans selection:bg-db-lime selection:text-black relative transition-colors duration-300">
            <div className="relative z-10">
                <DBHeader 
                    theme={theme} 
                    setTheme={setTheme} 
                    showProgress={true} 
                    visualProgress={visualProgress}
                />

                <main className="max-w-4xl mx-auto px-4 py-12">
                    {/*}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-neutral-500 mb-8">
                        <a href="/" className="hover:text-db-lime">Home</a>
                        <ChevronRight size={10} />
                        <a href="#" className="hover:text-db-lime">IndyCar</a>
                    </nav>
                    */}

                    <header className="space-y-6 mb-12">
                        <div className="inline-block bg-db-lime text-black px-2 py-0.5 text-[10px] font-black uppercase italic">Indycar</div>
                        <h1 className="text-2xl md:text-5xl font-black leading-[1] tracking-normal uppercase text-neutral-900 dark:text-white">
                            Inside the 2026 IndyCar Rookie of the Year Battle
                        </h1>
                        
                        <div className="flex items-end justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                            <div className="flex flex-wrap items-center gap-8">
                                {/* Author Group with Profile Picture */}
                                <a href="/authors/dan-jones" className="flex items-center gap-3 group cursor-pointer">
                                    <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shrink-0 transition-transform duration-200">
                                        <img 
                                            src="/author-images/dan-jones.avif" 
                                            alt="Dan Jones" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase transition-colors">Written By</span>
                                        <span className="text-xs font-black uppercase group-hover:text-db-lime transition-colors underline-offset-4 group-hover:underline decoration-db-lime">
                                            Dan Jones
                                        </span>
                                    </div>
                                </a>

                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase">Published</span>
                                    <span className="text-xs font-black uppercase">Feb 08, 2026</span>
                                </div>
                            </div>

                            {/* Share Button */}
                            <ShareButton />
                        </div>
                    </header>

                    <div className="mb-6">
                        {/* Wrapper for Image and Corners */}
                        <div className="relative group">
                            {/* Focus Corners */}
                            <div className="absolute -top-[5px] -left-[5px] w-4 h-4 border-t border-l border-neutral-400 dark:border-neutral-600 z-10" />
                            <div className="absolute -top-[5px] -right-[5px] w-4 h-4 border-t border-r border-neutral-400 dark:border-neutral-600 z-10" />
                            <div className="absolute -bottom-[5px] -left-[5px] w-4 h-4 border-b border-l border-neutral-400 dark:border-neutral-600 z-10" />
                            <div className="absolute -bottom-[5px] -right-[5px] w-4 h-4 border-b border-r border-neutral-400 dark:border-neutral-600 z-10" />
                            
                            <div className="aspect-video bg-black overflow-hidden border border-neutral-200 dark:border-neutral-800">
                                <img 
                                    src="https://static.wixstatic.com/media/5f682b_cd9fa9e9642a4bc096ed3d40f7aeb88d~mv2.jpg/v1/fill/w_1480,h_986,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5f682b_cd9fa9e9642a4bc096ed3d40f7aeb88d~mv2.jpg" 
                                    className="w-full h-full object-cover opacity-90" 
                                    alt="Rookie Battle" 
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 mt-2 mr-6">
                            <Camera size={12} className="text-neutral-500" />
                            <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-normal">
                                Chris Owens
                            </p>
                        </div>
                    </div>

                    <article ref={articleRef} className="prose prose-neutral dark:prose-invert max-w-none [&_p]:text-[16px] [&_p]:leading-relaxed [&_p]:text-neutral-700 dark:[&_p]:text-neutral-300 [&_p]:mb-8 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:tracking-tighter [&_h2]:text-neutral-900 dark:[&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-6">
                        <p>An FIA Formula 2 Champion returning to single-seaters as he races full-time in America for the first-time in his career. The defending Indy NXT and former FIA Formula 3 Champion who is already being looked at for one of the series' leading teams.</p>
                        <p>It has all the makings of a titanic battle to claim IndyCar's Rookie of the Year. In fact, many are stating that the battle between Mick Schumacher, Dennis Hauger and Caio Collet for IndyCar's Rookie of the Year award is too close to call when factors such as experience, the teams they are racing for, relevant partnerships and US-based racing knowledge are taken into account.</p>
                        <p>As part of their first official duties as IndyCar rookies, all three drivers were placed in front of the microphone at IndyCar's annual Content Days.</p>
                        <h2>How did the IndyCar opportunity come around?</h2>
                        <p>The trio all have a distinctly similar junior career, as they all climbed through the European ladder - at not a too dissimilar point - but have since forged their own paths in the last half-decade, which has now circled back to them all competing to claim the IndyCar Rookie of the Year honours in 2026.</p>
                        <p>Bearing the surname of his famous father, seven-time Formula One World Champion Michael, there was always an expectation on Schumacher throughout his junior career. After finishing second in the Italian and ADAC Formula 4 championships in 2016, Schumacher continued to climb the European ladder which included championships in the 2018 FIA Formula 3 European Championship and the 2020 F2 Championship. That yielded Schumacher's lifelong dream of an F1 opportunity.</p>
                        <p>However, after two underwhelming seasons with Haas, Schumacher's full-time F1 career was over. He still stayed in the F1 paddock taking up reserve roles with Mercedes and McLaren before making a switch to the FIA World Endurance Championship in 2023, a simple option from a geographical standpoint: "It seemed like in the years after F1, I wanted to stay in Europe and therefore WEC was a very attractive option - I just thought that I could see a long-term future in that. I didn't after some time and preferred to do something else again."</p>
                        <p>After a frustrating two seasons with Alpine, Schumacher wanted a change. That's when Rahal Letterman Lanigan Racing (RLL) President Jay Frye arranged a test on the Indianapolis Motor Speedway Road Course in October for Schumacher. That test kindled the passion inside of Schumacher to return to single seaters.</p>
                        <div className="my-10 py-8 px-6 border-y border-neutral-300 dark:border-db-lime/20 bg-neutral-100 dark:bg-neutral-900/30">
                            <blockquote className="border-l-0 pl-0 italic text-xl font-semibold leading-normal tracking-tight text-neutral-600 dark:text-white">
                                "F1 wasn't an option, and IndyCar came up, and I think I'm very happy to be here now, having learned more about it and seen more about it. I think there's so many good things out here, and I think so many good things that aren't really being portrayed in Europe."
                            </blockquote>
                        </div>
                        <p>As for Hauger and Collet, the duo will step up from Indy NXT, after spending 2025 as title rivals, where Hauger got the better of his Brazilian rival by 72 points. The pair have in fact raced each other since 2021, the season where Hauger won the F3 Championship. However, after both drivers failed in their ambitions to climb the European ladder, they set their sights on IndyCar, with Collet first making the move to Indy NXT in 2024 before Hauger followed a year later. Their goals to reach IndyCar whilst learning the American style of racing in Indy NXT proved successful.</p>
                        <p>"I think my season at Indy NXT went pretty well," said Collet. "Obviously I needed some kind of results to be in IndyCar, and I think we did that. But not only that, we needed someone to open the doors like Larry did, and I think at the end of the season we were starting to search for an opportunity in IndyCar, and we had a couple of options, but I think Foyt was definitely the one that stood out the most."</p>
                        <p>As for Hauger, he immediately grabbed the attention of IndyCar team owners, as he flew out the blocks in his debut Indy NXT season, winning four of the opening five races as he romped home to a championship. It was a season that had impressed many, so much so that his Indy NXT team, Andretti Global, kept Hauger on their books for 2026 as they formed a technical partnership with Dale Coyne Racing, who Hauger will race for in his rookie season.</p>
                        <h2>How have they adapted to racing in America?</h2>
                        <p>Despite having the highest pedigree, Schumacher will be the only rookie who comes into 2026 with no experience of the IndyCar-style of racing.</p>
                        <p>That learning phase was a huge part of the consideration made when both Collet and Hauger made their move into Indy NXT, with the duo already having an understanding of the majority of the circuits, the Firestone tyres, racing on ovals and smaller intricacies such as rolling starts and the use of a spotter.</p>
                        <p>It's crucial knowledge that Hauger goes into 2026 with that he believes will give him a better chance at getting up to speed quickly.</p>
                        <div className="my-10 py-8 px-6 border-y border-neutral-300 dark:border-db-lime/20 bg-neutral-100 dark:bg-neutral-900/30">
                            <blockquote className="border-l-0 pl-0 italic text-xl font-semibold leading-normal tracking-tight text-neutral-600 dark:text-white">
                                "I'm happy that I got some experience with Indy NXT before going into IndyCar. It makes me more prepared for this year, knowing most of the tracks. I think especially the ovals was a really good thing about last year, which wasn't so easy last year for me. But I think I learned a lot of things that I can bring with me into the future. All in all I'm really happy about last year and the challenges it gave me that I can bring with me into 2026."
                            </blockquote>
                        </div>
                        <p>That may put Schumacher at an immediate disadvantage, but it is in fact smaller things which the German is having to adapt to early on in his IndyCar career, even to details as minute as the language.</p>
                        <div className="my-10 py-8 px-6 border-y border-neutral-300 dark:border-db-lime/20 bg-neutral-100 dark:bg-neutral-900/30">
                            <blockquote className="border-l-0 pl-0 italic text-xl font-semibold leading-normal tracking-tight text-neutral-600 dark:text-white">
                                "I think it's mostly vocabulary at the moment, where it's been very different. Metrics have been quite different, as well. Instead of talking about meters we're talking about feet or yards or stuff like that. It's quite tough for me at the moment. We're in a transition where I'm trying to understand everything and putting everything together."
                            </blockquote>
                        </div>
                        <p>Although both Collet and Hauger may have an understanding of those intricacies, it does by no means mean that they are fully up to speed. Indy NXT weekends are usually shorter than those of IndyCar with the cars also not as physical. The series also does not feature live pit stops, with the IndyCar strategy and weekend cadence still a significant learning point for the pair.</p>
                        <p>"I think for sure it's a lot more preparation when you come to a race weekend in terms of strategy, in terms of planning the weekend," said Collet. "I think in Indy NXT was very much FP1, FP2 qualifying, race and it's not like you need to do a lot of strategy on that. I think IndyCar is a lot more complex on that side"</p>
                        <h2>What have off-season preparations entailed?</h2>
                        <p>The chequered flag on the 2026 IndyCar season fell in August and with the series not racing until early March, it has given all three rookies ample time to put in additional work prior to the season.</p>
                        <p>A large part of that has been conducting post-season testing. Both Hauger and Collet have conducted three tests to date, at the Mid-Ohio Sports Car Course, the Indianapolis Motor Speedway Road Course and a Rookie Orientation Programme at Nashville Superspeedway. Schumacher joined the pair at Indianapolis and has since completed an oval test at Homestead-Miami Speedway. All three will be present at this week's test at Sebring International Raceway before the open test at Phoenix Raceway next week.</p>
                    </article>

                    <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                        <div className="flex gap-4">
                            <ShareButton />
                        </div>
                        <div className="flex gap-2">
                            {['IndyCar', '2026', 'Schumacher'].map(tag => (
                                <span key={tag} className="text-[9px] font-bold px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 uppercase tracking-tighter">#{tag}</span>
                            ))}
                        </div>
                    </footer>

                    {/* Related Articles Section */}
                    <section className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white">
                                Keep Reading
                            </h3>
                            <a href="/articles" className="text-[10px] font-black uppercase tracking-regular text-neutral-400 hover:text-db-lime transition-colors">
                                View All Articles <ArrowRight size={12} className="inline-block ml-1" />
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    category: "IndyCar",
                                    title: "O'Ward on \"competitive\" IndyCar field and 2026 title fight",
                                    image: "https://static.wixstatic.com/media/2e1984_b0ed81dfe6da4c85974916dcfd42f4d6~mv2.jpg/v1/fill/w_1080,h_720,al_c,q_85,enc_avif,quality_auto/2e1984_b0ed81dfe6da4c85974916dcfd42f4d6~mv2.jpg",
                                    author: "Morgan Holiday"
                                },
                                {
                                    category: "IndyCar",
                                    title: "Ferrucci insists Foyt are “way further ahead than we've ever been” for the 2026 season",
                                    image: "https://static.wixstatic.com/media/5f682b_c22a6d8ace3040e39fc3fd8be5654e5d~mv2.png/v1/fill/w_1280,h_853,al_c,q_90,enc_avif,quality_auto/5f682b_c22a6d8ace3040e39fc3fd8be5654e5d~mv2.png",
                                    author: "Evan Roberts"
                                },
                                {
                                    category: "IndyCar",
                                    title: "Ericsson at Andretti: What is happening with IndyCar’s Mr. Consistency?",
                                    image: "https://static.wixstatic.com/media/e1d64c_8caf46e0f5c64777aadd69cbf74cf869~mv2.jpg/v1/fill/w_582,h_326,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e1d64c_8caf46e0f5c64777aadd69cbf74cf869~mv2.jpg",
                                    author: "Archie O'Reilly"
                                }
                            ].map((post, i) => (
                                <a key={i} href="#" className="group space-y-4">
                                    {/* Thumbnail with Corners */}
                                    <div className="relative">
                                        <div className="absolute -top-[3px] -left-[3px] w-2 h-2 border-t border-l border-neutral-400 dark:border-neutral-600 z-10" />
                                        <div className="absolute -bottom-[3px] -right-[3px] w-2 h-2 border-b border-r border-neutral-400 dark:border-neutral-600 z-10" />
                                        
                                        <div className="aspect-[16/10] overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="inline-block bg-db-lime text-black px-1.5 py-0.5 text-[9px] font-black uppercase italic">
                                            {post.category}
                                        </div>
                                        <h4 className="text-lg font-black leading-[1.1] uppercase italic text-neutral-900 dark:text-white group-hover:text-db-lime transition-colors line-clamp-3">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500 uppercase">
                                            <span>By {post.author}</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                </main>

                <DBFooter theme={theme} />

                {isMenuOpen && (
                    <div className="fixed inset-0 z-[120] bg-black/50 dark:bg-black/85 backdrop-blur-sm cursor-pointer" onClick={() => setIsMenuOpen(false)} />
                )}
                <div className={`fixed top-0 right-0 h-full w-full max-w-xs bg-background border-l border-neutral-200 dark:border-neutral-800 z-[130] p-8 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
        </div>
    );
}