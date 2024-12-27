import { getCategories } from '@/actions/categories';
import { Container, Register } from '@/shared/components/shared';

export const revalidate = 10;

export default async function Page() {
  const categories = await getCategories();
  return (
    <Container>
      <Register categories={categories} />
    </Container>
  );
}
