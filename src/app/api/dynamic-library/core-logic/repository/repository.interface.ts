import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { IEntity } from "app/api/dynamic-library/core-logic/entity/interface/entity.interface";

export interface IRepository<T extends IEntity> {
    /**
     * Stores an element in the database, using multipath updates
     * 
     * @param {{}} t 
     * @memberof IRepository
     */
    create(t: {}, ...y : Array<{}>): Observable<firebase.Promise<void>>;

    /**
     * Cleans an entity into an object appropriate for database storage
     * 
     * @param {T} t 
     * @param {...Array<{}>} y 
     * @returns {{}} 
     * @memberof IRepository
     */
    purge(t: T, ...y: Array<{}>): {}


    /**
     * Removes an object from the database using multipath updates
     *
     * @param {string} key
     * @param {any} parentKeys
     * @memberof IRepository
     */
    delete(path: {}): Observable<firebase.Promise<void>>

    /**
     * updates an object from the database without using multipath updates
     * 
     * @param {string} key 
     * @param {{}} object 
     * @memberof IRepository
     */
    update(path: {}, object: {}): Promise<void>;

    /**
     * Provides a customizable update path
     * 
     * @param {string} path 
     * @param {Object} object 
     * @param {string} [key] 
     * @memberof IRepository
     */
    updateWithPath(path: string, object: Object, key?: string): Promise<void>

    /**
     * Returns an object from the database using the key as a reference
     * 
     * @param {string} key 
     * @returns {FirebaseObjectObservable<{}>} 
     * @memberof IRepository
     */
    retrieveByKey(key: string): FirebaseObjectObservable<{}>

    /**
     * Returns multople objects based on the supplied array of keys
     * 
     * @param {Array<string>} keys 
     * @returns {(Observable<{}[]> | Array<FirebaseObjectObservable<{}>>)} 
     * @memberof IRepository
     */
    retrieveByKeys(keys: Array<string>): Array<FirebaseObjectObservable<{}>>

    /**
     * Returns multiple objects based on the supplied array of keys. These are then queried to see if they satisfy the query
     * 
     * @returns {Observable<{}[]>} 
     * @memberof IRepository
     */
    retrieveByKeysWithQuery(keys: Array<string>, field: string, value: string): Observable<{}[]>

    /**
     * Archives elements
     */
    archive(key: string): Promise<void>
}