import type { InfoProps } from '../../types/InfoTypes';
import { Container } from './styles';

export const Info = ({ value, label }: InfoProps) => {
  return (
    <Container>
      <strong>{value}</strong>
      <span>{label}</span>
    </Container>
  );
};
