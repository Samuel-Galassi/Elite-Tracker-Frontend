// biome-ignore assist/source/organizeImports: imports are already organized with command: npx biome check . --write
import { Container } from './styles.ts';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { UseUser } from '../../hooks/use-user.tsx';

export const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getUserInfo } = UseUser();

  const handleAuth = async () => {
    await getUserInfo(String(searchParams.get('code')));

    navigate('/');
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: getUserInfo is only used in this useEffect, so it doesn't need to be added to the dependencies array
  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <Container>
      <h1>Carregando...</h1>
    </Container>
  );
};
