import {
  Carousel,
  Container,
  GradientCircle,
  MainPageRating,
  MainTitles,
  NewsMain,
  Partners,
  gradientCircles,
} from '@/shared/components/shared';

import React from 'react';

export default async function HomePage() {
  return (
    <div className='overflow-x-hidden'>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}
      <Container>
        <MainTitles title={'ыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
        <Carousel />
      </Container>
      <Partners />
      <Container>
        <section>
          <MainPageRating className='mb-24 mt-16 md:mt-24 lg:mt-40' />
        </section>
        <section>
          <NewsMain />
        </section>
      </Container>
    </div>
  );
}
