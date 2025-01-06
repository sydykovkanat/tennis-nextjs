import { getTournaments } from '@/actions/tournaments';
import { Container, TournamentCalendar } from '@/shared/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Календарь теннисных турниров в Кыргызстан',
  description: 'Календарь турниров КСЛТ - следите за актуальными датами турниров и соревнований.',
  keywords: 'Календарь турниров КСЛТ, Турниры по теннису в Кыргызстане, КСЛТ турниры',
  openGraph: {
    title: 'Календарь теннисных турниров в Кыргызстан',
    description: 'Календарь турниров КСЛТ - следите за актуальными датами турниров и соревнований.',
    images: 'https://tennis.kg/kslt.svg',
    type: 'website',
  },
};

interface Props {
  searchParams: { rank?: string };
}

export const revalidate = 10;

export default async function Page({ searchParams }: Props) {
  const rank = searchParams.rank || 'all';
  const tournaments = await getTournaments(rank);

  return (
    <Container>
      <TournamentCalendar tournaments={tournaments} />
    </Container>
  );
}
