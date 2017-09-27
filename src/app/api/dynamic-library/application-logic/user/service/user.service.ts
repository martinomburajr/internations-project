import { AbstractService } from '../../../core-logic/service/service.abstract';
import { UserRepository } from '../repository/user.repository';
import { Injectable } from '@angular/core';
import {UserEntity} from 'app/api/dynamic-library/application-logic/user/entity/user.entity';

@Injectable()
export class UserService extends AbstractService<UserEntity> {
    constructor(userRepository: UserRepository) {
        super(userRepository);
        this.entity = new UserEntity();
    }

    /**
   * Functionality ot delete user
   * 
   * @param {number} index 
   * @param {UserEntity} user 
   * 
   * @memberOf ListComponent
   */
  deleteUser(index: number, user: UserEntity) {
    let path = {};
        path['user/' + user.key] = null
        path['group-by-user' + '/' + user.key] = null;
        this.repository.afDB.object('/group-by-user/' + user.key).subscribe(obj  => {
        debugger;
          let groupKeys = Object.keys(obj);
          if(groupKeys[0] != "$value") {
            groupKeys.forEach(groupKey => {
                path['user-by-group/' + groupKey + '/' + user.key] = null;
            })
          }
          this.updateSpecifiedPath(path).subscribe(promise => {
            window.location.reload();
            promise.then(resolve => console.log("Succesfully deleted"));
            promise.catch(err => console.log(err));
          });
    })
  }
}