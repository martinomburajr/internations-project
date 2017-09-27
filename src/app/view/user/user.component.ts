import { SimpleModalContainer } from '../../components/container/modal/simple-modal/simple-modal-container';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserEntity } from '../../api/dynamic-library/application-logic/user/entity/user.entity';
import { UserService } from '../../api/dynamic-library/application-logic/user/service/user.service';
import { Component, EventEmitter, OnInit, PACKAGE_ROOT_URL, ViewChild } from '@angular/core';
import {SimpleListContainer} from 'app/components/container/list/simple-list/simple-list.container.template';
import {SimpleMasterDetailContainer} from 'app/components/container/master-detal/simple/master-detail-container';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {Wizard} from 'clarity-angular';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  /**
   * Shows the open/close state of the update wizard
   * 
   * @private
   * 
   * @memberOf UserComponent
   */
  private wizardUpdateOpen = false;
  /**
   * Shows the open/close state of the create wizard
   * 
   * @private
   * 
   * @memberOf UserComponent
   */
  private wizardCreateOpen = false;

  /**
   * Houses the users as an Observable array
   * 
   * @private
   * @type {Observable<UserEntity[]>}
   * @memberOf UserComponent
   */
  private users$: Observable<UserEntity[]>;
  /**
   * Houses the groups as an Observable array
   * 
   * @private
   * @type {Observable<GroupEntity[]>}
   * @memberOf UserComponent
   */
  private groups$: Observable<GroupEntity[]>;
  /**
   * Is an active subscription for the crrent index that is manipulated by th paren/base component
   * 
   * @private
   * 
   * @memberOf UserComponent
   */
  private currentIndex$ = new EventEmitter<number>();


  /**
   * Creates an instance of UserComponent.
   * @param {GroupService} groupService
   * @param {UserService} userService
   *
   * @memberOf UserComponent
   */
  constructor(private groupService: GroupService, private userService: UserService, private router: Router, private afDB: AngularFireDatabase) {

    this.users$ = new Observable<UserEntity[]>(x=>x);
    this.groups$ = new Observable<GroupEntity[]>(x=>x);
    this.loadUsers();
    this.loadGroups();
  }

  ngOnInit() {
    this.currentIndex$.emit(0);
  }

  /**
   * Places the loaded user entities into a waiting observable within the user local service
   *
   *
   * @memberOf GroupComponent
   */
  loadUsers():void {
    /**Retrieve all users from the database */
    this.users$ = this.userService.retrieveAllGenericAsEntity();

    //ServerSide LOGIC - I WOULDNOT INCLUDE IN A REGULAR APP. CHECKS FOR DB-INCONSISTENCIES AND EITHER AMENDS OR DELETES
    this.users$.subscribe(users => {
      users.map(user => {
        this.afDB.object('/group-by-user/' + user.key).subscribe(groupObj => {
          let groupKeys = Object.keys(groupObj);
          if(groupKeys.length == 0 || groupKeys[0] == '$value') {
            let path = {};
            path['/user/' + user.key] = null;
            path['group-by-user/' + user.key] = null;
            this.userService.updateSpecifiedPath(path).subscribe();
          }
        })
      })
    })
  }

  loadGroups(): void {
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();

    //ServerSide LOGIC - I WOULDNOT INCLUDE IN A REGULAR APP. CHECKS FOR DB-INCONSISTENCIES AND EITHER AMENDS OR DELETES
    this.groups$.subscribe(groups => {
      groups.map(group => {
        this.afDB.object('/user-by-group/' + group.key).subscribe(userObj => {
          let userKeys = Object.keys(userObj);
          if(userKeys.length == 0 || userKeys[0] == "$value") {
            let path = {};
            path['/group/' + group.key] = null;
            path['/user-by-group/' + group.key] = null;
            this.groupService.updateSpecifiedPath(path).subscribe();
          }
        })
      })
    })
  }

  onSearchSelect(a: any) {
    let searchedUser = new UserEntity().convertObjectToEntity(a['$key'], a);
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      users.forEach((user,index) => {
        if(user.key == searchedUser.key){
          this.currentIndex$.emit(index);
        }
      })
    })
  }


  /**
   * Listens to change in the current index from a user selecting a different item in the list
   * 
   * @param {number} $event 
   * 
   * @memberOf UserComponent
   */
  onCurrentIndexChange($event: number) {
    console.log($event);
    this.currentIndex$.emit($event)
  }
  

  
  /**
   * Opens the create-user component
   * 
   * 
   * @memberOf UserComponent
   */
  onCreateUserClick() {
    console.log("here");
    this.wizardCreateOpen = true;
  }

  /**
   * Listens to an event from the Master-Detail Subcomponent before allowing the Update Wizard to start
   * 
   * @param {any} $event 
   * 
   * @memberOf UserComponent
   */
  onUpdateClick($event) {
    this.wizardUpdateOpen = $event;
  }

  /**
   * Records the update wizards open/close state and sets the current instance variable to it.
   * 
   * @param {any} $event 
   * 
   * @memberOf UserComponent
   */
  updateWizardState($event) {
    this.wizardUpdateOpen = $event
  }
}
