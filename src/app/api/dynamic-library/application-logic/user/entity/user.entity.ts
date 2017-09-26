import {AbstractEntity} from "app/api/dynamic-library/core-logic/entity/abstract-class/entity.abstract";
import {UtilityService} from "app/api/dynamic-library/core-logic/utility/utils/utility.service";

/**
 * Represents the abstract skeleton for a user
 * 
 * @export
 * @interface IUserEntity
 */
export interface IUserEntity {
    name: string;
    email: string;
    bio: string;
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
    bio: string;
    createdDate: number;
    DB_BASE = "/user";

    constructor() {
        super();
        // this.key = UtilityService.generateFirebaseID();
        this.name = '';
        this.displayPhoto = '';
        this.email = '';
        this.bio = '';
        this.createdDate = Date.now();
    }

    convertObjectToEntity(key: string, obj: {}): UserEntity {
        let userEntity = new UserEntity();
        userEntity.key = key;
        if(obj['name']) {userEntity.name = obj['name']}
        if(obj['displayPhoto']) {userEntity.displayPhoto = obj['displayPhoto']}
        if(obj['email']) {userEntity.email = obj['email']}
        if(obj['bio']) {userEntity.bio = obj['bio']}
        if(obj['createdDate']) {userEntity.createdDate = obj['createdDate']}
        return userEntity;
    }

    purge(): {} {
          let base = {};
          base[this.key] = {};
          if(this.name){base[this.key]['name'] = this.name;}
          if(this.bio){base[this.key]['bio'] = this.bio;}
          if(this.createdDate){base[this.key]['createdDate'] = this.createdDate;}
          if(this.email){base[this.key]['email'] = this.email;}
          if(this.displayPhoto){base[this.key]['displayPhoto'] = this.displayPhoto}
        //   if(this.groups){
        //       base[this.key]['groups'] = {};
        //       this.groups.forEach(key => {
        //           base[this.key]['groups'][key] = true;
        //       })
          return base;
      }
}
