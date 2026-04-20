import { Calendar } from '@mantine/dates';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import styled from 'styled-components';
import { Button } from '../../components/button';

export const Container = styled.div`
    display: grid;
    grid-template-columns: 60% 1fr;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    background-color: var(--dark-blue);
    padding: 0 20px;
`;

export const Content = styled.div`
    padding: 20px;
    border-right: 1px solid var(--light);
    height: 100%;
`;

export const InputContainer = styled.div`
 display: flex;
    align-items: center;
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    gap: 20px;
`;

export const InputsGroup = styled.div`
     display: flex;
    align-items: center;
    border-radius: 4px;
    height: 36px;
    padding: 0 10px;
    margin-top: 40px;
    border: 1px solid var(--white);

`;

export const StyledPlusIcon = styled(PlusIcon)`
    height: 24px;
    width: 24px;
    fill: var(--white);
    cursor: pointer;
    margin-right: 8px;

    &:hover {
        fill: var(--info);
        transition: fill 100ms;
    }
`;

export const StyledMinusIcon = styled(MinusIcon)`
    height: 24px;
    width: 24px;
    fill: var(--white);
    cursor: pointer;
    margin-right: 8px;

    &:hover {
        fill: var(--info);
        transition: fill 100ms;
    }
`;

export const Input = styled.input`
    height: 36px;
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--white);
    font-size: 16px;
    padding: 0 5px;

    &::placeholder {
        color: var(--light);
    }
`;

export const Timer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 364px;
    max-height: 364px;
    height: 100%;
    width: 100%;

    border: 3px solid var(--white);
    margin: 0 auto;
    margin-top: 80px;
    border-radius: 999px;

    strong {
        color: var(--white);
    }

    span {
        font-size: 40px;
        font-weight: 600;
        color: var(--white);
    }
`;

export const ButtonGroup = styled.div`
    margin: 0 auto;
    margin-top: 40px;
    width: 100%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    margin-top: 16px;
`;

export const Metrics = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;

    h2{
        color: var(--white);
        font-weight: 600;
        font-size: 24px;
        margin-top: 20px;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    gap: 80px;
    border-bottom: 1px solid var(--light);

`;

export const FocusTimesMetrics = styled.div`

    h2{
        color: var(--white);
        font-weight: 600;
        font-size: 24px;
        margin-top: 20px;
    }
`;

export const TimesList = styled.div`
  margin-top: 20px;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 10px;

  /* scrollbar bonita */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--info);
    border-radius: 4px;
  }
`;

export const TimeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
`;

export const TimeLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const Timeline = styled.div`
  position: absolute;
  left: 11px;
  top: -12px;
  bottom: -12px;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: var(--info);
  border-radius: 50%;
  z-index: 1;
`;

export const TimeText = styled.p`
  color: var(--white);
  font-size: 14px;
`;

export const Duration = styled.span`
  color: var(--light);
  font-size: 14px;
`;

export const CalendarContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const StyledCalendar = styled(Calendar)`
  background-color: transparent;


  & [data-month] {
    gap: 10px;
  }

  & [data-weekday] {
    color: var(--light);
    font-size: 14px;
    text-transform: uppercase;
  }

  & [data-day] {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
