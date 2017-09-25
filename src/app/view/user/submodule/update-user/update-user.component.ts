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

  @ViewChild('wizardUpdate') private wizardUpdate: Wizard;
  @Input('wizardUpdateOpen')wizardUpdateOpen: boolean;
  @Input()currentIndex$: EventEmitter<number>;
  @Output()wizardState = new EventEmitter<boolean>();
  private userUpdateObject: {
    user: UserEntity,
    groups: Array<string>,
    _groups: Array<GroupEntity>
  } = {
    user: new UserEntity(),
    groups: new Array<string>(),
    _groups: Array<GroupEntity>()
  }
  
  constructor(private userService: UserService, private groupService: GroupService, private afDB: AngularFireDatabase) { 
    this.wizardState.emit(false);
  }

  ngOnInit() {
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      this.currentIndex$.subscribe(index => {
        console.log("upd in " + index);
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

  public onUpdateUserMultiSelectBoxChange(items) {
    console.log(items);
    this.userUpdateObject.groups = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)
  }

  onUpdateUser() {
    let path = {};
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      let userObj = this.userUpdateObject.user.purge();
      path['user/' + this.userUpdateObject.user.key] = userObj[this.userUpdateObject.user.key]
      this.userUpdateObject.groups.forEach(groupKey => {
        path['user-by-group/' + groupKey + '/' + this.userUpdateObject.user.key] = true;
        path['group-by-user/' + this.userUpdateObject.user.key + '/' + groupKey] = true;
      })
      this.userService.updateSpecifiedPath(path).subscribe(promise => {
        promise.then(resolve => {
          console.log("Succesfully deleted")
          this.wizardState.emit(false);
        });
        promise.catch(err => {
          console.log(err);
          this.wizardState.emit(false);
        });
      });
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['wizardUpdateOpen']) {
      this.wizardUpdateOpen ? this.wizardState.emit(true) : this.wizardState.emit(false);
    }
  }

}
