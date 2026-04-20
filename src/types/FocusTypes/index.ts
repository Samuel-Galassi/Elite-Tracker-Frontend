export type TimerTypes = {
  focus: number;
  rest: number;
};

export const TimerState = {
  PAUSED: 'PAUSED',
  FOCUS: 'FOCUS',
  REST: 'REST',
} as const;

export type FocusMetrics = {
  _id: [number, number, number];
  count: number;
};

export type FocusTime = {
  _id: string;
  timeFrom: string;
  timeTo: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TimerState = (typeof TimerState)[keyof typeof TimerState];
// Resultado: 'PAUSED' | 'FOCUS' | 'REST'
