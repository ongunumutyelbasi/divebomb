// src/components/Cards.tsx
import Link from "next/link";
import { Play } from "lucide-react";

// --- SidebarArticleCard (NEW) ---
interface SidebarArticleCardProps {
    img: string;
    title: string;
    date: string;
    tag?: string;
}
export const SidebarArticleCard = ({ img, title, date, tag }: SidebarArticleCardProps) => (
  // 🚩 Dark mode background on hover
  <div className="flex gap-4 cursor-pointer group p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
    <div className="flex-shrink-0 w-20 h-20 overflow-hidden bg-black aspect-square">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover opacity-90 group-hover:opacity-75 group-hover:scale-105 transition-all duration-300"
      />
    </div>
    <div className="flex flex-col justify-center">
        {tag && <span className="text-[10px] font-bold text-primary-red uppercase tracking-wider mb-1">{tag}</span>}
        {/* 🚩 Dark mode text color */}
        <h4 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white group-hover:text-primary-red transition-colors line-clamp-2">{title}</h4>
        {/* 🚩 Dark mode date text color */}
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{date}</p>
    </div>
  </div>
);

// --- SideHeroCard (No changes needed, as it uses white text on a dark background) ---
interface SideHeroCardProps {
    img: string;
    category: string;
    title: string;
    className?: string;
}
export const SideHeroCard = ({ img, category, title, className }: SideHeroCardProps) => (
  <div className={`relative flex-1 group overflow-hidden bg-black cursor-pointer ${className}`}>
    <img src={img} alt={category} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500" />
    <div className="absolute bottom-0 left-0 p-3 w-full"> 
      <span className="bg-primary-red text-white text-[10px] font-bold px-2 py-1 uppercase mb-2 inline-block">{category}</span>
      <h3 className="font-display text-lg font-bold text-white leading-tight">{title}</h3> 
    </div>
  </div>
);

// --- ArticleCard ---
interface ArticleCardProps {
    img: string;
    tag: string;
    title: string;
    date: string;
    readTime: string;
}
export const ArticleCard = ({ img, tag, title, date, readTime }: ArticleCardProps) => (
  // 🚩 Dark mode background color
  <div className="group flex flex-col bg-white dark:bg-zinc-800 border-b-4 border-transparent hover:border-primary-red hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
    <div className="relative aspect-video overflow-hidden bg-black">
      <img src={img} alt={title} className="w-full h-full object-cover opacity-90 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500" />
    </div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-primary-red uppercase tracking-wider">{tag}</span>
        {/* 🚩 Dark mode date/readTime text color */}
        <span className="text-[10px] text-gray-400 font-semibold dark:text-gray-400">{date} • {readTime}</span>
      </div>
      {/* 🚩 Dark mode title text color */}
      <h3 className="font-display text-xl font-bold leading-tight mb-2 text-gray-900 dark:text-white">{title}</h3>
    </div>
  </div>
);

// --- SectionHeader ---
interface SectionHeaderProps {
    title: string;
    link: string;
}
export const SectionHeader = ({ title, link }: SectionHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    {/* 🚩 Dark mode heading text color */}
    <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight dark:text-white">{title}</h2>
    {/* 🚩 Dark mode link text color */}
    <Link href={link} className="flex items-center gap-1 text-sm font-semibold uppercase text-gray-600 dark:text-gray-400 hover:text-primary-red transition-colors">
      View All <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </Link>
  </div>
);

// --- PodcastPlayer (Mostly dark already, minor change to link hover) ---
interface PodcastPlayerProps {
    title: string;
    ep: string;
    img: string;
    progress: number;
}
export const PodcastPlayer = ({ title, ep, img, progress }: PodcastPlayerProps) => (
  <div className="bg-[#2a2a2a] rounded-xl p-4 flex gap-4 border border-zinc-700 hover:border-[#1db954] transition-colors cursor-pointer group">
    <img src={img} alt="Pod" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
    <div className="flex-grow flex flex-col justify-center">
      <h4 className="font-bold text-white text-sm mb-1 line-clamp-1 font-sans">{title}</h4>
      <p className="text-xs text-gray-400 mb-3">{ep}</p>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform"><Play size={10} fill="currentColor" className="ml-0.5" /></div>
        <div className="h-1 bg-zinc-600 flex-grow rounded-full overflow-hidden">
          <div className="h-full bg-[#1db954]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  </div>
);

// --- VideoCard ---
interface VideoCardProps {
    title: string;
    img: string;
}
export const VideoCard = ({ title, img }: VideoCardProps) => (
  <div className="group cursor-pointer">
    <div className="aspect-video bg-black relative overflow-hidden mb-3">
      <img src={img} alt="Video" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-primary-red/90 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          <Play size={20} fill="currentColor" className="ml-1" />
        </div>
      </div>
    </div>
    {/* 🚩 Dark mode title text color */}
    <h4 className="font-display text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary-red transition-colors">{title}</h4>
  </div>
);