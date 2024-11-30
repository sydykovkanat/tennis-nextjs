import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament }) => {
  return (
    <div
      className='rounded-[22px] bg-gradient-135 from-[#f5f5f5] dark:from-[#e1e1e1] from-30% sm:from-25% md:from-10% to-[#64B32C] dark:to-[#478c16] p-1'
      data-testid={`${tournament.name}`}
    >
      <div className='flex flex-col bg-[white] dark:bg-[#aec9a5] rounded-[19px]'>
        <div className='px-3 py-3 sm:flex sm:justify-between'>
          <TournamentCardInfo tournament={tournament} />
          <div className='flex flex-col sm:mt-auto'>
            <TournamentActions tournament={tournament} />
            <div className='text-[#64B32C] dark:text-[#478c16] font-semibold ml-auto sm:ml-0 sm:mt-1'>
              <TournamentRegistration tournament={tournament} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
