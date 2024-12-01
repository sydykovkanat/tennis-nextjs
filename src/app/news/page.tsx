import { fetchNews } from '@/actions/news';
import { Container, CustomPagination, DatePicker, NewsTitle } from '@/shared/components/shared';
import { NewsCard } from '@/shared/components/shared/news/news-card/news-card';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';

import styles from './news.module.css';

interface Props {
  searchParams: { [key: string]: string | null };
}

const Page = async ({ searchParams }: Props) => {
  const queryObj = {
    page: searchParams.page || 1,
    startDate: searchParams.startDate || '',
    endDate: searchParams.endDate || '',
  };

  const validateQuery = deleteEmptyQueryStrings(queryObj);
  const data = { query: validateQuery };
  const newsResponse = await fetchNews({ data });
  const news = newsResponse.data;

  const renderNewsContent = () => {
    if (news.length === 0) {
      return <h2 className='text-center'>На данный момент новостей нету!</h2>;
    }

    return (
      <>
        <div className={cn(styles.newsContainer)}>
          {news.map((newsItem) => (
            <NewsCard key={newsItem._id} news={newsItem} />
          ))}
        </div>
        <CustomPagination total={newsResponse.pages} /></>
    );
  };

  return (
    <Container>
      <NewsTitle />
      <DatePicker />
      {renderNewsContent()}
    </Container>
  );
};

export default Page;
