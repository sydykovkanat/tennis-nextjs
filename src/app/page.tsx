import { Container, Partners } from '@/shared/components/shared';
import ServerCarousel from '@/shared/components/shared/carousel/server-carousel';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <ServerCarousel />
      <Partners />
    </>
  );
}
