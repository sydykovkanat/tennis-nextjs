'use client';

import { useRewardForm, useRewards } from '@/shared/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { cn, useAppDispatch } from '@/shared/lib';
import { createReward } from '@/shared/lib/features/rewards/rewards-thunks';

import React, { FormEvent, PropsWithChildren } from 'react';

import styles from './reward-form.module.css';

interface Props {
  userId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RewardForm: React.FC<PropsWithChildren & Props> = ({ userId, open, setOpen, children }) => {
  const { reward, setReward, handleChange, handleIconChange, initialState } = useRewardForm({
    userId,
  });
  const { iconVariants, getIconClass } = useRewards();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { toast } = await import('sonner');

    if (!reward.tournament.trim()) {
      return toast.error('Заполните поле турнира!');
    }

    try {
      await dispatch(createReward(reward)).unwrap();
      setReward(initialState);
      toast.success('Награда успешно добавлена!');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при создании/обновлении награды!');
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle className={cn(styles.title)}>Добавить награду</DialogTitle>

          <form onSubmit={handleSubmit} className={cn(styles.form)}>
            <div className={cn(styles.inputBlock)}>
              <Label htmlFor={'tournament'} className={cn(styles.label)}>
                Турнир
              </Label>
              <Input
                name='tournament'
                required
                autoComplete={'off'}
                value={reward.tournament}
                onChange={handleChange}
                placeholder={'Введите название турнира'}
                className={cn(styles.input)}
              />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label htmlFor={'nomination'} className={cn(styles.label)}>
                Номинация
              </Label>
              <Input
                name='nomination'
                autoComplete={'off'}
                value={reward.nomination}
                onChange={handleChange}
                placeholder={'Введите номинацию'}
                className={styles.input}
              />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label htmlFor='place' className={cn(styles.label)}>
                Место
              </Label>
              <Input
                name='place'
                autoComplete={'off'}
                value={reward.place}
                onChange={(e) =>
                  setReward((prev) => ({
                    ...prev,
                    place: Number(e.target.value),
                  }))
                }
                placeholder={'Введите место'}
                className={cn(styles.placeInput)}
              />
            </div>

            <div className={cn(styles.inputBlock)}>
              <Label htmlFor='icon' className={cn(styles.label)}>
                Иконка
              </Label>
              <Select value={reward.icon} onValueChange={handleIconChange}>
                <SelectTrigger className={cn(styles.input)}>
                  <SelectValue placeholder='Укажите иконку' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className={cn(styles.iconsContainer)}>
                    {Object.entries(iconVariants).map(([key, Icon]) => (
                      <SelectItem key={key} value={key}>
                        <Icon className={cn(getIconClass(reward.place ? reward.place : 1), styles.iconSelect)} />
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className={cn(styles.inputBlock)}>
              <Button type={'submit'}>Сохранить</Button>
            </div>
          </form>

          <DialogClose asChild>
            <Button type={'button'} variant={'outline'}>
              Отменить
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
