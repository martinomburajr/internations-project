import { AbstractService } from '../../service/service.abstract';
import { FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';
import { Injectable } from '@angular/core';
import { IEntity } from 'app/api/dynamic-library/core-logic/entity/interface/entity.interface';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchService {

    constructor() { }

    searchGeneric<T extends IEntity>(service: AbstractService<T>, searchString: string, query?: FirebaseListFactoryOpts): Observable<{}[]> {
      if(!query) {
        return service.retrieveAllGenericWithQuery((<FirebaseListFactoryOpts>
          {
            query: {
              orderByChild: 'name', 
              startAt: searchString,
              endAt: searchString + "\uf8ff"
            }
        }))
      }else{
        return service.retrieveAllGenericWithQuery(query);
      }
    }

  search = (query: string, isPrivate:boolean, service: AbstractService<any>): Observable<{}[]> => {
    if (!query) {
      return null;
    }
    return service.retrieveAllGenericWithQuery(
      (<FirebaseListFactoryOpts>
          {
            query: {
              orderByChild: 'name', 
              startAt: query,
              endAt: query + "\uf8ff"
            }
      }))
  }
}