import { AbstractService } from '../../../../api/dynamic-library/core-logic/service/service.abstract';
import {IEntity} from 'app/api/dynamic-library/core-logic/entity/interface/entity.interface';

export interface ISearchBarable {
    debounce: number;
    service: AbstractService<IEntity>
    action: Function
}