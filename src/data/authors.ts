import { Twitter, Instagram, Mail, Globe } from 'lucide-react';

export interface Author {
  slug: string;
  name: string;
  role: string[];
  bio?: string;
  image: string;
  twitter?: string;   // Optional
  instagram?: string; // Optional
  website?: string;   // Optional
  tiktok?: string;     // Optional
  linkedin?: string;   // Optional
  email?: string;
  stats: {
    articles: number;
  };
}

export const authors: Record<string, Author> = {
  "dan-jones": {
    slug: "dan-jones",
    name: "Dan Jones",
    role: ["Managing Director", "Head of Indycar"],
    bio: "Covering the technical nuances of open-wheel racing and the feeder series ladder since 2019...",
    image: "/author-images/dan-jones.avif",
    email: "dan.jones@divebomb.com",
    stats: { articles: 201 }
  },
  "umut-yelbasi": {
    slug: "umut-yelbasi",
    name: "Umut Yelbaşı",
    role: ["Advisor", "Head of Design & IT", "Head of Accreditations"],
    bio: "Covering the technical nuances of open-wheel racing and the feeder series ladder since 2019...",
    image: "/cabinet-images/umut-yelbasi.avif",
    twitter: "https://twitter.com/umut_yelbasi",
    instagram: "https://www.instagram.com/photosbyamusician/",
    email: "umut.yelbasi@divebomb.com",
    stats: { articles: 201 }
  },
  "vyas-ponnuri": {
    slug: "vyas-ponnuri",
    name: "Vyas Ponnuri",
    role: ["Editor in Chief", "Head of Formula E"],
    bio: "22, a journalist from Bangalore, India, currently covering Formula E and Feeder Series for DIVEBOMB. A host on the DIVEBOMB Formula E Podcast.\n\nAlso covers Formula One, and occasionally dabbles in for his dose of endurance racing!",
    image: "/cabinet-images/vyas-ponnuri.avif",
    twitter: "https://twitter.com/vyasponnuri",
    instagram: "https://www.instagram.com/vyas.ponnuri/",
    email: "vyas.ponnuri@divebomb.com",
    stats: { articles: 201 }
  },
  "aaron-carroll": {
    slug: "aaron-carroll",
    name: "Aaron Carroll",
    role: ["Assistant General Manager", "Head of Supercars"],
    image: "/cabinet-images/aaron-carroll.avif",
    email: "aaron.carroll@divebomb.com",
    stats: { articles: 201 }
  },
  "archie-oreilly": {
    slug: "archie-oreilly",
    name: "Archie O'Reilly",
    role: ["General Manager"],
    image: "/cabinet-images/archie-oreilly.avif",
    email: "archie.oreilly@divebomb.com",
    stats: { articles: 201 },
    bio: "Writer predominantly covering IndyCar and part of the DIVEBOMB IndyCar Podcast."
  },
  "mia-wallace": {
    slug: "mia-wallace",
    name: "Mia Wallace",
    role: ["Writer"],
    image: "/author-images/mia-wallace.avif",
    stats: { articles: 201 },
    instagram: "https://www.instagram.com/miagabriellew/",
    tiktok: "https://www.tiktok.com/@tracksidewithmimi",
    bio: "Avid sports journalist with a focus on Formula 1. I love looking into the off-track things that alter on-track performance and influences driver personality, whether that be fashion, history, or brand partnerships."
  },
  "evan-roberts": {
    slug: "evan-roberts",
    name: "Evan Roberts",
    role: ["Writer"],
    image: "/author-images/evan-roberts.avif",
    stats: { articles: 201 },
  },
  "divebomb-motorsport": {
    slug: "divebomb-motorsport",
    name: "DIVEBOMB Motorsport",
    role: ["Editorial Team"],
    image: "/db-profile.png",
    stats: { articles: 201 },
    email: "info@divebomb.com",
    bio: "Articles written by the collective efforts of the DIVEBOMB editorial team. These articles may include collaborative pieces, press releases, or content that doesn't fit the profile of a single author but still provides valuable insights and information to our readers."
  },
  "morgan-holiday": {
    slug: "morgan-holiday",
    name: "Morgan Holiday",
    role: ["Head of Editorial & Feeder Series"],
    image: "/author-images/morgan-holiday.jpg",
    stats: { articles: 201 },
  },
  "caitlyn-gordon": {
    slug: "caitlyn-gordon",
    name: "Caitlyn Gordon",
    role: ["Writer"],
    image: "/author-images/caitlyn-gordon.avif",
    stats: { articles: 201 },
  },
  "maham-mir": {
    slug: "maham-mir",
    name: "Maham Mir",
    role: ["Writer"],
    image: "/author-images/maham-mir.avif",
    stats: { articles: 201 },
  },
  "teagan-crump": {
    slug: "teagan-crump",
    name: "Teagan Crump",
    role: ["Writer"],
    image: "/author-images/teagan-crump.avif",
    stats: { articles: 201 },
    bio: "An aspiring journalist currently undertaking degree studies. Passionate about content creation, having been a podcaster and motorsport content creator for over four years.",
  },
  "kavi-khandelwal": {
    slug: "kavi-khandelwal",
    name: "Kavi Khandelwal",
    role: ["Writer"],
    image: "/author-images/kavi-khandelwal.avif",
    stats: { articles: 201 },
    bio: "I'm a published author and motorsport writer with a passion for Formula 1, particularly the dynamics of driver adaptability and performance. I love exploring the strategy, psychology, and stories that shape the sport, and I aim to bring fresh, thoughtful insight to every piece I write. I also run my own website, where I share in-depth articles and analysis for fellow F1 enthusiasts. When I’m not writing, you’ll likely find me studying driver trends or delving into the human side of high-speed racing.",
  },
  "tarun-suresh": {
    slug: "tarun-suresh",
    name: "Tarun Suresh",
    role: ["Writer"],
    image: "/author-images/tarun-suresh.avif",
    stats: { articles: 201 },
    bio: "Just a person who likes motorsport.",
  },
  "ghazlan-atqiya-firmansyah": {
    slug: "ghazlan-atqiya-firmansyah",
    name: "Ghazlan Atqiya Firmansyah",
    role: ["Writer"],
    image: "/author-images/ghazlan-atqiya-firmansyah.avif",
    stats: { articles: 201 },
    bio: "A lifelong motorsport fan. I previously covered F1, now venturing to endurance racing.",
  },
};