import { Container } from '@/shared/components/shared';
import { Partners } from '@/shared/components/shared/partners/partners';
import { MainPageRating } from '@/shared/components/shared/rating-members/main-page-rating/main-page-rating';

export default async function Page() {
  return (
    <Container>
      <Partners className='mb-8 lg:mb-28' />
      <MainPageRating className='mb-24' />
    </Container>
  );
}
