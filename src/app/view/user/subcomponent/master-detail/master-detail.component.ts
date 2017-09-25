import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-user-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {

  @Input()currentIndex$: EventEmitter<number>;
  private masterDetailUserData: {user: UserEntity, groups: Array<string>, _groups: Array<GroupEntity>} = {user: new UserEntity(), groups: new Array<string>(), _groups: new Array<GroupEntity>()}
  @Input()users$: Observable<UserEntity[]>;
  @Output()onUpdateClicked = new EventEmitter<boolean>();
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.onUpdateClicked.emit(false);
  }

  onUpdateClick() {
    this.onUpdateClicked.emit(true);
  }
  

  ngOnInit() {
    this.users$.subscribe(users => {
      this.currentIndex$.subscribe(index => {
        let user = users[index];
        this.masterDetailUserData.user = user;
        this.afDB.object('group-by-user/' + user.key).subscribe(obj => {
          let groupKeys = Object.keys(obj);
          this.masterDetailUserData.groups = groupKeys;
          this.groupService.retrieveByKeysAsArrayAsEntity(groupKeys).subscribe(groups => {
            this.masterDetailUserData._groups = groups;
          })
        })
      })
    })      
  }

  onMasterDetailListDeleteClick(index: number) {
    this.users$.subscribe(users => {
        this.currentIndex$.subscribe(index => {
        const user = users[index];
        user.groups.splice(index, 1);
        this.userService.update(user).subscribe(promise => {
          promise.then(resolve => console.log("Succesfully updated"));
          promise.catch(err => console.log(err));
        });
      })
    })
  }

  onDeleteGroupFromUser(group: GroupEntity) {
    let path = {};
    this.users$.subscribe(users => {
      this.currentIndex$.subscribe(index => {
        let user = users[index];
        path['group-by-user' + '/' + user.key + '/' + group.key] = null;
        path['user-by-group' + '/' + group.key + '/' + user.key] = null;
        this.userService.updateSpecifiedPath(path).subscribe(promise => {
          promise.then(resolve => console.log("Succesfully deleted"));
          promise.catch(err => console.log(err));
        });
      })
    })
  }

}
