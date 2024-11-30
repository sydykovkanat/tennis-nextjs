import { Blogs, Container } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';

export default function Page() {
  return (
    <Container>
      <MainTitles title={'Свежие и интересные новости'} subtitle={'НАШ БЛОГ'} />
      <Blogs />
    </Container>
  );
}
