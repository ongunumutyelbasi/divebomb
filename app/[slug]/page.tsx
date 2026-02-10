import CategoryClient from './CategoryClient';

export async function generateStaticParams() {
  const categories = [
    'all-articles',
    'formula-1',
    'indycar',
    'formula-e',
    'feeder-series',
    'wrc',
    'motogp',
    'nascar',
    'supercars'
  ];

  return categories.map((cat) => ({
    slug: cat,
  }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    return <CategoryClient params={params} />;
}