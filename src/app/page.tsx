import { Carousel, Container, Partners } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';
import { Container, MainPageRating, MainTitles, Partners } from '@/shared/components/shared';

import React from 'react';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Carousel />
      <Partners />
      <Container>
        <MainPageRating className='mb-24 mt-8 lg:mt-28' />
      </Container>
    </>
  );
}
