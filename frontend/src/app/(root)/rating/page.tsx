import { getRatings } from '@/actions/ratings';
import { Container, GradientCircle, MainTitles, Ratings, gradientCircles } from '@/shared/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Рейтинг членов теннисного спорта — Лидеры тенниса Кыргызстана',
  description: 'Рейтинг членов КСЛТ - следите за актуальными датами рейтингов и турниров.',
  keywords: 'Рейтинг членов КСЛТ, Рейтинг по теннису в Кыргызстане, КСЛТ рейтинг',
  openGraph: {
    title: 'Рейтинг членов теннисного спорта — Лидеры тенниса Кыргызстана',
    description: 'Рейтинг членов КСЛТ - следите за актуальными датами рейтингов и турниров.',
    images: 'https://tennis.kg/kslt.svg',
    type: 'website',
  },
};

export default async function Page() {
  const ratings = await getRatings();

  return (
    <Container>
      {gradientCircles.map((circle, id) => (
        <GradientCircle key={id} {...circle} />
      ))}
      <MainTitles
        title={'Рейтинг членов КСЛТ'}
        subtitle={
          'На этой странице вы можете ознакомиться с текущим рейтингом. Рейтинговая система обновляется с каждым рейтинговым турниром. С более подробной информацией о начислении очков, вы можете ознакомиться в разделе "Положение. Таблица начисления рейтинговых очков".'
        }
        titleSize={'small'}
        subtitleSize={'small'}
      />

      <Ratings ratings={ratings} />
    </Container>
  );
}
