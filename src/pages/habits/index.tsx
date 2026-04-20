import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { Info } from '../../components/info';
import { api } from '../../services/api';
import type { HabitMetrics, HabitTypes } from '../../types/HabitTypes/habit';
import {
  CalendarContainer,
  Container,
  Content,
  Habit,
  HabitsList,
  Icons,
  InfoContainer,
  Input,
  InputContainer,
  Metrics,
  PaperPlaneRightIconStyled,
  StyledCalendar,
  TrashIconStyled,
} from './styles';

dayjs.extend(updateLocale);

dayjs.updateLocale('pt-br', {
  weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
});

export const Habits = () => {
  const [habits, setHabits] = useState<HabitTypes[]>([]);
  const [metrics, setMetrics] = useState<HabitMetrics>({} as HabitMetrics);
  const [selectedHabit, setSelectedHabit] = useState<HabitTypes | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const today = dayjs().startOf('day');

  const metricsInfo = useMemo(() => {
    const numberOfMonthDays = today.endOf('month').get('date');
    const numberOfDaysCompleted = metrics?.completedDates
      ? metrics.completedDates.length
      : 0;

    const completedDatesPerMonth = `${numberOfDaysCompleted}/${numberOfMonthDays}`;

    const completedMonthPercentage = `${Math.round(
      (numberOfDaysCompleted / numberOfMonthDays) * 100,
    )}%`;

    return { completedDatesPerMonth, completedMonthPercentage };
  }, [metrics, today]);

  const handleSelectHabit = async (habit: HabitTypes, currentMonth?: Date) => {
    setSelectedHabit(habit);

    const { data } = await api.get<HabitMetrics>(
      `/habits/${habit._id}/metrics`,
      {
        params: {
          date: currentMonth
            ? currentMonth.toISOString()
            : today.startOf('month').toISOString(), // Enviar a data do mês atual para o backend
        },
      },
    );

    setMetrics(data);
  };

  const LoadHabits = async () => {
    const { data } = await api.get<HabitTypes[]>('/habits');

    setHabits(data);
  };

  const handleSubmit = async () => {
    const name = nameInput.current?.value?.trim();

    if (!name) return;

    await api.post('/habits', { name });

    if (nameInput.current) {
      nameInput.current.value = '';

      await LoadHabits();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleToggle = async (Habit: HabitTypes) => {
    await api.patch(`/habits/${Habit._id}/toggle`);

    await LoadHabits();
    await handleSelectHabit(Habit);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/habits/${id}`);

    setMetrics({} as HabitMetrics);
    setSelectedHabit(null);

    await LoadHabits();
  };

  const handleSelectMonth = async (date: string | Date) => {
    // biome-ignore lint/style/noNonNullAssertion: selectedHabit is guaranteed to be not null when this function is called
    await handleSelectHabit(selectedHabit!, new Date(date));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: LoadHabits is only used in this useEffect, so it doesn't need to be added to the dependencies array
  useEffect(() => {
    LoadHabits();
  }, []);

  return (
    <Container>
      <Content>
        <Header title="Hábitos" />
        <InputContainer>
          <Input
            ref={nameInput}
            type="text"
            placeholder="Adicione um novo hábito..."
            onKeyDown={handleKeyDown}
          />
          <PaperPlaneRightIconStyled onClick={handleSubmit} />
        </InputContainer>
        <HabitsList>
          {habits.map((habit) => (
            <Habit key={habit._id} $isActive={habit._id === selectedHabit?._id}>
              {' '}
              {/* key deve estar no elemento do map */}
              {/** biome-ignore lint/a11y/useKeyWithClickEvents: this function is right */}
              <p onClick={async () => await handleSelectHabit(habit)}>
                {habit.name}
              </p>
              <Icons>
                <input
                  type="checkbox"
                  checked={(habit.completedDates as unknown as string[]).some(
                    (date) => dayjs(date).isSame(today, 'day'),
                  )}
                  onChange={() => handleToggle(habit)}
                />
                <TrashIconStyled
                  onClick={async () => await handleDelete(habit._id)}
                />
              </Icons>
            </Habit>
          ))}
        </HabitsList>
      </Content>
      {selectedHabit && (
        <Metrics>
          <h2>{selectedHabit.name}</h2>

          <InfoContainer>
            <Info
              value={metricsInfo.completedDatesPerMonth}
              label="Dias concluídos"
            />
            <Info
              value={metricsInfo.completedMonthPercentage}
              label="Porcentagem"
            />
          </InfoContainer>

          <CalendarContainer>
            <StyledCalendar
              locale="pt-br"
              weekdayFormat="ddd"
              onMonthSelect={handleSelectMonth}
              onNextMonth={handleSelectMonth}
              onPreviousMonth={handleSelectMonth}
              size="xl"
              static
              renderDay={(date: string | Date) => {
                const dateObj = new Date(date);
                const day = dayjs(dateObj).date();
                const isToday = dayjs(dateObj).isSame(today, 'day');

                const isCompleted = metrics?.completedDates?.some((d) =>
                  dayjs(d).isSame(dateObj, 'day'),
                );

                const getBackground = () => {
                  if (isToday) return 'var(--info-hover)';
                  if (isCompleted) return 'var(--info)';
                  return 'var(--dark-light-blue)';
                };

                return (
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: getBackground(),
                      color: 'white',
                      fontWeight: 500,
                      outline: isToday ? '2px solid var(--info)' : 'none',
                      outlineOffset: '2px',
                    }}
                  >
                    {day}
                  </div>
                );
              }}
            />
          </CalendarContainer>
        </Metrics>
      )}
    </Container>
  );
};
