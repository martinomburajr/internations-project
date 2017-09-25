import { ITimeSpanable } from './time-span.interface';
import { IDurationable } from './duration.interface';
export interface IUndefinedDurationable extends ITimeSpanable {
    startDate: number;
    endDate: number;
}