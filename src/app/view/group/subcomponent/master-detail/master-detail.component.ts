import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { SimpleModalContainer } from '../../../../components/container/modal/simple-modal/simple-modal-container';
import { Observable } from 'rxjs/Rx';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-group-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss']
})
export class MasterDetailComponent implements OnInit {

  @Input()currentIndex$: EventEmitter<number>;
  @Input()groups$: Observable<GroupEntity[]>;
  @Output()onUpdateClicked = new EventEmitter<boolean>();

  private index: number = 0;
  private modalResult: EventEmitter<number> = new EventEmitter<number>();
  private modalShow: boolean = false;
  private masterDetailGroupData: {
    group: GroupEntity,
    users: Array<string>,
    _users: Array<UserEntity>
  } = {
    group: new GroupEntity(),
    users: new Array<string>(),
    _users: new Array<UserEntity>()
  } 

  private deleteGroupUserContainer: SimpleModalContainer;
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.onUpdateClicked.emit(false);
    this.deleteGroupUserContainer = new SimpleModalContainer();
  }

  onUpdateClick() {
    this.onUpdateClicked.emit(true);
  }
  
  ngOnInit() {
    this.groups$.subscribe(groups => {
      this.currentIndex$.subscribe(index => {
        this.index = index;
        let group = groups[index];
        this.masterDetailGroupData.group = group;
        this.afDB.object('user-by-group/' + group.key).catch((err, caught) => {
          return Observable.of(caught);
        }).subscribe(obj => {
          let userKeys = Object.keys(obj);
          this.masterDetailGroupData.users = userKeys;
          this.userService.retrieveByKeysAsArrayAsEntity(userKeys).subscribe(users => {
            this.masterDetailGroupData._users = users;
          })
        })
      })
    })      
  }

  /**
   * Removes a user from a group
   * 
   * @param {number} groupIndex 
   * 
   * @memberOf MasterDetailComponent
   */
  onMasterDetailListDeleteClick(groupIndex: number) {
    this.groups$.subscribe(groups => {
          const group = groups[this.index];
          //Retrieve the users associated to the group
          this.afDB.object('/user-by-group/' + group.key).subscribe(obj=> {
            let userKeys = Object.keys(obj);
            //Identified the deleted users
            let deletedKey = userKeys[groupIndex];
            userKeys.splice(groupIndex, 1);
            //If the deleted user was the last group associated to the user. Delete the group as well.
            if(userKeys.length == 0) {  
              this.modalShow = true;
              this.deleteGroupUserContainer.title = "Delete User?"
              this.deleteGroupUserContainer.body = "Are you sure you want to remove this user from this group? They belong to no other group and will consequentially be deleted"
              this.modalResult.subscribe(result => {
                if(result == 1) {
                  let path = {};
                  path['group/' + group.key] = null;
                  // groupKeys.forEach(key => {
                    path['group-by-user/' + deletedKey + '/' + group.key] = null;
                  // })
                  path['user-by-group/' + group.key] = null;
                  this.groupService.updateSpecifiedPath(path).subscribe(promise => {
                    promise.then(resolve => console.log("User and asssociated groups deleted"));
                    promise.catch(reject => console.log("could not perform delete user group operation"))
                  })
                }
              })
            }
            //If the deleted group wasnt the last group associated to the user. Just delete the association
            else{
              this.modalShow = true;
              this.deleteGroupUserContainer.title = "Delete user?"
              this.deleteGroupUserContainer.body = "Are you sure you want to remove this user from this group?"

              this.modalResult.subscribe(result => {
                let path = {};
                if(result == 1) {
                    path['group-by-user/' + deletedKey + '/' + group.key] = null;
                    path['user-by-group/' + group.key + '/' + deletedKey] = null;
                    this.groupService.updateSpecifiedPath(path).subscribe(promise => {
                      promise.then(resolve => console.log("User and asssociated and single group"));
                      promise.catch(reject => console.log("could not perform delete user group operation"))
                    })
                  }
                })
            }
          })
        // })
    })
  }



  onModalClickResult($event) {
    this.modalResult.emit($event);
    this.modalShow = false;
  }

  onMasterDetailListItemClick(group: GroupEntity) {
    
  }

}
