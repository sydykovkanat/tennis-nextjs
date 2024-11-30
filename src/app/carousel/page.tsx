import { getCarousel } from '@/actions/carousel';
import { Container } from '@/shared/components/shared';
import { BlockCarousel } from '@/shared/components/shared/carousel/carousel';

export default async function Page() {
  const carouselFiles = await getCarousel();
  return (
    <Container>
      <BlockCarousel files={carouselFiles} />
    </Container>
  );
}
