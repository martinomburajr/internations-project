import { Observable } from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserEntity} from 'app/api/dynamic-library/application-logic/user/entity/user.entity';
import * as firebase from 'firebase/app';
import {AbstractRepository} from 'app/api/dynamic-library/core-logic/repository/repository.abstract';
import {Injectable} from '@angular/core';

@Injectable()
export class UserRepository extends AbstractRepository < UserEntity > {

    constructor(afDB : AngularFireDatabase, afAuth : AngularFireAuth) {
        super(afDB, afAuth);
        this.entity = new UserEntity();
    }

    createPath(purge: {}): {} {
      debugger;
        let path = {};
        let userPath = {};
        let groupByUserPath = {};
        let userByGroupPath = {};

        let userKey = Object.keys(purge)[0];
        let groupKeys = <Array<{}>>(purge[userKey]['groups']);

        userPath['/user/' + userKey] = purge[userKey];
        groupKeys.forEach((groupKey:string) => {
            groupByUserPath['/group-by-user/' + userKey + "/" + groupKey] = true;
            userByGroupPath['/user-by-group/' + groupKey  + "/" + userKey] = true
        })

        let userPathKey = Object.keys(userPath)[0];;
        let groupByUserPathKey = Object.keys(groupByUserPath)[0];;
        let userByGroupPathKey = Object.keys(userByGroupPath)[0];

        let uP = userPath[userPathKey];
        let guP = groupByUserPath[groupByUserPathKey];
        let ugP = userByGroupPath[userByGroupPathKey]
        path = {
            [userPathKey]: uP,
            [groupByUserPathKey]: guP,
            [userByGroupPathKey]: ugP,
            };
        return path;
    }

    /**
     * Stores an element in the database, using multipath updates
     *
     * @param {{}} t
     * @memberof IRepository
     */
    create(paths: {}):Observable<firebase.Promise<void>> {
        return Observable.of(this.afDB.object('/').update(paths));
    }

    purge(user: UserEntity): {} {
      debugger;
        let base = {};
        base[user.key] = {};
        if(user.name){base[user.key]['name'] = user.name;}
        if(user.bio){base[user.key]['bio'] = user.bio;}
        if(user.dob){base[user.key]['dob'] = user.dob;}
        if(user.email){base[user.key]['email'] = user.email;}
        if(user.displayPhoto){base[user.key]['displayPhoto'] = user.displayPhoto}
        if(user.groups){base[user.key]['groups'] = user.groups}
        //base[user.key]['gro'] = {}
        return base;
    }
}
