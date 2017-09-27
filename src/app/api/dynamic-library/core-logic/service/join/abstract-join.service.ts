import { Observable } from 'rxjs/Rx';
import { IEntity } from '../../entity/interface/entity.interface';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export abstract class AbstractJoinService<T extends IEntity> {

    protected entity: T
    protected JOIN_PATH: string;
    constructor(public afDB: AngularFireDatabase) {

    }

    /**
     * Allows for any update to occur to an object. Encompasses create/delete and update operations
     * 
     * @param {string} path 
     * @returns {firebase.Promise<void>} 
     * 
     * @memberOf AbstractJoinService
     */
    public update(primaryKey: string, secondaryKey: string, value: string): firebase.Promise<void> {
        const finalPath = {};
        finalPath[this.JOIN_PATH + primaryKey + '/' + secondaryKey] = value;
        return this.afDB.object('/').update(finalPath);
    }

    /**
     * Retrieves a list of json objects
     * e.g path To users in group = user-by-group/group-id/
     * 
     * group-id = secondaryKey
     * @param {string} path 
     * @returns {FirebaseListObservable<{}[]>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveBaseList(secondaryKey: string, primaryBase: string): Observable<{}> {
        const finalPath = this.JOIN_PATH + secondaryKey;
        return this.afDB.object(finalPath).map(obj => {
            let keys = Object.keys(obj);
            return keys.map(key => this.afDB.object(primaryBase + '/' + key))
        }).mergeMap(x=>x).mergeMap(x=>x);
    }

    /**
     * Retrieves a list of json objects
     * e.g path To users in group = user-by-group/group-id/
     * 
     * group-id = secondaryKey
     * @param {string} path 
     * @returns {FirebaseListObservable<{}[]>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveBaseListAsEntity(secondaryKey: string, primaryBase: string): Observable<T> {
        const finalPath = this.JOIN_PATH + secondaryKey;
        return this.afDB.object(finalPath).map(obj => {
            let keys = Object.keys(obj);
            return keys.map(key => this.afDB.object(primaryBase + '/' + key).map(obj2 => this.entity.convertObjectToEntity(obj2['$key'], obj2)))
        }).mergeMap(x=>x).mergeMap(x=>x);
    }

    /**
     * Retrieves a list of items and converts each item to an entity
     * 
     * @param {string} path 
     * @returns {Observable<T[]>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveListAsEntity(path: string): Observable<T[]> {
        return this.afDB.list(path).map((objs: {}[]) => objs.map(obj => this.entity.convertObjectToEntity(obj['$key'], obj)))
    }

    public retrieveKeyList(primaryKey: string, secondaryKey: string): Observable<string[]>{
        const finalPath = this.JOIN_PATH + primaryKey + '/' + secondaryKey;
        return this.afDB.list(finalPath).map(objs => Object.keys(objs))
    }

    /**
     * Returns a base object, given the join-path;
     * e.g.  path To user = user-by-group/group-id/user-id
     * 
     * @param {string} path 
     * @returns {FirebaseObjectObservable<{}>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveBaseObject(primaryKey: string, secondaryKey: string, primaryBase: string): FirebaseObjectObservable<{}> {
        const finalPath = this.JOIN_PATH + primaryKey + '/' + secondaryKey;
        return this.afDB.object(finalPath).map(obj => {
            let key = Object.keys(obj)[0];
            let basePath = primaryBase + '/' + key;
            return this.afDB.object(basePath)
        }).mergeAll()
    }


    /**
     * Returns a base object, given the join-path
     * 
     * @param {string} path 
     * @returns {FirebaseObjectObservable<{}>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveBaseObjectAsEntity(primaryKey: string, secondaryKey: string, primaryBase: string): Observable<T> {
        const finalPath = this.JOIN_PATH + primaryKey + '/' + secondaryKey;
        return this.afDB.object(finalPath).map(obj => {
            let key = Object.keys(obj)[0];
            let basePath = primaryBase + '/' + key;
            return this.afDB.object(basePath).map(obj => this.entity.convertObjectToEntity(obj['$key'], obj));
        }).mergeAll()
    }

    /**
     * Returns a list of join keys as a string array;
     * 
     * @param {string} primaryKey 
     * @param {string} secondaryKey 
     * @returns {Observable<string[]>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveObjectKeyList(primaryKey: string, secondaryKey: string): Observable<string[]>{
        const finalPath = this.JOIN_PATH + primaryKey + '/' + secondaryKey;
        return this.afDB.object(finalPath).map(objs => Object.keys(objs))
    }

    /**
     * Retrieves an object and converts it into an entity;
     * 
     * @param {string} path 
     * @returns {Observable<T>} 
     * 
     * @memberOf AbstractJoinService
     */
    public retrieveObjectAsEntity(path: string): Observable<T> {
        return this.afDB.object(path).map(obj => this.entity.convertObjectToEntity(obj['$key'], obj)) ;
    }
}