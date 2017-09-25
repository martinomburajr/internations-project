import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { Observable } from 'rxjs/Rx';
import { UserEntity } from '../../../../api/dynamic-library/application-logic/user/entity/user.entity';
import { Component, OnInit } from '@angular/core';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';
import {UserService} from 'app/api/dynamic-library/application-logic/user/service/user.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  private entity: GroupEntity;
  private users$: Observable<UserEntity[]>;
  constructor(private userService: UserService, private groupService: GroupService) {
    this.entity = new GroupEntity();
    this.users$ = new Observable<UserEntity[]>();
  }

  ngOnInit() {
    this.users$ = this.userService.retrieveAllGenericAsEntity();
  }

  onUserSelect(index: number) {
    this.users$.subscribe(users => {
      this.entity.users.push(users[index].key);
    }) 
  }

  validateNameField():boolean {
    if(this.entity.name == '') {
      console.log("name error")
      return false;
    }else{
      return true;
    }
  }

  validateDescriptionField():boolean {
    if(this.entity.description == '') {
      console.log("name error")
      return false;
    }else{
      return true;
    }
  }

  onFinishClick() {
    this.groupService.create(this.entity).subscribe(x => {
      x.then(resolve => {
        console.log(resolve);
      })
      x.catch(reject => {
        console.log(reject);
      })
    })
  }

}
