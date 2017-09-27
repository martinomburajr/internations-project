import {
    GroupByUserService,
} from '../../../../api/dynamic-library/application-logic/joins/group-by-user/group-by-user.service';
import {
    UserByGroupService,
} from '../../../../api/dynamic-library/application-logic/joins/user-by-group/user-by-group.service';
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
  @Output()onUpdateClicked = new EventEmitter<boolean>();

  private index: number = 0;

  private deleteUserModalResult : EventEmitter<number> = new EventEmitter<number>();
  private deleteAssociationModalResult : EventEmitter<number> = new EventEmitter<number>();
  private deleteGroupModalResult : EventEmitter<number> = new EventEmitter<number>();

  private showDeleteUserModal: boolean = false;
  private showDeleteAssociationModal: boolean = false;
  private showDeleteGroupModal: boolean = false;

  private deleteGroupModalContainer: SimpleModalContainer
  private deleteUserModalContainer: SimpleModalContainer
  private deleteAssociationModalContainer: SimpleModalContainer

  private masterDetailGroupData: {
    group: GroupEntity,
    users: Array<string>,
    _users: Array<UserEntity>
  } = {
    group: new GroupEntity(),
    users: new Array<string>(),
    _users: new Array<UserEntity>()
  } 

  private groups$: Observable<GroupEntity[]>;

  private deleteGroupUserContainer: SimpleModalContainer;
  private showLoading: boolean = true;
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.onUpdateClicked.emit(false);
    this.deleteGroupModalContainer = new SimpleModalContainer();
    this.deleteUserModalContainer = new SimpleModalContainer();
    this.deleteAssociationModalContainer = new SimpleModalContainer();

    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
  }

  onUpdateClick() {
    this.onUpdateClicked.emit(true);
  }
  
  ngOnInit() {
    this.groupService.retrieveAllGenericAsEntity().subscribe(groups => {
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
  onMasterDetailListDeleteClick(userIndex: number) {
    this.groupService.retrieveAllGenericAsEntity().subscribe(groups => {
          const group = groups[this.index];
          //Retrieve the users associated to the group
          this.afDB.object('/user-by-group/' + group.key).subscribe(obj=> {
            let userKeys = Object.keys(obj);
            //Identified the deleted user
            let deletedUserKey = userKeys[userIndex];
            userKeys.splice(userIndex, 1);
            //If the deleted user was the last user in the group. Delete the group as well.
            if(userKeys.length == 0) {      
              this.deleteGroupModalContainer.title = "Delete User?"
              this.deleteGroupModalContainer.body = "Are you sure you want to remove this user from this group? The group will be empty and consequentially be deleted"
              this.showDeleteGroupModal = true;
              this.deleteGroupModalResult.subscribe(result => {
                if(result == 1) {
                  this.showDeleteGroupModal = false;
                  let path = {};
                  path['group/' + group.key] = null;
                  // groupKeys.forEach(key => {
                  path['group-by-user/' + deletedUserKey + '/' + group.key] = null;
                  // })
                  path['user-by-group/' + group.key] = null;
                  this.groupService.updateSpecifiedPath(path).subscribe(promise => {
                    promise.then(resolve => console.log("User and asssociated groups deleted"));
                    promise.catch(reject => console.log("could not perform delete user group operation"))
                  })
                }else{
                  this.showDeleteGroupModal = false;
                }
              })
            }
            //If the deleted user wasnt the lastuser in the group. Delete the association only.
            else{
              /**Check to see if this user belongs to any other groups. */
              this.afDB.object('group-by-user/' + deletedUserKey)
                .subscribe(groupObj => {
                  let groupKeys = Object.keys(groupObj);
                  let searchedKey = groupKeys.find(key => key == group.key);
                  if(groupKeys[0] != "$value") {
                    if(groupKeys.length == 1 && searchedKey == group.key || groupKeys.length == 0) {
                      this.deleteUserModalContainer.title = "Delete User?"
                      this.deleteUserModalContainer.body = "The user belongs to no other group. They will be permanently deleted";
                      this.showDeleteUserModal= true;
                      this.deleteUserModalResult.subscribe(val => {
                        if(val == 1) {
                          this.showDeleteUserModal= false;
                          let path = {};
                          /**Deleting the user */
                          path['user/' + deletedUserKey] = null;
                          path['user-by-group/' + group.key + '/' + deletedUserKey] = null;
                          path['group-by-user/' + deletedUserKey] = null;
                          this.userService.updateSpecifiedPath(path).subscribe(promise => {
                            promise.then(resolve => console.log("User and asssociated and single group"));
                            promise.catch(reject => console.log("could not perform delete user group operation"))
                          })
                          }
                          else{
                            this.showDeleteUserModal= false;
                            //Will not delete user and terminate
                          }
                        })
                    }else {
                      this.deleteAssociationModalContainer.title = "Delete User?"
                      this.deleteAssociationModalContainer.body = "Are you sure you want to remove this user from this group?"
                      this.showDeleteAssociationModal = true;
                      this.deleteAssociationModalResult.subscribe(result => {
                        let path = {};
                        if(result == 1) {
                          this.showDeleteAssociationModal = false;
                            path['group-by-user/' + deletedUserKey + '/' + group.key] = null;
                            path['user-by-group/' + group.key + '/' + deletedUserKey] = null;
                            this.groupService.updateSpecifiedPath(path).subscribe(promise => {
                              promise.then(resolve => console.log("User and asssociated and single group"));
                              promise.catch(reject => console.log("could not perform delete user group operation"))
                            })
                          }else{
                            this.showDeleteAssociationModal = false;
                          }
                        })
                    }
                  }
                })
            }
          })
        // })
    })
  }


  onModalClickResultDeleteAssociation($event) {
    this.deleteAssociationModalResult.emit($event);
    this.showDeleteAssociationModal = false;
  }

  onModalClickResultDeleteGroup($event) {
    this.deleteGroupModalResult.emit($event);
    this.showDeleteGroupModal = false
  }

  onModalClickResultDeleteUser($event) {
    this.deleteUserModalResult.emit($event);
    this.showDeleteUserModal = false;
  }


  onMasterDetailListItemClick(group: GroupEntity) {
    
  }

}
