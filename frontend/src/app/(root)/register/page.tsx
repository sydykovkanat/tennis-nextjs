import { getCategories } from '@/actions/categories';
import { Container, Register } from '@/shared/components/shared';

export default async function Page() {
  const categories = await getCategories();
  return (
    <Container>
      <Register categories={categories} />
    </Container>
  );
}
