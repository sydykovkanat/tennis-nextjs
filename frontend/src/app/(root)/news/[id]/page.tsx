'use client';

import { useDialogState } from '@/app/(root)/news/hooks/use-dialog-state';
import { useOneNews } from '@/app/(root)/news/hooks/use-one-news';
import { Container, ImageModal, Loader, NewsCard } from '@/shared/components/shared';
import { API_URL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import DOMPurify from 'dompurify';
import Image from 'next/image';

import React from 'react';

import carouselStyles from './carousel.module.css';
import styles from './one-news.module.css';

export default function Page() {
  const { emblaRef, oneNews, initialIndex, setInitialIndex, news } = useOneNews();
  const { open, toggleOpen } = useDialogState();
  const sanitize = (html: string): string => DOMPurify.sanitize(html);

  const handleImageClick = (index: number) => {
    setInitialIndex(index);
    toggleOpen();
  };

  return (
    <>
      {!oneNews ? (
        <Container className={'d-flex'}>
          <Loader className={'mx-auto'} />
        </Container>
      ) : (
        <Container>
          <div className={cn(styles.titleBlock)}>
            <h1 className={cn(styles.title, 'dark:text-white')}>{oneNews?.title}</h1>
            <h2 className={cn(styles.subtitle)}>{oneNews?.subtitle}</h2>
          </div>

          <section className={oneNews && oneNews.images.length > 0 ? cn(carouselStyles.embla) : 'hidden'}>
            <div className={cn(carouselStyles.emblaViewport)} ref={emblaRef}>
              <div className={cn(carouselStyles.emblaContainer)}>
                {oneNews?.images?.map((imageUrl, index) => (
                  <div className={cn(carouselStyles.emblaSlide)} key={index} onClick={() => handleImageClick(index)}>
                    <Image
                      src={API_URL + '/' + imageUrl}
                      alt={`Slide ${index + 1}`}
                      className={cn(carouselStyles.emblaSlideImage)}
                      width={400}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {oneNews && oneNews.content && (
            <section
              className={cn(styles.content, 'dark:text-white')}
              dangerouslySetInnerHTML={{ __html: sanitize(oneNews.content) }}
            />
          )}

          <section>
            <h3 className={cn(styles.sectionTitle)}>Другие новости</h3>
            <div className={cn(styles.cardContainer)}>
              {news.map((newsItem) => (
                <NewsCard key={newsItem._id} news={newsItem} />
              ))}
            </div>
          </section>

          {oneNews && oneNews.images.length > 0 && (
            <ImageModal images={oneNews.images} open={open} onClose={toggleOpen} initialIndex={initialIndex} />
          )}
        </Container>
      )}
    </>
  );
}
