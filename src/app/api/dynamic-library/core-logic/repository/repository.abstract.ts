
import { IRepository } from './repository.interface';
import { IEntity } from '../entity/interface/entity.interface';
import { Observable } from 'rxjs/Rx';
import {FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/database/interfaces';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DB_DASH} from 'app/api/dynamic-library/globals/const/globals.const';
import {AbstractEntity} from 'app/api/dynamic-library/core-logic/entity/abstract-class/entity.abstract';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class AbstractRepository < T extends IEntity >
// implements IRepository<T>
{

        protected entity: T;

        constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth) {

        }

       /**
         * Stores an element in the database, using multipath updates
         *
         * @param {{}} t
         * @memberof IRepository
         */
        create(paths: {}):Observable<firebase.Promise<void>> {
            return Observable.of(this.afDB.object('/').update(paths));
        }


        /**
         * IMPORTANT
         * Creates an object that represents the nodes for the data to be persisted. This method also can be used to create paths for data to be updated.
         *
         * @abstract
         * @returns {{}}
         *
         * @memberOf AbstractRepository
         */
        abstract createPath(purge: {}): {}


        /**
         * Cleans an entity into an object appropriate for database storage
         *
         * @param {T} t
         * @returns {{}}
         * @memberof IRepository
         */
        abstract purge(t: AbstractEntity): {}


            /**
     * updates an object from the database without using multipath updates
     *
     * @param {string} key
     * @param {{}} object
     * @memberof IRepository
     */
    update(paths: {}):Observable<firebase.Promise<void>> {
        return Observable.of(this.afDB.object('/').update(paths));
    }

    /**
     * Provides a specified path to be updated with a given value;
     *
     * @param {string} path
     * @param {string} value
     * @returns
     * @memberof AbstractRepository
     */
    updateSpecifiedPath(path: {}): Observable<firebase.Promise<void>> {
      return Observable.of(this.afDB.object('/').update(path));
    }
    /**
     * Removes an object from the database using multipath updates
     *
     * @param {string} key
     * @param {any} parentKeys
     * @memberof IRepository
     */
    delete(paths: {}): Observable<firebase.Promise<void>> {
        let keys = Object.keys(paths);
        keys.forEach(key => {
            paths[key] = null;
        })

        return Observable.of(this.afDB.object('/').update(paths));
    }


        public retrieveKeysFromJoinTable(fullPath: string): FirebaseObjectObservable<{}> {
            return this.afDB.object(fullPath)
        }

        /**
         * Returns an object from the database using the key as a reference
         *
         * @param {string} key
         * @returns {FirebaseObjectObservable<{}>}
         * @memberof IRepository
         */
        retrieveByKey(key: string): FirebaseObjectObservable<{}> {
            return this.afDB.object( this.entity.DB_BASE + DB_DASH + key);;
        }

        /**
         * Returns multople objects based on the supplied array of keys
         *
         * @returns {(Observable<{}[]> | Array<FirebaseObjectObservable<{}>>)}
         * @memberof IRepository
         */
        retrieveByKeys(keys: Array<string>): Array<FirebaseObjectObservable<{}>> {
            return keys.map(key => this.afDB.object(this.entity.DB_BASE + DB_DASH + key))
        }

        /**
         * Returns multiple objects based on the supplied array of keys. These are then queried to see if they satisfy the query
         *
         * @returns {Observable<{}[]>}
         * @memberof IRepository
         */
        retrieveByKeysWithQuery(keys: Array<string>, field: string, value: string): Observable<{}>[] {
            return keys.map(key => this.afDB.object(this.entity.DB_BASE + DB_DASH + key)
            .map((obj:{}) => {
                let searchItem = <string>obj[field];
                if(searchItem.search(value)!= -1) {
                    return obj;
                }
            }))
        }

        /**
         * Returns the keys of the objects created by the user
         *
         * @returns {Observable<string[]>}
         * @memberof IPersonalStorable
         */
        retrieveKeys(): Observable<string[]> {
            return this.afAuth.authState.map(user => {
                return this.afDB.list(this.entity.DB_BASE_BY_USER + DB_DASH + user.uid).map(arrObjects => {
                    let objects = <Array<{}>>arrObjects;
                    return objects.map(object => object['$key'])
                });
            }).concatMap(x=>x)
        }

        /**
         * Returns an observable containing an array of the items searched for. Bear in mind that it uses flatMap instead of concatMap and therefore order is not guaranteed
         *
         * @param {Array<string>} keys
         * @returns {Observable<{}[]>}
         *
         * @memberOf AbstractOmniRepository
         */
        retrieveByKeysAsArray(keys: Array<string>): Observable<{}[]> {
            let object$s = keys.map(key => {
                return this.afDB.object(this.entity.DB_BASE + DB_DASH + key)
            });

            return Observable.from(object$s).mergeMap(x=>x).scan((acc,val) => acc.concat(val), new Array<{}>())
        }

        /**
         * Returns all the elements within the database
         *
         * @returns {FirebaseListObservable<{}[]>}
         * @memberof IGenericStorable
         */
        retrieveAllGeneric(): FirebaseListObservable<{}[]> {
            return this.afDB.list(this.entity.DB_BASE);
        }
        /**
         * Returns lal the appropriate elements within the database based on the supplied query
         *
         * @param {FirebaseListFactoryOpts} query
         * @returns {FirebaseListObservable<{}[]>}
         * @memberof IGenericStorable
         */
        retrieveAllGenericWithQuery(query: FirebaseListFactoryOpts): FirebaseListObservable<{}[]> {
            return this.afDB.list(this.entity.DB_BASE, query);
        }

        /**
         * Temporarily disables a user by archiving their account
         *
         * @returns
         *
         * @memberof UserRepository
         */
        archive(key: string): firebase.Promise<void> {
            return this.afDB.object(this.entity.DB_BASE + DB_DASH + key + DB_DASH + 'isArchived').set(true)
        }

}
