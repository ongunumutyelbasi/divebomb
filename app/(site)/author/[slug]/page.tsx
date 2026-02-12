import { authors } from '@/data/authors';
import { notFound } from 'next/navigation';
import AuthorClient from './AuthorClient';

// This runs on the server during build
export function generateStaticParams() {
    return Object.keys(authors).map((slug) => ({
        slug: slug,
    }));
}

// This is a Server Component
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = authors[slug];

    if (!author) {
        return notFound();
    }

    return <AuthorClient author={author} />;
}