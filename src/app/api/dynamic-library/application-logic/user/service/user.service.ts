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
}