'use client';

import { Confirm, useNewsCard, useNewsForm } from '@/shared/components/shared';
import { NewsForm } from '@/shared/components/shared/news/admin/news-form';
import { Button, Card } from '@/shared/components/ui';
import { CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { News } from '@/shared/types/news.types';
import { Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React, { memo } from 'react';

import styles from './news-card.module.css';

interface Props {
  news: News;
  isAdmin?: boolean;
}

const CardImage = memo(
  React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
    ({ className, src, alt, ...props }, ref) => (
      <Image
        ref={ref}
        src={src ? src : ''}
        alt={alt ? alt : ''}
        className={cn(styles.newsCardImage, className)}
        {...props}
        width={500}
        height={500}
      />
    ),
  ),
);
CardImage.displayName = 'CardImage';

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return (
    prevProps.news._id === nextProps.news._id &&
    prevProps.news.title === nextProps.news.title &&
    prevProps.news.subtitle === nextProps.news.subtitle &&
    prevProps.news.newsCover === nextProps.news.newsCover &&
    prevProps.news.createdAt === nextProps.news.createdAt
  );
};

// eslint-disable-next-line react/display-name
export const NewsCard: React.FC<Props> = React.memo(({ news, isAdmin }) => {
  const { _id, title, subtitle, newsCover, createdAt } = news;
  const { open, toggleOpen } = useNewsForm();
  const { newsRemoving, handleRemove } = useNewsCard(_id);

  return (
    <Card className={cn(styles.newsCard)}>
      <Link href={`/news/${_id}`} className={cn(styles.newsLink)}>
        <CardHeader className='p-0'>
          <CardImage src={`${API_URL}/${newsCover}`} alt={title} />
        </CardHeader>
        <CardContent className={cn(styles.newsCardContent)}>
          <div className={styles.newsCardContentInner}>
            <h4 className={cn(styles.newsCardSubtitle, 'dark:text-[#bdbdbd]')} title={subtitle}>
              {subtitle}
            </h4>
            <span className={cn(styles.newsCardCreatedAt, 'dark:text-tn-green')}>{createdAt}</span>
          </div>
          <h3 className={cn(styles.newsCardTitle, 'dark:text-gray-100')}>{title}</h3>
        </CardContent>
      </Link>
      {isAdmin && (
        <CardFooter className={cn(styles.newsCardFooter)}>
          <Confirm onOk={handleRemove}>
            <Button size='lg' disabled={newsRemoving === _id} icon={Trash} aria-label={'delete-news'} />
          </Confirm>

          <Button size='lg' icon={Pencil} onClick={toggleOpen} aria-label={'edit-news'} />
          {open && <NewsForm isEdit newsId={_id} open={open} setOpen={toggleOpen} />}
        </CardFooter>
      )}
    </Card>
  );
}, arePropsEqual);
