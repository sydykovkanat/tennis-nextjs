import { fetchNewsByLimit, fetchOneNews } from '@/actions/news';
import { News } from '@/shared/types/news.types';
import useEmblaCarousel from 'embla-carousel-react';
import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export const useOneNews = () => {
  const { id } = useParams<{ id: string }>();
  const [oneNews, setOneNews] = useState<News>();
  const [news, setNews] = useState<News[]>([]);
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true });
  const [initialIndex, setInitialIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const oneNewsData = await fetchOneNews(id);
        const newsResponse = await fetchNewsByLimit({ limit: 4, excludeId: id });
        setOneNews(oneNewsData);
        setNews(newsResponse.data);
      }
    };

    void fetchData();
  }, [id]);
  return {
    emblaRef,
    oneNews,
    news,
    initialIndex,
    setInitialIndex,
  };
};
