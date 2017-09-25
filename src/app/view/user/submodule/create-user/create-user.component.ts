import { Wizard } from 'clarity-angular';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { GroupEntity } from '../../../../api/dynamic-library/application-logic/group/entity/group.entity';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'template-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @ViewChild("wizard") wizard: Wizard;
  @Input('wizardCreateOpen')wizardCreateOpen: boolean;
  private userCreationObject: {
    user: UserEntity,
    groups: Array<string>,
    _groups: Array<GroupEntity>
  } = {
    user: new UserEntity(),
    groups: new Array<string>(),
    _groups: Array<GroupEntity>()
  }
  constructor(private userService: UserService, private groupService: GroupService) { }

  ngOnInit() {
    this.userCreationObject.user = new UserEntity();
    this.userCreationObject.groups = new Array<string>();
    this.groupService.retrieveAllGenericAsEntity().subscribe(groups => {
      this.userCreationObject._groups = groups;
      this.wizardCreateOpen = true;
    })
  }


  public onCreateUserMultiSelectBoxChange(items) {
    console.log(items);
    this.userCreationObject.groups = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(changes['userCreationObject']) {
      console.log(this.userCreationObject);
      console.log("changes!");
    }
  }

  onCreateUser = () => {
    let path = {};
    let purge = this.userCreationObject.user.purge();
    path['user/' + this.userCreationObject.user.key] = purge[this.userCreationObject.user.key];
    this.userCreationObject.groups.forEach(groupKey => {
      path['group-by-user/' + this.userCreationObject.user.key + '/' + groupKey] = true;
      path['user-by-group/' + groupKey + '/' + this.userCreationObject.user.key] = true;
    })
    this.userService.updateSpecifiedPath(path).subscribe(promise => {
      promise.then(resolve => console.log("Succesfully deleted"));
      promise.catch(err => console.log(err));
    });
  }

}
