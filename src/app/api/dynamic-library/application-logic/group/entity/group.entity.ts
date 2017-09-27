import {AbstractEntity} from "app/api/dynamic-library/core-logic/entity/abstract-class/entity.abstract";

/**
 * Internations Project
 * @author info@martinomburajr.com
 */

/**
 * Represents the abstract representaiton of a group
 * 
 * @export
 * @interface IGroupEntity
 */
export interface IGroupEntity {
    name: string;
    description: string;
}

/**
 * Is the manifestation of the abstract representation of a group
 * 
 * @export
 * @class GroupEntity
 * @extends {AbstractEntity}
 * @implements {IGroupEntity}
 */
export class GroupEntity extends AbstractEntity implements IGroupEntity {
    name: string;
    description: string;
    displayPhoto: string;
    createdDate: number;
    DB_BASE = "/group";
    DB_BASE_BY_USER = "/group-by-user";

    constructor() {
        super();
        this.name = '';
        this.displayPhoto = '';
        this.description = '';
        this.createdDate = Date.now();
    }

    /**
     * Converts a JSON object to a useable TS entity
     * 
     * @param {string} key 
     * @param {{}} obj 
     * @returns {GroupEntity} 
     * 
     * @memberOf GroupEntity
     */
    convertObjectToEntity(key: string, obj: {}): GroupEntity {
        let groupEntity = new GroupEntity();
        groupEntity.key = key;
        if(obj['name']){groupEntity.name = obj['name']}
        if(obj['displayPhoto']){groupEntity.displayPhoto = obj['displayPhoto']}
        if(obj['createdDate']){groupEntity.createdDate = obj['createdDate']}
        groupEntity.description = obj['description'];
        return groupEntity;
    }

    /**
     * Destroys a Entity and converts it into a JSON Object, safe for the database
     * 
     * @returns {{}} 
     * 
     * @memberOf GroupEntity
     */
    purge(): {} {
        let base = {};
        base[this.key] = {};
        base[this.key]['name'] = this.name;
        base[this.key]['description'] = this.description;
        base[this.key]['createdDate'] = this.createdDate;
        if(this.displayPhoto){base[this.key]['displayPhoto'] = this.displayPhoto}
        return base;
    }
}
