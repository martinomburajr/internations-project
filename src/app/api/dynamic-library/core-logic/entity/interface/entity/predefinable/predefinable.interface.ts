import { IPredefinedEntity } from '../predefined/predefined.interface';
import { IEntity } from '../../entity.interface';
export interface IPredefinable<T extends IPredefinedEntity> {
    isPredefined: boolean;
    predefined: string | Array<string>;
    _predefined: Array<T>
}