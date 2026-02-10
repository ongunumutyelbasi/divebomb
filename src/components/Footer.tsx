// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-zinc-800">
            <div className="container mx-auto px-5 max-w-[1400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
                    <div>
                        <h4 className="font-display text-xl font-bold uppercase mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400">
                            {['Formula 1', 'IndyCar', 'MotoGP', 'WEC', 'NASCAR'].map(item => (
                                <li key={item} className="hover:text-white hover:translate-x-1 transition-all">
                                    <Link href="#">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-xl font-bold uppercase mb-4">About APEX</h4>
                        <ul className="space-y-2 text-gray-400">
                            {['Our Team', 'Careers', 'Advertise', 'Privacy Policy'].map(item => (
                                <li key={item} className="hover:text-white hover:translate-x-1 transition-all">
                                    <Link href="#">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-xl font-bold uppercase mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">X</div>
                            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">IG</div>
                            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-primary-red transition-colors cursor-pointer">YT</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-display text-xl font-bold uppercase mb-4">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Get the fast lane straight to your inbox.</p>
                        <div className="flex flex-col gap-2">
                            <input type="email" placeholder="Your email" className="bg-zinc-800 border-none p-3 text-white focus:ring-2 focus:ring-primary-red outline-none" />
                            <button className="bg-primary-red py-3 font-bold uppercase hover:bg-red-700 transition-colors">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-8 border-t border-zinc-900 text-gray-500 text-sm">
                    &copy; 2024 APEX Motorsport News. All rights reserved.
                </div>
            </div>
        </footer>
    );
}