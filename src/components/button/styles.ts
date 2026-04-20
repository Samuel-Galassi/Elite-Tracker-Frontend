import styled, { css } from 'styled-components';

type ContainerProps = {
  $variant?: 'info' | 'error';
  $disabled?: boolean;
};

export const Container = styled.button<ContainerProps>`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--info);
        border: none;
        color: var(--white);
        font-size: 16px;
        height: 36px;
        width: 100%;
        border-radius: 4px;

        transition: background 100ms;

        &:hover {
            background-color: var(--info-hover);
        }

        /* Variante error */
  ${({ $variant }) =>
    $variant === 'error' &&
    css`
      background-color: var(--error);

      &:hover:not(:disabled) {
        background-color: var(--error-hover);
      }
    `}

  /* Estado disabled */
  ${({ $disabled }) =>
    $disabled &&
    css`
      background-color: var(--light);
      cursor: not-allowed;

      &:hover {
        background-color: var(--light);
      }
    `}
`;
