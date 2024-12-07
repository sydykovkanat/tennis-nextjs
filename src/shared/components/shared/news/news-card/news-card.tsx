import React, { memo } from 'react';
import { Card } from '@/shared/components/ui';
import { CardContent, CardHeader } from '@/shared/components/ui/card';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { News } from '@/shared/types/news.types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './news-card.module.css';

interface Props {
  news: News;
}

const CardImage = memo(
  React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
    ({ className, src, alt, ...props }, ref) => (
      <Image
        ref={ref}
        src={src ? src : ''}
        alt={alt ? alt : ''}
        className={cn('h-[300px] max-h-[300px] object-cover w-full mb-6 rounded-md', className)}
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
export const NewsCard: React.FC<Props> = React.memo(({ news }) => {
  const { _id, title, subtitle, newsCover, createdAt } = news;

  return (
    <Card className={cn(styles.newsCard)}>
      <Link href={`/news/${_id}`} className={cn(styles.newsLink)}>
        <CardHeader className='p-0'>
          <CardImage src={`${API_URL}/${newsCover}`} alt={title} />
        </CardHeader>
        <CardContent className={cn(styles.newsCardContent)}>
          <div className='me-auto'>
            <h4 className={cn(styles.newsCardSubtitle)}>{subtitle}</h4>
            <h3 className={cn(styles.newsCardTitle)}>{title}</h3>
          </div>
          <span className={cn(styles.newsCardCreatedAt)}>{createdAt}</span>
        </CardContent>
      </Link>
    </Card>
  );
}, arePropsEqual);
