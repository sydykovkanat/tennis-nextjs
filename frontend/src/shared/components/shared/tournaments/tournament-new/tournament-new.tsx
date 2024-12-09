import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentNew } from '@/shared/components/shared/tournaments/hooks';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-new.module.css';

interface Props {
  tournamentsLastYearExist: boolean;
}

export const TournamentNew: React.FC<Props> = ({ tournamentsLastYearExist }) => {
  const { isCreating, open, setOpen, handleClose, onFormSubmit } = useTournamentNew();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={styles.addButton} icon={SquaresPlusIcon}>
          Создать турнир
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className={styles.tournamentDialog}>
        <DialogHeader>
          <DialogTitle>Создать новый турнир</DialogTitle>
        </DialogHeader>
        <TournamentForm
          isLoading={isCreating}
          onClose={handleClose}
          onSubmit={onFormSubmit}
          tournamentsLastYearExist={tournamentsLastYearExist}
        />
      </DialogContent>
    </Dialog>
  );
};
