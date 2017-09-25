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
}