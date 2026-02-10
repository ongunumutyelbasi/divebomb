// src/components/SectionHeader.tsx
import Link from "next/link";
import React from "react";

interface SectionHeaderProps {
    title: string;
    link: string;
}

export const SectionHeader = ({ title, link }: SectionHeaderProps) => (
  <div className="flex justify-between items-end mb-6 border-b-4 border-primary-red pb-2">
    <h3 className="font-display text-3xl font-bold uppercase leading-none dark:text-white">{title}</h3>
    <Link href={link} className="text-primary-red font-bold text-sm uppercase hover:underline">View All &rarr;</Link>
  </div>
);