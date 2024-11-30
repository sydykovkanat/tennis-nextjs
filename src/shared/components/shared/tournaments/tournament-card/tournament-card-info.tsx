import { CardInfoRow } from '@/shared/components/shared';
import { translateRank } from '@/shared/lib/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';

export const TournamentCardInfo = ({ tournament }: { tournament: Tournament }) => {
  const translatedRank = translateRank(tournament.rank);

  return (
    <div>
      <h1 className='flex items-center gap-2 font-bold text-sm md:text-base dark:text-black'>
        Турнир “{tournament.name}”
        <span className='text-[#64B32C] italic dark:text-[#478c16]'>{tournament.category}</span>
      </h1>
      <div className='flex flex-col gap-1 text-sm mt-3 sm:mt-2  text-[#4d4d4d] dark:text-[#3c3c3c]'>
        <CardInfoRow label='Дата проведения:' value={tournament.eventDate} />
        <CardInfoRow label='Разряд:' value={translatedRank} />
        <CardInfoRow label='Кол-во участников:' value={tournament.participants} />
      </div>
    </div>
  );
};
