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
  email: string;
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
};