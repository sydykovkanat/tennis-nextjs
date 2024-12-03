import { Carousel, Container, MainPageRating, MainTitles, NewsMain, Partners } from '@/shared/components/shared';
import {
  Carousel,
  Container,
  GradientCircle,
  MainPageRating,
  MainTitles,
  Partners,
  gradientCircles,
} from '@/shared/components/shared';

import React from 'react';

export default async function Page() {
  return (
    <>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Carousel />
      <Partners />
      <Container>
        <section>
          <MainPageRating className='mb-24 mt-8 lg:mt-28' />
        </section>
        <section>
          <NewsMain />
        </section>
      </Container>
    </>
  );
}
