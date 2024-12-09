import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentEdit } from '@/shared/components/shared/tournaments/hooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';

import React, { PropsWithChildren } from 'react';

import styles from './tournament-edit.module.css';

interface Props extends PropsWithChildren {
  id: string;
  existingTournament: Tournament;
  tournamentsLastYearExist?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const TournamentEdit: React.FC<Props> = ({
  id,
  existingTournament,
  tournamentsLastYearExist,
  open,
  setOpen,
  children,
}) => {
  const { isEditing, handleClose, onFormSubmit } = useTournamentEdit(id);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
