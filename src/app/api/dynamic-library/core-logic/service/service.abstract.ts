import { UtilityService } from '../utility/utils/utility.service';
import { Observable } from 'rxjs/Rx';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';
import {AbstractRepository} from 'app/api/dynamic-library/core-logic/repository/repository.abstract';
import {IService} from 'app/api/dynamic-library/core-logic/service/service.interface';
import * as firebase from 'firebase/app';
import {IEntity} from 'app/api/dynamic-library/core-logic/entity/interface/entity.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class AbstractService < T extends IEntity > {

        public entity: T;

        public constructor(public repository: AbstractRepository<T>) {
            this.repository = repository;
        }

        /**
         * Adds an entity to the database
         *
         * @param {{}} entity
         * @returns {(firebase.database.ThenableReference | Observable<firebase.Promise<void>>)}
         * @memberof IService
         */
        create(entity: T): Observable<firebase.Promise<void>> {
            if(!entity.key){
                entity.key = UtilityService.generateFirebaseID();
            }
            let purge = this.repository.purge(entity);
            let path = this.repository.createPath(purge);
            return this.repository.create(path);
        }


        /**
         * Updates and overwrites an existing path. It wont overwrite existing data, just add to it and overwrite
         *
         * @param {string} key
         * @param {T} entity
         * @memberof IService
         */
        update(entity: T): Observable<firebase.Promise<void>> {
            let purge = this.repository.purge(entity);
            let path = this.repository.createPath(purge);
            return this.repository.update(path);
        }

        /**
         * Deletes elements from the database
         *
         * @param {string} key
         * @param {any} parentKeys
         * @memberof IService
         */
        delete(obj: T): Observable<firebase.Promise<void>> {
            let purge = this.repository.purge(obj);
            let path = this.repository.createPath(purge);
            return this.repository.delete(path);
        }

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
         * Is meant to convert an incoming object into an entity
         *
         * @param {Observable<{}>} object$
         * @returns {Observable<T>}
         * @memberof IService
         */
        convert(object: {}): T {
            return null;
        }


        /**
         * Provides a specified path to be updated with a given value;
         *
         * @param {string} path
         * @param {string} value
         * @returns {Observable<firebase.Promise<void>>}
         * @memberof AbstractService
         */
        updateSpecifiedPath(path:string, value: string): Observable<firebase.Promise<void>> {
          return this.updateSpecifiedPath(path, value);
        }

        /**
         * Retrieves a single item based on the key
         *
         * @param {string} key
         * @memberof IService
         */
        retrieveByKey(key: string): FirebaseObjectObservable<{}> {
            return this.repository.retrieveByKey(key)
        }

        /**
         * Retrieves a single item and converts it into the entity based on the key
         *
         * @param {string} key
         * @returns {Observable<T>}
         * @memberof AbstractOmniService
         */
        retrieveByKeyAsEntity(key: string): Observable<T> {
            return this.repository.retrieveByKey(key)
                .map(obj => {
                    return this.entity.convertObjectToEntity(key, obj)
                })
        }

        /**
         * Retrieves objects from the database based on supplied keys
         *
         * @param {Array<string>} key
         * @memberof IService
         */
        retrieveByKeys(keys: Array<string>): Array<FirebaseObjectObservable<{}>> {
            return this.repository.retrieveByKeys(keys)
        }
        /**
         * Retrieves objects as entities from the database based on supplied keys
         *
         * @param {Array<string>} key
         * @memberof IService
         */
        retrieveByKeysAsEntity(keys: Array<string>): Array<Observable<T>> {
            return this.repository.retrieveByKeys(keys).map(obj$ => obj$.map(obj =>
                {
                    return this.entity.convertObjectToEntity(obj['$key'], obj)
                })
            )
        }

        retrieveByKeysAsArray(keys: Array<string>): Observable<{}[]> {
            return this.repository.retrieveByKeysAsArray(keys);
        }

        retrieveByKeysAsArrayAsEntity(keys: Array<string>): Observable<T[]> {
            return this.repository.retrieveByKeysAsArray(keys).map((obj:Array<{}>) => obj.map(elem => this.entity.convertObjectToEntity(elem['$key'], elem))
            );
        }

        retrieveByKeysWithQuery(keys: Array<string>, field: string, value: string): Observable<{}>[] {
            return this.repository.retrieveByKeysWithQuery(keys, field, value);
        }

        retrieveByKeysWithQueryAsEntity(keys: Array<string>, field: string, value: string): Observable<T>[] {
            return this.repository.retrieveByKeysWithQuery(keys, field, value).map(objs => objs.map(obj => this.entity.convertObjectToEntity(obj['$key'], obj)))
        }

        /**
         * Retrieves all the elements from the base tree in the database
         *
         * @memberof IService
         */
        retrieveAllGeneric(): FirebaseListObservable<{}[]> {
            return this.repository.retrieveAllGeneric()
        }

        /**
         * Retrieves all the elements from the base tree in the database as entities
         *
         * @memberof IService
         */
        retrieveAllGenericAsEntity(): Observable<T[]> {
            return this.repository.retrieveAllGeneric().map((obj:Array<{}>) => {
                return obj.map(elem => this.entity.convertObjectToEntity(elem['$key'], elem))
            });
        }

        /**
         * Retrieves all the elements from the base tree in the database with a query
         *
         * @param {FirebaseListFactoryOpts} query
         * @memberof IService
         */
        retrieveAllGenericWithQuery(query: FirebaseListFactoryOpts): Observable<{}[]> {
            return  this.repository.retrieveAllGenericWithQuery(query);
        }

        /**
         * Retrieves all the elements from the base tree in the database with a query and returns it as an entity
         *
         * @param {FirebaseListFactoryOpts} query
         * @memberof IService
         */
        retrieveAllGenericWithQueryAsEntity(query: FirebaseListFactoryOpts): Observable<T[]> {
            return this.repository.retrieveAllGenericWithQuery(query).map((obj:Array<{}>) => {
                return obj.map(elem => this.entity.convertObjectToEntity(elem['$key'], elem))
            });
        }

        archive(key: string): firebase.Promise<void> {
            return this.repository.archive(key)
        }

        retrieveKeysFromDependency(fullPath: string): FirebaseObjectObservable<{}> {
            return this.repository.retrieveKeysFromJoinTable(fullPath);
        }


}
