import { SimpleMasterDetailContainer } from '../../../../components/container/master-detal/simple/master-detail-container';
import { SimpleModalContainer } from '../../../../components/container/modal/simple-modal/simple-modal-container';
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
  @Output()onUpdateClicked = new EventEmitter<boolean>();

  private users$: Observable<UserEntity[]>;
  private index: number = 0;
  private modalResult: EventEmitter<number> = new EventEmitter<number>();
  private modalShow: boolean = false;
  private masterDetailUserData: {user: UserEntity, groups: Array<string>, _groups: Array<GroupEntity>} = {user: new UserEntity(), groups: new Array<string>(), _groups: new Array<GroupEntity>()}

   /**
     * Shows the spinner if data hasnt loaded
     * 
     * @private
     * @type {boolean}
     * @memberOf ListComponent
     */
    private showLoading: boolean = true;

  private deleteUserGroupContainer: SimpleModalContainer;
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.onUpdateClicked.emit(false);
    this.deleteUserGroupContainer = new SimpleModalContainer();

    this.users$ = this.userService.retrieveAllGenericAsEntity();

  }

  onUpdateClick() {
    this.onUpdateClicked.emit(true);
  }
  
  ngOnInit() {
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      this.currentIndex$.subscribe(index => {
        this.index = index;
        let user = users[index];
        this.masterDetailUserData.user = user;
        this.afDB.object('group-by-user/' + user.key).catch((err, caught) => {
          return Observable.of(caught);
        }).subscribe(obj => {
          let groupKeys = Object.keys(obj);
          this.masterDetailUserData.groups = groupKeys;
          this.groupService.retrieveByKeysAsArrayAsEntity(groupKeys).subscribe(groups => {
            this.masterDetailUserData._groups = groups;
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
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {

          const user = users[this.index];
          //Retrieve the groups associated to the user
          this.afDB.object('/group-by-user/' + user.key).subscribe(obj=> {

            let groupKeys = Object.keys(obj);
            //Identified the deleted group
            let deletedKey = groupKeys[groupIndex];
            groupKeys.splice(groupIndex, 1);
            //If the delete group was the last group associated to the user. Delete the user as well.
            if(groupKeys.length == 0) {  
              this.modalShow = true;
              this.deleteUserGroupContainer.title = "Delete group"
              this.deleteUserGroupContainer.body = "Are you sure you want to remove this user from this group? They will belong to no other group and will be permenantly deleted"
              this.modalResult.subscribe(result => {
                if(result == 1) {
                  let path = {};
                  path['user/' + user.key] = null;
                  // groupKeys.forEach(key => {
                    path['user-by-group/' + deletedKey + '/' + user.key] = null;
                  // })
                  path['group-by-user/' + user.key] = null;
                  this.userService.updateSpecifiedPath(path).subscribe(promise => {
                    promise.then(resolve => console.log("User and asssociated groups deleted"));
                    promise.catch(reject => console.log("could not perform delete user group operation"))
                  })
                }
              })
            }
            //If the deleted group wasnt the last group associated to the user. Just delete the association
            else{
              this.modalShow = true;
              this.deleteUserGroupContainer.title = "Delete group"
              this.deleteUserGroupContainer.body = "Are you sure you want to remove this group from this user?"

              this.modalResult.subscribe(result => {
                let path = {};
                if(result == 1) {
                    path['user-by-group/' + deletedKey + '/' + user.key] = null;
                    path['group-by-user/' + user.key + '/' + deletedKey] = null;
                    this.userService.updateSpecifiedPath(path).subscribe(promise => {
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
