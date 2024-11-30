import { Container, MainPageRating, MainTitles, Partners } from '@/shared/components/shared';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Partners />
      <Container>
        <MainPageRating className='mb-24 mt-8 lg:mt-28' />
      </Container>
    </>
  );
}
