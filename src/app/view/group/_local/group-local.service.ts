import { AbstractLocalService } from '../../../components/service/local.service';
import { Injectable } from '@angular/core';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';

@Injectable()
export class GroupLocalService extends AbstractLocalService<GroupEntity> {

    constructor() { 
        super();
    }

}