import { Container, Partners } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';
import { MainPageRating } from '@/shared/components/shared/rating-members/main-page-rating/main-page-rating';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Partners />
      <MainPageRating className='mb-24' />
    </>
  );
}
