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

export const Content = styled.div`
    padding: 20px;
    border-right: 1px solid var(--light);
    height: 100%;
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 4px;
    height: 36px;
    padding: 0 10px;
    margin-top: 40px;
    border: 1px solid var(--white);
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

export const PaperPlaneRightIconStyled = styled(PaperPlaneRightIcon)`
    height: 24px;
    width: 24px;
    fill: var(--white);
    cursor: pointer;

    &:hover {
        fill: var(--habit-hover);
        transition: fill 100ms;
    }
`;

export const TrashIconStyled = styled(TrashIcon)`
    color: var(--white);
    height: 20px;
    width: 20px;
    margin-right: 5px;
    cursor: pointer;
    transition: color 100ms;

    &:hover {
        color: var(--error);
    }
`;

export const HabitsList = styled.div`
    margin-top: 40px;
`;

export const Habit = styled.div<HabitProps>`
    display: flex;
    align-items: center;
    height: 46px;
    border-bottom: 1px solid var(--light);
    justify-content: space-between;
    transition: background-color 100ms;
    background-color: ${(props) => (props.$isActive ? 'var(--habit-active)' : 'transparent')};

    &:hover {
        background-color: var(--habit-hover);
    }

    p {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        color: var(--white);
        font-size: 16px;
        cursor: pointer;
    }
`;

export const Icons = styled.div`
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid var(--white);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 150ms;

        &:checked {
            background-color: var(--habit-hover);
            border-color: var(--habit-hover);
        }

        &:checked::after {
            content: '✔';
            font-size: 12px;
            color: white;
        }
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

export const CalendarContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
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
