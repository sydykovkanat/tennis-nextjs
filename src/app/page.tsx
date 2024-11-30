import { Container, Partners } from '@/shared/components/shared';
import { MainTitles } from '@/shared/components/shared/main-titles/main-titles';

export default async function Page() {
  return (
    <>
      <Container>
        <MainTitles />
      </Container>
      <Partners />
    </>
  );
}
