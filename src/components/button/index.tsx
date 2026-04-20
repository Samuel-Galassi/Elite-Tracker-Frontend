import type { ComponentProps } from 'react';
import { Container } from './styles';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'info' | 'error';
};

export function Button({
  children,
  disabled,
  variant = 'info',
  ...props
}: ButtonProps) {
  return (
    <Container
      {...props}
      $variant={variant}
      $disabled={disabled}
      disabled={disabled}
    >
      {children}
    </Container>
  );
}
