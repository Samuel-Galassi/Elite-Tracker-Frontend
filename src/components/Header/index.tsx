import type { HeaderProps } from '../../types/HeaderTypes/index.ts';
import { Container } from './styles.ts';

export const Header = ({ title }: HeaderProps) => {
  return (
    <Container>
      <h1>{title}</h1>
      <span>
        {`Hoje, ${new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'long',
          timeZone: 'America/Sao_Paulo',
        }).format(new Date())}`}
      </span>
    </Container>
  );
};
