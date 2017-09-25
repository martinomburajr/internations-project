import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import {GroupEntity} from "app/api/dynamic-library/application-logic/group/entity/group.entity";
import {AbstractRepository} from "app/api/dynamic-library/core-logic/repository/repository.abstract";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class GroupRepository extends AbstractRepository < GroupEntity > {
    constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth) {
        super(afDB, afAuth);
        this.entity = new GroupEntity();
    }

    purge(group: GroupEntity): {} {
        let base = {};
        base[group.key] = {};
        base[group.key]['name'] = group.name;
        base[group.key]['description'] = group.description;
        group.users.forEach(user => {
            base[group.key]['users'] = {};
            base[group.key]['users'][user] = true;
        })
        return base;
    }

    createPath(purge: {}): {} {
        let path = {};
        let userPath = {};
        let groupByUserPath = {};
        let userByGroupPath = {};

        let userKey = Object.keys(purge)[0];
        let groupKeys = <Array<{}>>(purge[userKey]['groups']);
        userPath['/user'] = purge;
               
        groupKeys.forEach(groupKey => {
            groupByUserPath['/group-by-user'] = {userKey: {groupKey: true}};
            userByGroupPath['/user-by-group/'] = {groupKey : {userKey: true}}
        })
        path = {userPath,groupByUserPath, userByGroupPath};
        return path;
    }
}