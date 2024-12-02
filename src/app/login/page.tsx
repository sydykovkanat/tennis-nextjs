import { Container } from '@/shared/components/shared';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/shared/components/shared/auth/login'), { ssr: false });

export default function Page() {
  return (
    <Container className={'grid place-items-center h-screen'}>
      <Login />
    </Container>
  );
}
