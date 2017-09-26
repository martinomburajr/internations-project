import { Router } from '@angular/router';
import { UserService } from '../../api/dynamic-library/application-logic/user/service/user.service';
import { SimpleMasterDetailContainer } from '../../components/container/master-detal/simple/master-detail-container';
import { SimpleListContainer } from '../../components/container/list/simple-list/simple-list.container.template';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {Observable} from 'rxjs';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';
import {UserEntity} from 'app/api/dynamic-library/application-logic/user/entity/user.entity';
import {SimpleModalContainer} from 'app/components/container/modal/simple-modal/simple-modal-container';
import {AngularFireDatabase} from 'angularfire2/database';


/**
 * This class is the base component for the group entity/model
 * 
 * @export
 * @class GroupComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  /**
   * Shows the open/close state of the update wizard
   * 
   * @private
   * 
   * @memberOf GroupComponent
   */
  private wizardUpdateOpen = false;

  /**
   * Shows the open/close state of the create wizard
   * 
   * @private
   * 
   * @memberOf GroupComponent
   */
  private wizardCreateOpen = false;
  /**
   * Shows the open/close state of the modal
   * 
   * @private
   * 
   * @memberOf GroupComponent
   */
  private showModal = false;

  /**
   * Creates a simple modal container for the modal popup
   * 
   * @private
   * @type {SimpleModalContainer}
   * @memberOf GroupComponent
   */
  private modalContainer: SimpleModalContainer;

  /**
   * Houses the users as an Observable array
   * 
   * @private
   * @type {Observable<UserEntity[]>}
   * @memberOf GroupComponent
   */
  private users$: Observable<UserEntity[]>;
  /**
   * Houses the groups as an Observable array
   * 
   * @private
   * @type {Observable<GroupEntity[]>}
   * @memberOf GroupComponent
   */
  private groups$: Observable<GroupEntity[]>;
  /**
   * Creates a subject that can be subscribed to. In this case the observer watches the current index based on a list click
   * 
   * @private
   * 
   * @memberOf GroupComponent
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
    this.modalContainer = new SimpleModalContainer();
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
  }

  /**
   * Loads the groups from the DB
   * 
   * 
   * @memberOf GroupComponent
   */
  loadGroups(): void {
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
  }


  /**
   * Performs an action on the selected Item after search (DOESNT UPDATE UI)
   * 
   * @param {*} selectedItem 
   * 
   * @memberOf GroupComponent
   */
  onSearchSelect(selectedItem: any) {
    let searchedGroup = new GroupEntity().convertObjectToEntity(selectedItem['$key'], selectedItem);
    this.groupService.retrieveAllGenericAsEntity().subscribe(groups => {
      groups.forEach((group,index) => {
        if(group.key == searchedGroup.key){
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
    this.currentIndex$.emit($event)
  }
  

  
  /**
   * Opens the create-user component
   * 
   * 
   * @memberOf UserComponent
   */
  onCreateGroupClick() {
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
