import { ListComponent } from './subcomponent/list/list.component';
import { MasterDetailComponent } from './subcomponent/master-detail/master-detail.component';
import { UpdateUserModule } from './submodule/update-user/update-user.module';
import { CreateUserModule } from './submodule/create-user/create-user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupService } from '../../api/dynamic-library/application-logic/group/service/group.service';
import { GroupRepository } from '../../api/dynamic-library/application-logic/group/repository/group.repository';
import { SingleActionListModule } from '../../components/template/list/single-action-list/single-action-list.module';
import { ModalTemplateModule } from '../../components/template/modal/modal.template.module';
import { SearchBarTemplateModule } from '../../components/template/search-bar/concrete/search-bar.template.module';
import { MasterDetailTemplateModule } from '../../components/template/master-detail/master-detail.module';
import { SimpleListTemplateModule } from '../../components/template/list/simple-list/simple-list.module';
import { UserService } from '../../api/dynamic-library/application-logic/user/service/user.service';
import { UserRepository } from '../../api/dynamic-library/application-logic/user/repository/user.repository';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {UserRoutingModule} from 'app/view/user/user.routing';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';
import {SimpleModalTemplateModule} from 'app/components/template/modal/simple-modal/simple-modal.template.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    NglModule,
    FormsModule,
    CreateUserModule,
    ReactiveFormsModule,
    SimpleListTemplateModule,
    MasterDetailTemplateModule,
    SearchBarTemplateModule,
    ModalTemplateModule,
    SingleActionListModule,
    SimpleModalTemplateModule, 
    UpdateUserModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, MasterDetailComponent, ListComponent],
  providers: [UserRepository, UserService, GroupRepository, GroupService]
})
export class UserModule { }