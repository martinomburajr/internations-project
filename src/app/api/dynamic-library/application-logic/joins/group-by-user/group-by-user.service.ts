import {AngularFireDatabase} from 'angularfire2/database';
import { GroupEntity } from '../../group/entity/group.entity';
import { AbstractJoinService } from '../../../core-logic/service/join/abstract-join.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupByUserService extends AbstractJoinService<GroupEntity> {

    constructor(public afDB: AngularFireDatabase) {
        super(afDB)
        this.entity = new GroupEntity();
        this.JOIN_PATH = '/group-by-user';
    }

}