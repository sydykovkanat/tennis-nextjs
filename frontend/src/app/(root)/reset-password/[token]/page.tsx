import { Container } from '@/shared/components/shared';
import dynamic from 'next/dynamic';

const ResetPassword = dynamic(() => import('@/shared/components/shared/reset-password/reset-password'), {
  ssr: false,
});

export default function Page() {
  return (
    <Container>
      <ResetPassword />
    </Container>
  );
}
