import { API_URL } from '@/shared/constants';
import { Tournament } from '@/shared/types/tournament.types';

export const TournamentActions = ({ tournament }: { tournament: Tournament }) => {
  const renderActionItem = (text: string, link?: string | null) => {
    if (!link) {
      return null;
    }

    return (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-[#4d4d4d] dark:hover:text-black mt-1 text-[#8c8c8c] dark:text-[#4d4d4d] underline underline-offset-2'
        data-testid='tournament-actions-link'
      >
        {text}
      </a>
    );
  };

  return (
    <div className='flex flex-col text-[13px] mt-3 sm:mt-0'>
      {renderActionItem(
        'Результаты Турнира',
        tournament.resultsLink && tournament.resultsLink !== '' ? tournament.resultsLink : null,
      )}
      {renderActionItem(
        'Регламент Турнира',
        tournament.regulationsDoc ? `${API_URL}/${tournament.regulationsDoc}` : null,
      )}
    </div>
  );
};
