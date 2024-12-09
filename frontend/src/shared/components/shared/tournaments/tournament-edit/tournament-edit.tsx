import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentEdit } from '@/shared/components/shared/tournaments/hooks';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-edit.module.css';

interface Props {
  id: string;
  existingTournament: Tournament;
  tournamentsLastYearExist?: boolean;
}

export const TournamentEdit: React.FC<Props> = ({ id, existingTournament, tournamentsLastYearExist }) => {
  const { isEditing, open, setOpen, handleClose, onFormSubmit } = useTournamentEdit(id);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' data-testid='edit' icon={PencilSquareIcon} />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className={styles.tournamentDialog}>
        <DialogHeader>
          <DialogTitle>Редактировать турнир</DialogTitle>
        </DialogHeader>
        <TournamentForm
          isLoading={isEditing}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          existingTournament={existingTournament}
          tournamentsLastYearExist={tournamentsLastYearExist}
        />
      </DialogContent>
    </Dialog>
  );
};
