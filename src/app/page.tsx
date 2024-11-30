import { Carousel, Container, Partners } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';

import React from 'react';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Carousel />
      <Partners />
    </>
  );
}
