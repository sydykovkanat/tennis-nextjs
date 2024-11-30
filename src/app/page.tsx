import { Container, NewsMain, Partners } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';
import Link from 'next/link';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles title={'Кыргызстанское сообщество любителей тенниса'} subtitle={'Искусство становиться первым!'} />
      </Container>
      <Partners />
      <Container>
        <section className='mt-10'>
          <NewsMain />
        </section>
      </Container>
      <Link href={'/news'}>News</Link>
    </>
  );
}
