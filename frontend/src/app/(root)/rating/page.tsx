import { getRatings } from '@/actions/ratings';
import { Container, MainTitles, Ratings } from '@/shared/components/shared';

export default async function Page() {
  const ratings = await getRatings();

  return (
    <Container>
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
