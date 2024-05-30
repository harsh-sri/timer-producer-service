import { TimerStatus } from 'src/common/enums/timer-status.enum';

// TODO: As an improvement we can also return few more parameters like timezone, usedId etc
export interface ITimerRequestPayload {
  timerId: string;
  webhookUrl?: string;
  timerStatus: TimerStatus;
  expiryTime?: Date;
  createdAt?: Date;
}

export interface ITimerResponse {
  timerId: string;
  timerStatus: TimerStatus;
  timeLeft: number;
}
