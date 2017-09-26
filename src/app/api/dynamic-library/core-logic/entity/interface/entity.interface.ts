import { Injectable } from '@angular/core';
import { AbstractEntity } from '../abstract-class/entity.abstract';
/**
 * This is the most basic version of an entity that can be stored within the database. This application distinguishes a model i.e an object that serves the general purpose of housing variables and an entity that has the special characteristic of being storable in a database
 * 
 * @export
 * @interface IEntity
 * @template T 
 */
export interface IEntity{
    /**
     * Database Selectors
     * 
     * @type {string}
     * @memberof IEntity
     */
    key: string;

    /**
     * Database Selectors
     * 
     * @type {string}
     * @memberof IEntity
     */
    DB_BASE: string;
    /**
     * Database Selectors
     * 
     * @type {string}
     * @memberof IEntity
     */
    DB_BASE_BY_USER?: string;

    /**
     * Converts an existing object into an entity
     * 
     * @template E 
     * @param {string} key 
     * @param {Object} objectToConvert 
     * @param {E} entity 
     * 
     * @memberOf IEntity
     */
    convertObjectToEntity(key: string, objectToConvert: Object): any;

    /**
     * This method ensures an entity can be converted to a JSON object that can be sent to the database
     * 
     * @param {IEntity} entity 
     * @returns {{}} 
     * 
     * @memberOf IEntity
     */
    purge?(entity: IEntity): {} 

}

export interface IGenericTypeEntityInitializer<T> {
    new() : T;
}

@Injectable()
export class IGenericTypeInitializer<T>  {
    
    public entity: T;
    public entity2: new () => IGenericTypeInitializer<IEntity>
    ctor: IGenericTypeEntityInitializer<T>;  
    constructor() {

    }

    createInstance<IEntity>(type:{new():IEntity;}): IEntity {
        return new type();
    }
}

