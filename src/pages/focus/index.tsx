import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = 'America/Sao_Paulo';

import { ClockIcon } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { Header } from '../../components/Header';
import { Info } from '../../components/info';
import { api } from '../../services/api';
import {
  type FocusMetrics,
  type FocusTime,
  TimerState,
  type TimerTypes,
} from '../../types/FocusTypes';
import {
  ButtonGroup,
  CalendarContainer,
  Container,
  Content,
  Dot,
  Duration,
  FocusTimesMetrics,
  InfoContainer,
  Input,
  InputContainer,
  InputsGroup,
  Metrics,
  StyledButton,
  StyledCalendar,
  StyledMinusIcon,
  StyledPlusIcon,
  TimeItem,
  TimeLeft,
  Timeline,
  Timer,
  TimesList,
  TimeText,
} from './styles';

const timerStateTitle = {
  [TimerState.PAUSED]: 'Pausado',
  [TimerState.FOCUS]: 'Em Foco',
  [TimerState.REST]: 'Em Descanso',
};

export const Focus = () => {
  const focusInput = useRef<HTMLInputElement>(null);
  const restInput = useRef<HTMLInputElement>(null);
  const [timers, setTimers] = useState<TimerTypes>({ focus: 0, rest: 0 });
  const [timerState, setTimerState] = useState<TimerState>(TimerState.PAUSED);
  const [timeFrom, setTimeFrom] = useState<dayjs.Dayjs | null>(null);
  const [focusMetrics, setFocusMetrics] = useState<FocusMetrics[]>([]);
  const [focusTimes, setFocusTimes] = useState<FocusTime[]>([]);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(
    dayjs().tz(TZ).startOf('month'),
  );
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs().tz(TZ).startOf('day'),
  );

  const AddSeconds = (date: dayjs.Dayjs, seconds: number) => {
    return date.add(seconds, 'seconds');
  };

  const handleStart = () => {
    focusTimer.pause();
    const now = dayjs().tz(TZ);

    focusTimer.restart(AddSeconds(now, timers.focus * 60).toDate());
    setTimeFrom(now);
  };

  const handleEnd = async () => {
    focusTimer.pause();

    if (!timeFrom) return;

    await api.post('focus-time', {
      timeFrom: timeFrom.utc().toISOString(),
      timeTo: dayjs().utc().toISOString(),
    });

    setTimeFrom(null);
  };

  const focusTimer = useTimer({
    expiryTimestamp: new Date(),
    onExpire: async () => {
      if (timerState !== TimerState.PAUSED) {
        await handleEnd();
      }
    },
  });

  const restTimer = useTimer({
    expiryTimestamp: new Date(),
  });

  const handleAddMinutes = (type: 'focus' | 'rest') => {
    if (type === 'focus') {
      const currentValue = Number(focusInput.current?.value);
      const value = currentValue + 5;

      if (focusInput.current) {
        focusInput.current.value = String(value);

        setTimers((old) => ({
          ...old,
          focus: value,
        }));
      }
      return;
    }
    const currentValue = Number(restInput.current?.value);
    const value = currentValue + 5;

    if (restInput.current) {
      restInput.current.value = String(value);

      setTimers((old) => ({
        ...old,
        rest: value,
      }));
    }
    return;
  };

  const HandleSubtractMinute = (type: 'focus' | 'rest') => {
    if (type === 'focus') {
      const currentValue = Number(focusInput.current?.value);

      if (currentValue <= 5) {
        if (focusInput.current) {
          focusInput.current.value = ''; // ← Limpa, mostra placeholder
        }
        setTimers((old) => ({ ...old, focus: 0 }));
        return;
      }

      if (focusInput.current) {
        const value = currentValue - 5;
        focusInput.current.value = String(value);

        setTimers((old) => ({
          ...old,
          focus: value,
        }));
      }
      return;
    }
    const currentValue = Number(restInput.current?.value);

    if (currentValue <= 5) {
      if (restInput.current) {
        restInput.current.value = ''; // ← Limpa, mostra placeholder
      }
      setTimers((old) => ({ ...old, rest: 0 }));
      return;
    }

    if (restInput.current) {
      const value = currentValue - 5;
      restInput.current.value = String(value);

      setTimers((old) => ({
        ...old,
        rest: value,
      }));
    }
    return;
  };

  const handleCancel = () => {
    setTimers({
      focus: 0,
      rest: 0,
    });

    setTimerState(TimerState.PAUSED);

    if (focusInput.current) {
      focusInput.current.value = '';
    }
    if (restInput.current) {
      restInput.current.value = '';
    }
  };

  const handleFocus = () => {
    if (timers.focus <= 0 || timers.rest <= 0) return;

    handleStart();

    setTimerState(TimerState.FOCUS);
  };

  const handleRest = async () => {
    if (timers.focus <= 0 || timers.rest <= 0) return;

    await handleEnd();
    const now = dayjs().tz(TZ);

    restTimer.restart(AddSeconds(now, timers.rest * 60).toDate());

    setTimerState(TimerState.REST);
  };

  const handleResume = () => {
    if (timers.focus <= 0 || timers.rest <= 0) return;

    handleStart();
    setTimerState(TimerState.FOCUS);
  };

  const loadFocusMetrics = async (currentMonth: string) => {
    const { data } = await api.get<FocusMetrics[]>('/focus-time/metrics', {
      params: {
        date: currentMonth,
      },
    });

    setFocusMetrics(data);
  };

  const MetricsInfoByDay = useMemo(() => {
    if (!Array.isArray(focusTimes)) {
      return {
        timesMetrics: [],
        totalTimeInMinutes: 0,
      };
    }
    const timesMetrics = focusTimes.map((item) => ({
      timeFrom: dayjs.utc(item.timeFrom).tz(TZ),
      timeTo: dayjs.utc(item.timeTo).tz(TZ),
    }));

    let totalTimeInMinutes = 0;

    if (timesMetrics.length) {
      for (const { timeFrom, timeTo } of timesMetrics) {
        const diff = timeTo.diff(timeFrom, 'minute');

        totalTimeInMinutes += diff;
      }
    }

    return {
      timesMetrics,
      totalTimeInMinutes,
    };
  }, [focusTimes]);

  const MetricsInfoByMonth = useMemo(() => {
    const completedDates: string[] = [];
    let counter: number = 0;

    if (focusMetrics.length) {
      focusMetrics.forEach((item) => {
        const date = dayjs(`${item._id[0]}-${item._id[1]}-${item._id[2]}`)
          .startOf('day')
          .format('YYYY-MM-DD');

        completedDates.push(date);

        counter += item.count;
      });
    }

    return {
      completedDates,
      counter,
    };
  }, [focusMetrics]);

  const loadFocusTimes = async (currentDate: string) => {
    try {
      const { data } = await api.get<FocusTime[]>('/focus-time', {
        params: { date: currentDate },
      });

      setFocusTimes(Array.isArray(data) ? data : []);
      // biome-ignore lint/correctness/noUnusedVariables: the catch block is necessary to handle potential errors from the API call, ensuring that the application remains stable even if the request fails or returns unexpected data
    } catch (error) {
      setFocusTimes([]); // fallback seguro
    }
  };

  const handleSelectMonth = (date: string) => {
    setCurrentMonth(dayjs.tz(date, TZ).startOf('month'));
  };
  const handleSelectDay = (date: Date | string) => {
    setCurrentDate(dayjs(date).local().startOf('day'));
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: loadFocusMetrics is only used in this useEffect, so it doesn't need to be added to the dependencies array
  useEffect(() => {
    loadFocusMetrics(currentMonth.format('YYYY-MM-DD'));
  }, [currentMonth]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: loadFocusTimes is only used in this useEffect, so it doesn't need to be added to the dependencies array
  useEffect(() => {
    loadFocusTimes(currentDate.format('YYYY-MM-DD'));
  }, [currentDate]);

  return (
    <Container>
      <Content>
        <Header title="Tempo de Foco" />
        <InputContainer>
          <InputsGroup>
            <StyledMinusIcon onClick={() => HandleSubtractMinute('focus')} />
            <StyledPlusIcon onClick={() => handleAddMinutes('focus')} />
            <Input
              ref={focusInput}
              type="number"
              placeholder="Tempo de foco"
              disabled
            />
          </InputsGroup>
          <InputsGroup>
            <StyledMinusIcon onClick={() => HandleSubtractMinute('rest')} />
            <StyledPlusIcon onClick={() => handleAddMinutes('rest')} />
            <Input
              ref={restInput}
              type="number"
              placeholder="Tempo de descanso"
              disabled
            />
          </InputsGroup>
        </InputContainer>
        <Timer>
          <strong>{timerStateTitle[timerState]}</strong>

          {timerState === TimerState.PAUSED && (
            <span>{`${String(timers.focus).padStart(2, '0')}:00`}</span>
          )}

          {timerState === TimerState.FOCUS && (
            <span>{`${String(focusTimer.minutes).padStart(2, '0')}:${String(focusTimer.seconds).padStart(2, '0')}`}</span>
          )}
          {timerState === TimerState.REST && (
            <span>{`${String(restTimer.minutes).padStart(2, '0')}:${String(restTimer.seconds).padStart(2, '0')}`}</span>
          )}
        </Timer>
        <ButtonGroup>
          {timerState === TimerState.PAUSED && (
            <StyledButton
              onClick={handleFocus}
              disabled={timers.focus <= 0 || timers.rest <= 0}
            >
              Começar
            </StyledButton>
          )}
          {timerState === TimerState.FOCUS && (
            <StyledButton onClick={handleRest}>Iniciar Descanso</StyledButton>
          )}
          {timerState === TimerState.REST && (
            <StyledButton onClick={handleResume}>Retomar</StyledButton>
          )}
          <StyledButton variant="error" onClick={handleCancel}>
            Cancelar
          </StyledButton>
        </ButtonGroup>
      </Content>
      <Metrics>
        <h2>Estatísticas</h2>

        <InfoContainer>
          <Info
            value={String(MetricsInfoByMonth.counter)}
            label="Ciclos Totais"
          />
          <Info
            value={`${MetricsInfoByDay.totalTimeInMinutes} minutos`}
            label="Tempo total de foco"
          />
        </InfoContainer>
        <FocusTimesMetrics>
          <h2>{currentDate.locale('pt-br').format('D [de] MMMM')}</h2>
          <TimesList>
            {MetricsInfoByDay.timesMetrics.slice(0, 3).map((item, index) => {
              const duration = item.timeTo.diff(item.timeFrom, 'minute');

              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: index already is a key and the order of items won't change, because it's based on time
                <TimeItem key={index}>
                  <TimeLeft>
                    <Timeline />
                    <Dot />
                    <ClockIcon size={18} color="var(--info)" />

                    <TimeText>
                      {item.timeFrom.format('HH:mm')} -{' '}
                      {item.timeTo.format('HH:mm')}
                    </TimeText>
                  </TimeLeft>

                  <Duration>{duration} minutos</Duration>
                </TimeItem>
              );
            })}
          </TimesList>
        </FocusTimesMetrics>

        <CalendarContainer>
          <StyledCalendar
            getDayProps={(date) => ({
              selected: dayjs(date).local().isSame(currentDate, 'day'),
              onClick: () => handleSelectDay(date),
            })}
            locale="pt-br"
            weekdayFormat="ddd"
            onMonthSelect={(date) =>
              handleSelectMonth(
                typeof date === 'string'
                  ? date
                  : dayjs.tz(date, TZ).toISOString(),
              )
            }
            onNextMonth={(date) =>
              handleSelectMonth(
                typeof date === 'string'
                  ? date
                  : dayjs.tz(date, TZ).toISOString(),
              )
            }
            onPreviousMonth={(date) =>
              handleSelectMonth(
                typeof date === 'string'
                  ? date
                  : dayjs.tz(date, TZ).toISOString(),
              )
            }
            size="lg"
            renderDay={(date: string | Date) => {
              const day = dayjs(date).local().date();
              const dateStr = dayjs(date).local().format('YYYY-MM-DD');

              const isCompleted = MetricsInfoByMonth.completedDates.some(
                (d) => d === dateStr,
              );
              const isSelected = dayjs(date).local().isSame(currentDate, 'day');

              const getBackground = () => {
                if (isSelected) return 'var(--info)';
                if (isCompleted) return 'var(--info-hover)';
                return 'var(--dark-light-blue)';
              };

              return (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: getBackground(),
                    color: 'white',
                    fontWeight: 500,
                    outline: isSelected ? '2px solid var(--info)' : 'none',
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
    </Container>
  );
};
