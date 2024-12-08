import { getTournaments } from '@/actions/tournaments';
import { Container, TournamentCalendar } from '@/shared/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Календарь турниров',
};

interface Props {
  searchParams: { rank?: string };
}

export default async function Page({ searchParams }: Props) {
  const rank = searchParams.rank || 'all';
  const tournaments = await getTournaments(rank);

  return (
    <Container>
      <TournamentCalendar tournaments={tournaments} />
    </Container>
  );
}
