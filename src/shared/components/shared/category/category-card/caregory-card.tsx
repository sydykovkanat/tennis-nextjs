'use client';

import { CategoryForm, useCategoryForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { CardContent } from '@/shared/components/ui/card';
import { cn, formatDate } from '@/shared/lib';
import { Category } from '@/shared/types/category.types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';



import React from 'react';



import styles from './category-card.module.css';


interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { open, setOpen } = useCategoryForm();
  // const dispatch = useAppDispatch();
  // const categoryDeleting = useAppSelector(selectCategoryDeleting);
  // const handleDelete = async () => {
  //   await dispatch(deleteCategory(category._id)).unwrap();
  // };

  return (
    <Card className={cn(styles.card)}>
      <CardContent className={cn(styles.contentBlock)}>
        <div>
          <h3 className={cn(styles.text)}>{category.name}</h3>
          <small className={'text-muted-foreground'}>
            Добавлено: {formatDate(category.createdAt, 'dd MMM yy, hh:mm')}
          </small>
        </div>

        <div className={'space-x-1 flex items-center'}>
          {/*<Confirm onOk={handleDelete}>*/}
          {/*  <Button size={'sm'}>*/}
          {/*    <TrashIcon />*/}
          {/*  </Button>*/}
          {/*</Confirm>*/}
          <Button className={'w-full xs:w-max'} icon={PencilSquareIcon} onClick={() => setOpen(true)} />
          {open && <CategoryForm open={open} setOpen={setOpen} isEdit categoryId={category._id} />}
        </div>
      </CardContent>

      {/*{categoryDeleting === category._id && (*/}
      {/*  <div className={'w-full h-full absolute bg-zinc-950/20 top-0 left-0 rounded-xl'}>*/}
      {/*    <Loader size={'sm'} absolute />*/}
      {/*  </div>*/}
      {/*)}*/}
    </Card>
  );
};
