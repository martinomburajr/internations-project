import {
    GroupByUserService,
} from '../../../../api/dynamic-library/application-logic/joins/group-by-user/group-by-user.service';
import {
    UserByGroupService,
} from '../../../../api/dynamic-library/application-logic/joins/user-by-group/user-by-group.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarTemplateModule } from '../../../../components/template/search-bar/concrete/search-bar.template.module';
import { MasterDetailTemplateModule } from '../../../../components/template/master-detail/master-detail.module';
import { SimpleListTemplateModule } from '../../../../components/template/list/simple-list/simple-list.module';
import { UserRepository } from '../../../../api/dynamic-library/application-logic/user/repository/user.repository';
import {NgModule} from '@angular/core';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';
import {CreateGroupComponent} from 'app/view/group/submodule/create-group/create-group.component';
import {GroupRepository} from 'app/api/dynamic-library/application-logic/group/repository/group.repository';
import {GroupService} from 'app/api/dynamic-library/application-logic/group/service/group.service';
import {UserService} from 'app/api/dynamic-library/application-logic/user/service/user.service';
import {UpdateGroupComponent} from 'app/view/group/submodule/update-group/update-group.component';
@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[UpdateGroupComponent],
  declarations: [
    UpdateGroupComponent
  ], 
  providers: [GroupRepository, GroupService, UserRepository, UserService, UserByGroupService, GroupByUserService]
})
export class UpdateGroupModule { }