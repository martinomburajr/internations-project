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
    users: Array<string>; 
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
    users: Array<string>;
    displayPhoto: string;
    DB_BASE = "/group";
    DB_BASE_BY_USER = "/group-by-user";
    constructor() {
        super();
        this.name = '';
        this.displayPhoto = '';
        this.description = '';
        this.users = new Array<string>();
    }

    convertObjectToEntity(key: string, obj: {}): GroupEntity {
        let groupEntity = new GroupEntity();
        groupEntity.key = key;
        if(obj['name']){groupEntity.name = obj['name']}
        if(obj['displayPhoto']){groupEntity.displayPhoto = obj['displayPhoto']}
        groupEntity.description = obj['description'];
        if(obj['users']){
            let userObjects = <Array<{}>>(obj['users']);
            let keys = Object.keys(userObjects);
            groupEntity.users = keys;
        }

        return groupEntity;
    }
}
