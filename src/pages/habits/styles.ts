import { Calendar } from '@mantine/dates';
import { PaperPlaneRightIcon, TrashIcon } from '@phosphor-icons/react';
import styled from 'styled-components';

interface HabitProps {
  $isActive?: boolean;
}

export const Container = styled.div`
    display: grid;
    grid-template-columns: 60% 1fr;
    width: 100%;
    height: 100vh;
    background-color: var(--dark-blue);
    padding: 0 20px;

    @media (max-width: 1280px) {
        grid-template-columns: 55% 1fr;
    }
`;

export const Metrics = styled.div`
    padding: 20px;
    overflow-y: auto;

    h2 {
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
    gap: 40px;
    border-bottom: 1px solid var(--light);

    @media (max-width: 1280px) {
        gap: 20px;
        padding: 20px 0;
    }
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
  }
`;
