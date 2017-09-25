import { ITimeInfiniteable } from '../time-infiniteable/time-infinite.interface';
export interface ITimeFiniteable extends ITimeInfiniteable {
    endDate: number;
}