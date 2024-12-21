import { CustomPagination, DatePicker, NewsCard } from '@/shared/components/shared';
import { cn } from '@/shared/lib';
import { News } from '@/shared/types/news.types';
import styles from '@/app/(root)/news/news.module.css';

interface Props {
  news: News[];
  pages: number;
  isAdmin?: boolean;
}

export const renderNewsContent = ({ news, pages, isAdmin }: Props) => {
  if (news.length === 0) {
    return <h2 className='text-center'>На данный момент новостей нету!</h2>;
  }

  return (
    <>
      <DatePicker />
      <div className={cn(styles.newsContainer)}>
        {news.map((newsItem) => (
          <NewsCard key={newsItem._id} news={newsItem} isAdmin={isAdmin} />
        ))}
      </div>
      <CustomPagination total={pages} />
    </>
  );
};
