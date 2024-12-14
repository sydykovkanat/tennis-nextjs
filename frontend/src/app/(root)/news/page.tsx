import { fetchNews } from '@/actions/news';
import { renderNewsContent } from '@/app/(root)/news/hooks/render-news';
import { Container, NewsTitle } from '@/shared/components/shared';
import { deleteEmptyQueryStrings } from '@/shared/lib';
import { NewsResponse } from '@/shared/types/news.types';

interface Props {
  searchParams?: { [key: string]: string | null };
}

const NewsPage = async ({ searchParams }: Props) => {
  let queryObj;
  if (searchParams) {
    queryObj = {
      page: searchParams.page || 1,
      startDate: searchParams.startDate || '',
      endDate: searchParams.endDate || '',
    };
  }

  const validateQuery = queryObj && deleteEmptyQueryStrings(queryObj);
  const data = { query: validateQuery };
  const newsResponse: NewsResponse = await fetchNews({ data });
  const news = newsResponse.data;

  return (
    <Container>
      <NewsTitle />
      {renderNewsContent({ news: news, pages: newsResponse.pages })}
    </Container>
  );
};

export default NewsPage;