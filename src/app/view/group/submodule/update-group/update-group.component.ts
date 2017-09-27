import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { Wizard } from 'clarity-angular'
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {

  /**
   * Gives a programmatic link to the wizard within the html.
   * 
   * @private
   * @type {Wizard}
   * @memberOf UpdateGroupComponent
   */
  @ViewChild('wizardUpdate') private wizardUpdate: Wizard;
  /**
   * Allows an input of group observables
   * 
   * @type {Observable<GroupEntity[]>}
   * @memberOf UpdateGroupComponent
   */
  private groups$: Observable<GroupEntity[]>;
  private users$: Observable<UserEntity[]>;
  @Input('wizardUpdateOpen')wizardUpdateOpen: boolean;
  @Input()currentIndex$: EventEmitter<number>;
  @Output()wizardState = new EventEmitter<boolean>();

  /**
   * Temporarily house a group updateable object
   * 
   * @private
   * @type {{
   *     group: GroupEntity,
   *     users: Array<string>,
   *     _users: Array<UserEntity>,
   *     old_users:Array<string>,
   *   }}
   * @memberOf UpdateGroupComponent
   */
  private groupUpdateObject: {
    group: GroupEntity,
    users: Array<string>,
    _users: Array<UserEntity>,
    old_users:Array<string>,
  } = {
    group: new GroupEntity(),
    users: new Array<string>(),
    _users: new Array<UserEntity>(),
    old_users: new Array<string>()
  } 
  
  /**
   * Creates an instance of UpdateGroupComponent.
   * @param {UserService} userService 
   * @param {GroupService} groupService 
   * @param {AngularFireDatabase} afDB 
   * 
   * @memberOf UpdateGroupComponent
   */
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.wizardState.emit(false);

    this.users$ = this.userService.retrieveAllGenericAsEntity();
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
  }

  /**
   * Initialises after the constructor is run. Loads the groups along with their users.
   * 
   * 
   * @memberOf UpdateGroupComponent
   */
  ngOnInit() {
    this.groupService.retrieveAllGenericAsEntity().subscribe(groups => {
      this.currentIndex$.subscribe(index => {
        this.groupUpdateObject.group = groups[index];
        let key = this.groupUpdateObject.group.key;
        this.afDB.object('user-by-group/' + key).subscribe(obj=> {
          let userKeys = Object.keys(obj);
          this.userService.retrieveByKeysAsArrayAsEntity(userKeys).subscribe(users => {
            this.groupUpdateObject._users = users;       
          })
          this.groupUpdateObject.old_users = userKeys;
          this.groupUpdateObject.users = userKeys;  
        })
      })
    })

    
  }


  /**
   * Allows for the multi-selection of users using the multselectbox on the ui.
   * 
   * @param {any} items 
   * 
   * @memberOf UpdateGroupComponent
   */
  public onUpdateGroupMultiSelectBoxChange(items) {
    this.groupUpdateObject.users = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)

    this.userService.retrieveAllGenericAsEntity().subscribe(groups => {
      this.groupUpdateObject._users = this.groupUpdateObject.users.map(key => {
        let foundUser: UserEntity;
        groups.forEach(group => {
          if(group.key == key) {
            foundUser = group;
          }
        })
        return foundUser;
      })
      this.groupUpdateObject._users
    })
  }

  /**
   * Performs an update on the group
   * 
   * 
   * @memberOf UpdateGroupComponent
   */
  onUpdateGroup() {
    let path = {};
    this.groupService.retrieveAllGenericAsEntity().subscribe(group => {
      let groupObj = this.groupUpdateObject.group.purge();
      path['group/' + this.groupUpdateObject.group.key] = groupObj[this.groupUpdateObject.group.key];

      let nullableUsers = this.findNullableUsers();
      nullableUsers.map(nullableUser => {
        path['group-by-user/' + nullableUser + '/' + this.groupUpdateObject.group.key] = null;
        path['user-by-group/' + this.groupUpdateObject.group.key + '/' +nullableUser] = null;
      })
 
      this.groupUpdateObject.users.forEach(userKey => {
        path['group-by-user/' + userKey + '/' + this.groupUpdateObject.group.key] = true;
        path['user-by-group/' + this.groupUpdateObject.group.key + '/' + userKey] = true;
      })
      this.groupService.updateSpecifiedPath(path).subscribe(promise => {
        promise.then(resolve => {
          this.wizardState.emit(false);
        });
        promise.catch(err => {
          console.log(err);
          this.wizardState.emit(false);
        });
      });
    })
  }

  findNullableUsers(): Array<string>{;
    let newArray = this.groupUpdateObject.users;
    let oldArray = this.groupUpdateObject.old_users
    newArray.forEach((newUser, newIndex) => {
      oldArray.forEach((oldUser, oldIndex) => {
        if(newUser == oldUser) {
          oldArray.splice(oldIndex, 1);
        }
      })
    })
    return oldArray
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['wizardUpdateOpen']) {
      this.wizardUpdateOpen ? this.wizardState.emit(true) : this.wizardState.emit(false);
    }
  }

}
