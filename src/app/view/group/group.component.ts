import { Router } from '@angular/router';
import { UserService } from '../../api/dynamic-library/application-logic/user/service/user.service';
import { SimpleMasterDetailContainer } from '../../components/container/master-detal/simple/master-detail-container';
import { SimpleListContainer } from '../../components/container/list/simple-list/simple-list.container.template';
import { GroupLocalService } from './_local/group-local.service';
import { Component, OnInit } from '@angular/core';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {Observable} from 'rxjs';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  private groups$: Observable<GroupEntity[]>;
  private listContainers$: Observable<Array<SimpleListContainer>>;
  private masterDetailContainer$: Observable<SimpleMasterDetailContainer>;

  /**
   * Creates an instance of GroupComponent. Injects the local service as well as the group service into the component;
   * @param {GroupLocalService} _local 
   * @param {GroupService} groupService 
   * 
   * @memberOf GroupComponent
   */
  constructor(private _local: GroupLocalService, private groupService: GroupService, private userService: UserService, private router: Router) { 
    this.groups$ = new Observable<GroupEntity[]>(x=>x);
    //this.listContainers$ = new Observable<Array<SimpleListContainer>>(x=>x);
    // this.masterDetailContainer$ = new Observable<SimpleMasterDetailContainer>(x=>x);
    this.loadGroup();
  }

  ngOnInit() {
      
  }

  /**
   * Places the loaded group entities into a waiting observable within the group local service
   * 
   * 
   * @memberOf GroupComponent
   */
  loadGroup():void {
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
    this.listContainers$ = this.groups$.map(groups => {
      return groups.map((group:GroupEntity,index) => {
        let listContainer = new SimpleListContainer();
        if(index == 0) {
          listContainer = new SimpleListContainer(group.name, group.description, null, SimpleListContainer._LIST_ACTIVE);   
        }else{
          listContainer = new SimpleListContainer(group.name, group.description, null, SimpleListContainer._LIST);
        }
        return listContainer; 
      })
    })

    this.masterDetailContainer$ = this.groups$.map(groups => {
      
      let group = groups[0];
      let masterDetailContainer = new SimpleMasterDetailContainer();
      masterDetailContainer.image = group.displayPhoto;
      masterDetailContainer.footer = '';
      masterDetailContainer.title = group.name;
      masterDetailContainer.mainDescription = group.description;
      masterDetailContainer.subDescription = null;
      console.log(masterDetailContainer);
      return masterDetailContainer;
    });

    this.listContainers$.subscribe(x=>console.log(x));
  }

  onListItemClick(index: number) {

    this.masterDetailContainer$ = this.groups$.map(groups => {
      
      let group = groups[index];
      let masterDetailContainer = new SimpleMasterDetailContainer();
      masterDetailContainer.image = group.displayPhoto;
      masterDetailContainer.footer = '';
      masterDetailContainer.title = group.name;
      masterDetailContainer.listTitle = "users";

      masterDetailContainer.list$ = this.groupService.retrieveKeysFromDependency('/user-by-group/' + group.key).map((obj: {}) => {
        let keys = Object.keys(obj);

        return this.userService.retrieveByKeysAsArrayAsEntity(keys).map(users => {
          return users.map(user => new SimpleListContainer(user.name, user.bio, user.displayPhoto, SimpleListContainer._LIST))
        });
        
      }).flatMap(x=>x);

      masterDetailContainer.list$.subscribe(x=>console.log(x));
      
      masterDetailContainer.mainDescription = group.description;
      masterDetailContainer.subDescription = null;
      console.log(masterDetailContainer);
      return masterDetailContainer;
    });
  }

  /**
   * 
   * Routes to create a group
   * 
   * @memberOf GroupComponent
   */
  onCreateGroupClick() {
    this.router.navigate(['groups/create-group'])
  }

  /**
   * Routes to update a group
   * 
   * 
   * @memberOf GroupComponent
   */
  onUpdateGroupClick() {
    this.router.navigate(['update-group'])
  }

}
