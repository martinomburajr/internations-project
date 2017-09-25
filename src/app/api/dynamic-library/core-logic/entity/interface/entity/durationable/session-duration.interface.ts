import { ITimeSpanable } from './time-span.interface';
import { IDurationable } from './duration.interface';
export interface ISessionDurationable extends ITimeSpanable {
    startTime: number;
    endTime: number;
}