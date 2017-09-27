import { SimpleModalContainer } from '../../../../components/container/modal/simple-modal/simple-modal-container';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { Observable } from 'rxjs/Rx';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * Retrieve a UserEntity[] Observable from Parent
   * 
   * @type {Observable<UserEntity[]>}
   * @memberOf ListComponent
   */
  private users$: Observable<UserEntity[]>;

  /**
   * Will emit the result of an index change
   * 
   * @type {EventEmitter<number>}
   * @memberOf ListComponent
   */
  @Output()onCurrentIndexChange$: EventEmitter<number>;

  /**
   * Responsible for showing the modal upon click
   * 
   * @private
   * @type {boolean}
   * @memberOf ListComponent
   */
  private showModal: boolean;
  /**
   * Returns the result of a user action on the modal e.g. clicked cancel = 0, clicked ok = 1
   * 
   * @private
   * 
   * @memberOf ListComponent
   */
  private modalResult$ = new EventEmitter<number>();

  /**
   * Houses the UI container for deleting the modal
   * 
   * @private
   * @type {SimpleModalContainer}
   * @memberOf ListComponent
   */
  private deleteContainer: SimpleModalContainer;

   /**
     * Shows the spinner if data hasnt loaded
     * 
     * @private
     * @type {boolean}
     * @memberOf ListComponent
     */
    private showLoading: boolean = true;


  /**
   * Creates an instance of ListComponent.
   * @param {UserService} userService 
   * @param {GroupService} groupService 
   * @param {AngularFireDatabase} afDB 
   * 
   * @memberOf ListComponent
   */
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.deleteContainer = new SimpleModalContainer();
    this.onCurrentIndexChange$ = new EventEmitter<number>();
    this.onCurrentIndexChange$.emit(0);
    this.showModal = false;
    this.modalResult$.emit(-1);

    this.users$ = this.userService.retrieveAllGenericAsEntity();
  }

  /**
   * Changes the index of the current selected item. This event propagates through to other subcomponents and submodules
   * 
   * @param {number} index 
   * 
   * @memberOf ListComponent
   */
  onListItemClick(index: number) {
    this.onCurrentIndexChange$.emit(index);
  }

  /**
   * An event that occurs when a user clicks delete user click
   * 
   * @param {number} index 
   * 
   * @memberOf ListComponent
   */
  onDeleteUserClick(index:number) {
    this.showModal = true;
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      let user = users[index];
      this.initialiseDeleteModalContainer(user);
      this.modalResult$.subscribe(result => {
        this.showModal = false;
        if(result == 0) {
          //user clicked cancel
        }else if(result == 1) {
          //user clicked ok
          this.userService.deleteUser(index, user);
        }else{
          //another unrecorded action was clicked
        }
      })
    })
  }


  /**
   * Receives the click result of the modal and emits it to the local variable
   * 
   * @param {any} $event 
   * 
   * @memberOf ListComponent
   */
  onModalClickResult($event) {
    console.log("Modal click" + $event);
    this.modalResult$.emit($event);
  }

  ngOnInit() {
  }

  /**
   * Dynamically initialises the modal when the user clicks delete
   * 
   * @param {UserEntity} user 
   * 
   * @memberOf ListComponent
   */
  initialiseDeleteModalContainer(user: UserEntity) {
    this.deleteContainer.title = "Delete " + user.name;
    this.deleteContainer.body = "Are you sure you want to delete " + user.name;
  }

}
