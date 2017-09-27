import { Observable } from 'rxjs/Rx';
import { Wizard } from 'clarity-angular';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'template-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  @ViewChild("wizard") wizard: Wizard;
  @Input('wizardCreateOpen')wizardCreateOpen: boolean;
  private groups$: Observable<GroupEntity[]>;
  private users$: Observable<UserEntity[]>;
  private groupCreationObject: {
    group: GroupEntity,
    users: Array<string>,
    _users: Array<UserEntity>
  } = {
    group: new GroupEntity(),
    users: new Array<string>(),
    _users: new Array<UserEntity>()
  } 
  constructor(private userService: UserService, private groupService: GroupService) { 
    this.users$ = this.userService.retrieveAllGenericAsEntity();
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
  }

  ngOnInit() {
    this.userService.retrieveAllGenericAsEntity().subscribe(users => {
      this.groupCreationObject._users = users;
      this.groupCreationObject.users = users.map(user => user.key);
      this.wizardCreateOpen = false;
    })
  }

  public onCreateGroupMultiSelectBoxChange(items) {
    this.groupCreationObject.users = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)

    this.userService.retrieveAllGenericAsEntity().subscribe(groups => {
      this.groupCreationObject._users = this.groupCreationObject.users.map(key => {
        let foundUser: UserEntity;
        groups.forEach(group => {
          if(group.key == key) {
            foundUser = group;
          }
        })
        return foundUser;
      })
      this.groupCreationObject._users
    })
  }

  onCreateGroup = () => {
    let path = {};
    let purge = this.groupCreationObject.group.purge();
    path['group/' + this.groupCreationObject.group.key] = purge[this.groupCreationObject.group.key];
    this.groupCreationObject.users.forEach(userKey => {
      path['user-by-group/' + this.groupCreationObject.group.key + '/' + userKey] = true;
      path['group-by-user/' + userKey + '/' + this.groupCreationObject.group.key] = true;
    })
    this.groupService.updateSpecifiedPath(path).subscribe(promise => {
      promise.then(resolve => {
        window.location.reload();
        console.log("Succesfully created")
      });
      promise.catch(err => (err));
    });
  }
}
