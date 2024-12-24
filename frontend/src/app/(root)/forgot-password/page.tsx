import { Container } from '@/shared/components/shared';
import dynamic from 'next/dynamic';

const ForgotPassword = dynamic(() => import('@/shared/components/shared/forgot-password/forgot-password'), {
  ssr: false,
});

export default function Page() {
  return (
    <Container>
      <ForgotPassword />
    </Container>
  );
}
