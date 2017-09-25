import { UpdateGroupModule } from './submodule/update-group/update-group.module';
import { CreateGroupModule } from './submodule/create-group/create-group.module';
import { SimpleListComponent } from '../../components/template/list/simple-list/simple-list.component';
import { SearchBarTemplate } from '../../components/template/search-bar/concrete/search-bar.template.component';
import { MasterDetailTemplate } from '../../components/template/master-detail/master-detail.component';
import { SimpleListTemplateModule } from '../../components/template/list/simple-list/simple-list.module';
import { MasterDetailTemplateModule } from '../../components/template/master-detail/master-detail.module';
import { SearchBarTemplateModule } from '../../components/template/search-bar/concrete/search-bar.template.module';
import { UserRepository } from '../../api/dynamic-library/application-logic/user/repository/user.repository';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupRepository } from '../../api/dynamic-library/application-logic/group/repository/group.repository';
import { GroupRoutingModule } from './group.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import {UpdateGroupComponent} from 'app/view/group/submodule/update-group/update-group.component';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {UserService} from 'app/api/dynamic-library/application-logic/user/service/user.service';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';
import {SimpleListContainer} from 'app/components/container/list/simple-list/simple-list.container.template';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule.forRoot(),
    ReactiveFormsModule,
    SearchBarTemplateModule,
    MasterDetailTemplateModule,
    SimpleListTemplateModule,
    // CreateGroupModule,
    // UpdateGroupModule,
    GroupRoutingModule,
  ],
  declarations: [GroupComponent,
    // CreateGroupComponent,
    // UpdateGroupComponent
    // SimpleListComponent, MasterDetailTemplate, SearchBarTemplate
], providers: [GroupRepository, GroupService, UserRepository, UserService]
})
export class GroupModule { }