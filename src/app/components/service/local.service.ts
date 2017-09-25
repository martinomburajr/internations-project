import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import {IEntity} from 'app/api/dynamic-library/core-logic/entity/interface/entity.interface';

@Injectable()
export class AbstractLocalService<T extends IEntity> {

    Index$: ReplaySubject<number>;
    PageIndex$: ReplaySubject<number>;
    Entitys$: Observable<T[]>;
    EntityStream$?: Observable<T>;

    constructor() {
        this.Index$ = new ReplaySubject<number>(2);
        this.Index$.next(0);
		this.Index$.next(0);
        this.PageIndex$ = new ReplaySubject<number>(2);
        this.PageIndex$.next(0);
		this.PageIndex$.next(0);
        this.Entitys$ = new Observable<T[]>(x=>x);
        this.EntityStream$ = new Observable<T>(x=>x);
    }

    /**
     * Returns the current entity based of the Index. You must explicityl subscribe to obtain the value
     * 
     * @returns {Observable<T>} 
     * @memberof AbstractLocalService
     */
    public retrieveCurrentEntity():Observable<T> {
        return this.Index$.map(index => {
            return this.EntityStream$.elementAt(index)
        }).concatMap(x=>x)
    }

}