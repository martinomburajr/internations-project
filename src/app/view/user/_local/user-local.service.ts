import { AbstractLocalService } from '../../../components/service/local.service';
import { Injectable } from '@angular/core';
import {UserEntity} from 'app/api/dynamic-library/application-logic/user/entity/user.entity';

@Injectable()
export class UserLocalService extends AbstractLocalService<UserEntity> {

    constructor() {
        super()
    }

}