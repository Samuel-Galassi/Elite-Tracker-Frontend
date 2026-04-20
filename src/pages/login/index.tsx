import { Button } from '../../components/button';
import { api } from '../../services/api';
import { Container, Content, GitHubIcon } from './styles';

export function Login() {
  const HandleAuth = async () => {
    const { data } = await api.get('/auth');

    window.location.href = data.redirectUrl;
  };

  return (
    <Container>
      <Content>
        <h1>entre com</h1>
        <Button onClick={HandleAuth}>
          <GitHubIcon />
          GitHub
        </Button>
        <p>
          Ao entrar, eu concordo com o <span>Termos de Serviço</span> e{' '}
          <span>Política de Privacidade.</span>
        </p>
      </Content>
    </Container>
  );
}
