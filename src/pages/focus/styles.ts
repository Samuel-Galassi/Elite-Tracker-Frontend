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

    @media (max-width: 1280px) {
        grid-template-columns: 55% 1fr;
    }
`;

export const Content = styled.div`
    padding: 20px;
    border-right: 1px solid var(--light);
    height: 100%;
    overflow-y: auto;
`;

export const Timer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 280px;
    max-height: 280px;
    height: 100%;
    width: 100%;
    border: 3px solid var(--white);
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 999px;

    @media (max-width: 1280px) {
        max-width: 220px;
        max-height: 220px;
    }

    strong { color: var(--white); }
    span {
        font-size: 40px;
        font-weight: 600;
        color: var(--white);

        @media (max-width: 1280px) {
            font-size: 32px;
        }
    }
`;

export const Metrics = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    h2 {
        color: var(--white);
        font-weight: 600;
        font-size: 20px;
        margin-top: 12px;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    gap: 40px;
    border-bottom: 1px solid var(--light);

    @media (max-width: 1280px) {
        gap: 20px;
    }
`;

export const CalendarContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    flex-shrink: 0;
`;

export const StyledCalendar = styled(Calendar)`
  background-color: transparent;

  & [data-month] {
    gap: 4px;
  }

  & [data-weekday] {
    color: var(--light);
    font-size: 12px;
    text-transform: uppercase;
  }

  & [data-day] {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1280px) {
        width: 28px;
        height: 28px;
    }
  }
`;
