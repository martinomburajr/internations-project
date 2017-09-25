import { FirebaseObjectObservable } from 'angularfire2/database';
import { IEntity } from 'app/api/dynamic-library/core-logic/entity/interface/entity.interface';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';
import {AbstractRepository} from 'app/api/dynamic-library/core-logic/repository/repository.abstract';

export interface IService < T extends IEntity > {

    entity: T;

    omniRepository: AbstractRepository<T>;
    
    /**
     * Adds an entity to the database
     * 
     * @param {{}} t 
     * @returns {(firebase.database.ThenableReference | Observable<firebase.Promise<void>>)} 
     * @memberof IService
     */
    create(t: T): Observable<firebase.Promise<void>>

    /**
     * Updates and overwrites an existing path. It wont overwrite existing data, just add to it and overwrite
     * 
     * @param {string} key 
     * @param {T} t 
     * @memberof IService
     */
    update(key : string, t: T): firebase.Promise<void>

    /**
     * Deletes elements from the database
     * 
     * @param {T} obj 
     * @returns {Observable<firebase.Promise<void>>} 
     * 
     * @memberOf IService
     */
    delete(obj: T): Observable<firebase.Promise<void>>

    /**
     * Allows for the search of an observable 
     * 
     * @param {Observable<T[]>} objects$ 
     * @param {string} searchField 
     * @param {string} searchItem 
     * @returns {Observable<{}>} 
     * @memberof IService
     */
    search?(objects$: Observable<T[]>, field:string, value: string): Observable<{}>

    /**
     * Retrieves a single item based on the key
     * 
     * @param {string} key 
     * @memberof IService
     */
    retrieveByKey(key: string): FirebaseObjectObservable<{}>

    /**
     * Retrieves a single item and converts it into the entity based on the key
     * 
     * @param {string} key 
     * @returns {Observable<T>} 
     * @memberof AbstractOmniService
     */
    retrieveByKeyAsEntity(key: string): Observable<T>

    /**
     * Retrieves objects from the database based on supplied keys
     * 
     * @param {Array<string>} key 
     * @memberof IService
     */
    retrieveByKeys(keys: Array<string>): Array<FirebaseObjectObservable<{}>>
    /**
     * Retrieves objects as entities from the database based on supplied keys
     * 
     * @param {Array<string>} key 
     * @memberof IService
     */
    retrieveByKeysAsEntity(key: Array<string>): Observable<T>[]

    retrieveByKeysAsArrayAsEntity(keys: Array<string>): Observable<T[]>

    retrieveByKeysAsArray(keys: Array<string>): Observable<{}[]>

    /**
     * Retrieves by keys with query
     * 
     * @param {Array<string>} keys 
     * @param {string} field 
     * @param {string} value 
     * @returns {Observable<{}[]>} 
     * @memberof IService
     */
    retrieveByKeysWithQuery(keys: Array<string>, field: string, value: string): Observable<{}>[]

    retrieveByKeysWithQueryAsEntity(keys: Array<string>, field: string, value: string): Observable<T>[]
}