import {
  CircleHalfTiltIcon,
  ClockCounterClockwiseIcon,
  ListChecksIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { Link } from 'react-router';
import styled from 'styled-components';

const ClockConter = ClockCounterClockwiseIcon;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 15px 0;
    width: 80px;
    background-color: var(--black-blue);

    img{
    height: 50px;
    width: 50px;
    border-radius: 25px;
    }

  `;

export const LinksContainer = styled.div``;

export const StyledLink = styled(Link)<{ $active?: boolean }>`
text-decoration: none;


svg {
    width: 32px;
    height: 32px;
    fill: ${({ $active }) => ($active ? 'var(--white)' : 'var(--light)')};
    transition: fill 100ms;

    &:hover{
        fill: var(--info);
    }
}
`;

export const StyledListChecksIcon = styled(ListChecksIcon)`
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        fill: var(--white)

`;

export const StyledClockCounterClockwiseIcon = styled(ClockConter)`
        display: flex;
        align-items: center;
        gap: 40px;
        flex-direction: column;
        margin-top: 40px;
`;

export const BottomContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const StyledCircleHalfTiltIcon = styled(CircleHalfTiltIcon)`
margin-bottom: 5px;
width: 32px;
  height: 32px;
  fill: var(--neutral);
  transition: fill 100ms;
  cursor: pointer;

  &:hover {
    fill: var(--light);
  }
`;

export const StyledSignOutIcon = styled(SignOutIcon)`
  width: 32px;
  height: 32px;
  fill: var(--error);
  transition: fill 100ms;
  cursor: pointer;

  &:hover {
    fill: var(--error-hover);
  }
`;
