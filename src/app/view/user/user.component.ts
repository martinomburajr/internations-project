import { lang } from 'moment';
import { SimpleModalContainer } from '../../components/container/modal/simple-modal/simple-modal-container';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserLocalService } from './_local/user-local.service';
import { UserEntity } from '../../api/dynamic-library/application-logic/user/entity/user.entity';
import { UserService } from '../../api/dynamic-library/application-logic/user/service/user.service';
import { Component, EventEmitter, OnInit, PACKAGE_ROOT_URL, ViewChild } from '@angular/core';
import {SimpleListContainer} from 'app/components/container/list/simple-list/simple-list.container.template';
import {SimpleMasterDetailContainer} from 'app/components/container/master-detal/simple/master-detail-container';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {Wizard} from 'clarity-angular';
import {GroupEntity} from 'app/api/dynamic-library/application-logic/group/entity/group.entity';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private showModal = false;
  private modalOnOkayClick = new EventEmitter<boolean>();
  private modalOnCancelClick = new EventEmitter<boolean>();
  private modalContainer: SimpleModalContainer;
  private users$: Observable<UserEntity[]>;
  private groups$: Observable<GroupEntity[]>;
  private listContainers$: Observable<Array<SimpleListContainer>>;
  private masterDetailContainer$: Observable<SimpleMasterDetailContainer>;

  @ViewChild("wizard") wizard: Wizard;
  open: boolean = false;

  /**
   * Creates an instance of UserComponent.
   * @param {GroupService} groupService 
   * @param {UserService} userService 
   * 
   * @memberOf UserComponent
   */
  constructor(private groupService: GroupService, private userService: UserService, private router: Router) {
    this.modalContainer = new SimpleModalContainer();
    this.loadUsers();
    this.loadGroups();
  }

  ngOnInit() {
      
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

    /**Load the list content */
    console.log("LOAD")
    this.listContainers$ = this.users$.map(users => {
      return users.map((user:UserEntity,index) => {
        let listContainer = new SimpleListContainer();
        if(index == 0) {
          listContainer = new SimpleListContainer(user.name,user.bio,user.displayPhoto, SimpleListContainer._LIST_ACTIVE);   
        }else{
          listContainer = new SimpleListContainer(user.name,user.bio,user.displayPhoto, SimpleListContainer._LIST);  
        }
        return listContainer; 
      })
    })

    /**Load the Master Detail Content */
    this.masterDetailContainer$ = this.users$.map(users => {
      let user:UserEntity = users[0];
      return this.bindEntityToMasterDetailContainer(user);
    })
  }

  loadGroups(): void {
    this.groups$ = this.groupService.retrieveAllGenericAsEntity();
  }

  private newUser: UserEntity = new UserEntity();
  /**
   * 
   * Routes to create a user
   * 
   * @memberOf GroupComponent
   */
  onCreateUserClick() {
    this.open = true;
  }

  onCreateUser() {
    this.userService.create(this.newUser).subscribe(promise => {
      promise.then(resolve => {
        console.log("new user created");
      })
      promise.catch(err => {
        console.log(err.message);
      })
    })
  }

  /**
   * Routes to update a user
   * 
   * 
   * @memberOf GroupComponent
   */
  onUpdateUserClick() {
    //this.router.navigate(['update-user'])
  }

  onSearchSelect(a: any) {
    console.log("search");
    this.users$.subscribe(users => {
      for(let i = 0; i < users.length; i++) {
        if(users[i].key = a['$key']) {
          let container  = this.bindEntityToMasterDetailContainer(users[i]);
          this.masterDetailContainer$ =  Observable.of(container);
        }
      }
    })
  }

  /**
   * Deletes a user and returns an appropriate notification
   * 
   * @param {number} index 
   * 
   * @memberOf UserComponent
   */
  onDeleteClick(index: number) {   
    this.showModal = true;
    let container = new SimpleModalContainer();
    container.body = "Are you sure you want to delete the user?";
    container.classInfo = "";
    container.title = "Delete the user?";
    this.modalContainer = container;

    console.log("ON DELETE");
    
    this.modalOnOkayClick.subscribe(val => {
      if(val) {
        this.users$.subscribe(users => {
          let user = users[index];
          console.log(user);
          this.userService.delete(user).subscribe(x => {
            x.then(resolve => {
              console.log("Deletion successful");
            })
            x.catch(reject => {
              console.log("User could not be deleted | " + reject.message);
            })
          })
        })
      }else{

      }
    })
  }

  onOkClick($event: boolean): boolean {
    console.log($event);
    this.modalOnOkayClick.emit($event);
    this.showModal = false;
    return $event
  }

  onCancelClick($event: boolean): boolean {
    console.log($event);
    this.modalOnCancelClick.emit($event);
    this.showModal = false;
    return $event;
  }


  bindEntityToSimpleListContainer (user: UserEntity): SimpleListContainer {
    let container: SimpleListContainer = new SimpleListContainer();
    container.primaryText = user.name;
    container.sideText = user.bio;
    container.classInfo = SimpleListContainer._LIST;
    container.image = user.displayPhoto;
    return container;
  }

  bindEntityToSimpleModalContainer (user: UserEntity): SimpleModalContainer {
    let container = new SimpleModalContainer();
    container.body = user.bio;
    container.title = user.name;
    container.footer = user.email;
    return container;
  }

  bindEntityToMasterDetailContainer (user: UserEntity): SimpleMasterDetailContainer {
      let masterDetailContainer = new SimpleMasterDetailContainer();
      masterDetailContainer.image = user.displayPhoto;
      masterDetailContainer.footer = '';
      masterDetailContainer.title = name;
      masterDetailContainer.listTitle = "Groups";

      masterDetailContainer.list$ = this.userService.retrieveKeysFromDependency('/group-by-user/' + user.key).map((obj: {}) => {
        let keys = Object.keys(obj);

        return this.groupService.retrieveByKeysAsArrayAsEntity(keys).map(groups => {
          return groups.map(group => new SimpleListContainer(group.name, group.description, group.displayPhoto, SimpleListContainer._LIST))
        });
        
      }).flatMap(x=>x);

      masterDetailContainer.mainDescription = user.bio;
      masterDetailContainer.subDescription = null;
      return masterDetailContainer;
  }

  onListItemClick(index: number) {
    console.log(index);
    this.currentIndex = index;
    this.masterDetailContainer$ = this.users$.map(users => {
      return this.bindEntityToMasterDetailContainer(users[index]);
    });
  }

  // myOptions: [];

  // setSelected(selectElement) {
  //     for (var i = 0; i < selectElement.options.length; i++) {
  //         var optionElement = selectElement.options[i];
  //         var optionModel = this.myOptions[i];

  //         if (optionElement.selected == true) { optionModel.selected = true; }
  //         else { optionModel.selected = false; }
  //     }
  // }

  

  @ViewChild('select') selectElRef;
  public onNewUserMultiSelectBoxChange(items) {
    console.log(items);
    this.newUser.groups = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)
    console.log(this.newUser);
  }

  public onUpdateUserMultiSelectBoxChange(items) {
    console.log(items);
    this.updateUser.groups = Array.apply(null,items)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)
    console.log(this.newUser);
  }


  private currentIndex = 0;
  @ViewChild('wizardUpdate') private wizardUpdate: Wizard;
  private updateUser$: Observable<UserEntity> = new Observable<UserEntity>(x=>x);
  private updateUser: UserEntity = new UserEntity();
  private wizardUpdateOpen = false;

  onUpdateClickPassUser(user: UserEntity) {
    this.wizardUpdateOpen = true;
    this.updateUser = user;
  }

  onUpdateClick() {
    this.wizardUpdateOpen = true
    this.users$.subscribe(users => {
      this.updateUser = users[this.currentIndex];
    });
  }

  updateUserClick() {
    this.userService.update(this.updateUser)
  }

}
