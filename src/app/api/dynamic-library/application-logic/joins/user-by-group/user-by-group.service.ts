import { AbstractJoinService } from '../../../core-logic/service/join/abstract-join.service';
import {AngularFireDatabase} from 'angularfire2/database';
import { UserEntity } from '../../user/entity/user.entity';
import { Injectable } from '@angular/core';

@Injectable()
export class UserByGroupService extends AbstractJoinService<UserEntity> {
    constructor(public afDB: AngularFireDatabase) {
        super(afDB)
        this.entity = new UserEntity();
        this.JOIN_PATH = '/user-by-group';
    }
}