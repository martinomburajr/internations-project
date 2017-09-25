import { IEntity } from '../interface/entity.interface';

export abstract class AbstractEntity implements IEntity {
    key: string;
    DB_BASE: string;
    DB_BASE_BY_USER?:string

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
    convertObjectToEntity(key: string, objectToConvert: Object): IEntity {
        let a:IEntity
        return a;
    }

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
