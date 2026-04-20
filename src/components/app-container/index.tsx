import type { AppContainerProps } from '../../types/AppTypes/app';
import { Container } from './styles';

export const AppContainer = ({ children }: AppContainerProps) => {
  return <Container>{children}</Container>;
};
