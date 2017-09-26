import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { Wizard } from 'clarity-angular'
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'template-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  /**
   * Enables component communication to the view for the wizard
   * 
   * @private
   * @type {Wizard}
   * @memberOf UpdateUserComponent
   */
  @ViewChild('wizardUpdate') private wizardUpdate: Wizard;
  /**
   * The observable housing all the groups
   * 
   * @type {Observable<GroupEntity[]>}
   * @memberOf UpdateUserComponent
   */
  @Input()groups$: Observable<GroupEntity[]>;
  /**
   * The observable housing all the users
   * 
   * @type {Observable<UserEntity[]>}
   * @memberOf UpdateUserComponent
   */
  @Input()users$: Observable<UserEntity[]>;
  /**
   * An input variable from parent detailing if the wizard should open
   * 
   * @type {boolean}
   * @memberOf UpdateUserComponent
   */
  @Input('wizardUpdateOpen')wizardUpdateOpen: boolean;
  /**
   * An active subscription to the current index as per actions on the parent
   * 
   * @type {EventEmitter<number>}
   * @memberOf UpdateUserComponent
   */
  @Input()currentIndex$: EventEmitter<number>;
  /**
   * Returns the state of the wizard from open(true) to closed(false).
   * 
   * 
   * @memberOf UpdateUserComponent
   */
  @Output()wizardState = new EventEmitter<boolean>();

  /**
   * Temporarily stores an updateable user
   * 
   * @private
   * @type {{
   *     user: UserEntity,
   *     groups: Array<string>,
   *     _groups: Array<GroupEntity>,
   *     old_groups: Array<string>
   *   }}
   * @memberOf UpdateUserComponent
   */
  private userUpdateObject: {
    user: UserEntity,
    groups: Array<string>,
    _groups: Array<GroupEntity>,
    old_groups: Array<string>
  } = {
    user: new UserEntity(),
    groups: new Array<string>(),
    _groups: Array<GroupEntity>(),
    old_groups: new Array<string>()
  }
  
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.wizardState.emit(false);
  }

  /**
   * Initialises the updateable user based on current user information
   * 
   * 
   * @memberOf UpdateUserComponent
   */
  ngOnInit() {
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      this.currentIndex$.subscribe(index => {
        this.userUpdateObject.user = users[index];
        let key = this.userUpdateObject.user.key;
        this.afDB.object('group-by-user/' + key).subscribe(obj=> {
          let groupKeys = Object.keys(obj);
          this.groupService.retrieveByKeysAsArrayAsEntity(groupKeys).subscribe(groups => {
            this.userUpdateObject._groups = groups;
          })
          this.userUpdateObject.groups = groupKeys;  
        })
      })
    })

    
  }


  /**
   * Allows for updating the userUpdateObject, when toggling adding a group
   * 
   * @param {any} items 
   * 
   * @memberOf UpdateUserComponent
   */
  public onUpdateUserMultiSelectBoxChange(items) {
    this.userUpdateObject.groups = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)

    this.groups$.subscribe(groups => {
      this.userUpdateObject._groups = this.userUpdateObject.groups.map(key => {
        let foundGroup: GroupEntity;
        groups.forEach(group => {
          if(group.key == key) {
            foundGroup = group;
          }
        })
        return foundGroup;
      })
      this.userUpdateObject._groups
    })
  }

  /**
   * Updates the user based on new information given
   * 
   * 
   * @memberOf UpdateUserComponent
   */
  onUpdateUser() {
    let path = {};
    this.users$.subscribe(users => {
      let userObj = this.userUpdateObject.user.purge();
      path['user/' + this.userUpdateObject.user.key] = userObj[this.userUpdateObject.user.key];

      let nullableGroups = this.findNullableGroups()
      nullableGroups.map(nullableGroup => {
        path['user-by-group/' + nullableGroup + '/' + this.userUpdateObject.user.key] = null;
        path['group-by-user/' + this.userUpdateObject.user.key + '/' +nullableGroup] = null;
      })

      this.userUpdateObject.groups.forEach(groupKey => {
        path['user-by-group/' + groupKey + '/' + this.userUpdateObject.user.key] = true;
        path['group-by-user/' + this.userUpdateObject.user.key + '/' + groupKey] = true;
      })
      this.userService.updateSpecifiedPath(path).subscribe(promise => {
        promise.then(resolve => {
          console.log("Succesfully updated")
          this.wizardState.emit(false);
        });
        promise.catch(err => {
          console.log(err);
          this.wizardState.emit(false);
        });
      });
    })
  }

  
  findNullableGroups(): Array<string>{;
    let newArray = this.userUpdateObject.groups;
    let oldArray = this.userUpdateObject.old_groups
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
