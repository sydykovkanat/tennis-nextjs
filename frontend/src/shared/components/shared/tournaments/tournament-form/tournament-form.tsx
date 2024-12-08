import { Confirm, WarningMessage } from '@/shared/components/shared';
import { TournamentDatePicker } from '@/shared/components/shared/tournaments';
import { useTournamentForm } from '@/shared/components/shared/tournaments/hooks';
import {
  Button,
  DialogClose,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { Tournament, TournamentMutation } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-form.module.css';

interface Props {
  onSubmit: (tournament: TournamentMutation) => void;
  existingTournament?: Tournament;
  isLoading?: boolean;
  onClose?: () => void;
  tournamentsLastYearExist?: boolean;
}

export const TournamentForm: React.FC<Props> = ({
  onSubmit,
  existingTournament,
  isLoading,
  onClose,
  tournamentsLastYearExist,
}) => {
  const {
    state,
    setState,
    handleChangeSelect,
    handleChange,
    fileInputChangeHandler,
    handleDateChange,
    showWarning,
    isFormInvalid,
    handleSubmit,
  } = useTournamentForm(onSubmit, existingTournament, tournamentsLastYearExist, isLoading);
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formInner}>
        <Input
          required
          id='name'
          name='name'
          placeholder='Введите название турнира'
          value={state.name}
          label='Название турнира'
          onChange={handleChange}
        />

        <Input
          required
          id='participants'
          name='participants'
          type='number'
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (!/^\d+$/.test(value) || parseInt(value, 10) < 1) {
              event.target.value = value.slice(0, -1);
            }
          }}
          placeholder='Введите кол-во участников'
          value={state.participants}
          label='Количество участников'
          onChange={handleChange}
        />

        <div className={styles.fieldWrapper}>
          <Label htmlFor='eventDate'>Дата проведения</Label>
          <TournamentDatePicker
            value={state.eventDate}
            onChange={(date) => handleDateChange(date)}
            existingTournament={existingTournament}
          />

          {existingTournament && Number(state.tournamentYear) !== Number(existingTournament.tournamentYear) && (
            <WarningMessage message='Вы изменили год турнира. Убедитесь, что все связанные данные (например, ссылка на регистрацию, результаты, регламент) актуальны для нового года.' />
          )}
        </div>

        <Input
          required
          id='category'
          name='category'
          placeholder='Введите категорию турнира'
          value={state.category}
          label='Категория турнира'
          onChange={handleChange}
        />

        {/*<div className={styles.fieldWrapper}>*/}
        <Label htmlFor='rank' className='mb-1'>
          Разряд
        </Label>
        <Select required name='rank' value={state.rank} onValueChange={(value) => handleChangeSelect(value, 'rank')}>
          <SelectTrigger id='rank'>
            <SelectValue placeholder='Укажите разряд' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key='male' value='male'>
                Мужской
              </SelectItem>
              <SelectItem key='female' value='female'>
                Женский
              </SelectItem>
              <SelectItem key='mixed' value='mixed'>
                Микст
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*</div>*/}

        <Input
          id='regulationsDoc'
          name='regulationsDoc'
          type='file'
          accept='.pdf, .doc, .docx, .xls, .xlsx, .txt, .rtf, .odt'
          label='Регламент турнира'
          onChange={fileInputChangeHandler}
        />

        {state.regulationsDoc && (
          <Confirm onOk={() => setState({ ...state, regulationsDoc: null })} onOkText='Очистить'>
            <Button size='sm' variant='destructive' className='mt-1'>
              Очистить файл
            </Button>
          </Confirm>
        )}

        <Input
          id='resultsLink'
          name='resultsLink'
          type='url'
          placeholder='Добавьте ссылку на результаты'
          value={state.resultsLink}
          label='Результаты турнира'
          onChange={handleChange}
        />

        <Input
          required
          id='registrationLink'
          name='registrationLink'
          type='url'
          placeholder='Добавьте ссылку для регистрации'
          value={state.registrationLink}
          label='Ссылка для регистрации'
          onChange={handleChange}
        />
      </div>

      {showWarning && (
        <WarningMessage message='При создании турнира на следующий год, если есть турниры за прошлый год, они будут автоматически удалены. Это действие необратимо.' />
      )}

      <div className={styles.fieldWrapper}>
        <Button type='submit' disabled={isFormInvalid}>
          Сохранить
        </Button>
        <DialogClose asChild>
          <Button type='button' variant='secondary' onClick={onClose}>
            Отмена
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};
