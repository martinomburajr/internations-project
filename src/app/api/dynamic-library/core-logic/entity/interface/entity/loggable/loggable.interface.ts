import { ICompletable } from '../completable/completable.interface';
export interface ILoggable extends ICompletable {
    startTime: number;
    endTime: number;
}