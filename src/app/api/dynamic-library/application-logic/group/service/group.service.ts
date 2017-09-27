import { Injectable } from '@angular/core';
import {AbstractService} from 'app/api/dynamic-library/core-logic/service/service.abstract';
import {UserEntity} from 'app/api/dynamic-library/application-logic/user/entity/user.entity';
import {GroupRepository} from 'app/api/dynamic-library/application-logic/group/repository/group.repository';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';
import {FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class GroupService extends AbstractService<GroupEntity> {
    constructor(repository: GroupRepository) {
        super(repository);
        this.entity = new GroupEntity();
    } 

    /**
     * Functionality ot delete group
     * 
     * @param {number} index 
     * @param {GroupEntity} group 
     * 
     * @memberOf ListComponent
     */
    deleteGroup(index: number, group: GroupEntity) {
        let path = {};
            path['group/' + group.key] = null
            path['user-by-group' + '/' + group.key] = null;
            this.repository.afDB.object('/user-by-group/' + group.key).subscribe(obj  => {
              let userKeys = Object.keys(obj);
              userKeys.forEach(userKey => {
                path['group-by-user/' + userKey + '/' + group.key] = null;
              })
              this.updateSpecifiedPath(path).subscribe(promise => {
                promise.then(resolve => console.log("Succesfully deleted"));
                promise.catch(err => console.log(err));
                window.location.reload();
              });
            })
      }
}