import {AbstractEntity} from "app/api/dynamic-library/core-logic/entity/abstract-class/entity.abstract";

/**
 * Represents the abstract skeleton for a user
 * 
 * @export
 * @interface IUserEntity
 */
export interface IUserEntity {
    name: string;
    email: string;
    groups: Array<string>;
    bio: string;
    dob: number;
}

/**
 * Represents the manifestation of a User
 * 
 * @export
 * @class UserEntity
 * @extends {AbstractEntity}
 * @implements {IUserEntity}
 */
export class UserEntity extends AbstractEntity implements IUserEntity {
    name: string;
    displayPhoto: string;
    email: string;
    groups: Array<string>;
    bio: string;
    dob: number;
    DB_BASE = "/user";

    constructor() {
        super();
        this.name = '';
        this.displayPhoto = '';
        this.email = '';
        this.groups = new Array<string>();
        this.bio = '';
        this.dob = Date.now();
    }

    convertObjectToEntity(key: string, obj: {}): UserEntity {
        let userEntity = new UserEntity();
        userEntity.key = key;
        if(obj['name']) {userEntity.name = obj['name']}
        if(obj['displayPhoto']) {userEntity.displayPhoto = obj['displayPhoto']}
        if(obj['email']) {userEntity.email = obj['email']}
        if(obj['bio']) {userEntity.bio = obj['bio']}
        if(obj['dob']) {userEntity.dob = obj['dob']}
        if(obj['groups']) {
            userEntity.groups = Object.keys(obj['groups']);
        }
        return userEntity;
    }
}
