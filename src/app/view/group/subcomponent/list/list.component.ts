import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { SimpleModalContainer } from '../../../../components/container/modal/simple-modal/simple-modal-container';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { Observable } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-group-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

/**
   * Retrieve a GroupEntity[] Observable from Parent
   * 
   * @type {Observable<GroupEntity[]>}
   * @memberOf ListComponent
   */
  @Input()groups$: Observable<GroupEntity[]>;
  
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
    onDeleteGroupClick(index:number) {
      this.showModal = true;
      this.groups$.subscribe(groups => {
        let group = groups[index];
        this.initialiseDeleteModalContainer(group);
        this.modalResult$.subscribe(result => {
          this.showModal = false;
          if(result == 0) {
            //group clicked cancel
          }else if(result == 1) {
            //group clicked ok
            this.deleteGroup(index, group);
          }else{
            //another unrecorded action was clicked
          }
        })
      })
    }
  
    /**
     * Functionality ot delete group
     * 
     * @param {number} index 
     * @param {GroupEntity} group 
     * 
     * @memberOf ListComponent
     */
    deleteGroup(index: number, group: GroupEntity) {
      let path = {};
          path['group/' + group.key] = null
          path['user-by-group' + '/' + group.key] = null;
          this.afDB.object('/user-by-group'+ '/' + group.key).subscribe(obj  => {
            let userKeys = Object.keys(obj);
            userKeys.forEach(userKey => {
              path['group-by-user/' + userKey + '/' + group.key] = null;
            })
            this.groupService.updateSpecifiedPath(path).subscribe(promise => {
              promise.then(resolve => console.log("Succesfully deleted"));
              promise.catch(err => console.log(err));
            });
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
    initialiseDeleteModalContainer(group: GroupEntity) {
      this.deleteContainer.title = "Delete " + group.name;
      this.deleteContainer.body = "Are you sure you want to delete " + group.name;
    }

}
