import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarTemplateModule } from '../../../../components/template/search-bar/concrete/search-bar.template.module';
import { MasterDetailTemplateModule } from '../../../../components/template/master-detail/master-detail.module';
import { SimpleListTemplateModule } from '../../../../components/template/list/simple-list/simple-list.module';
import { UserRepository } from '../../../../api/dynamic-library/application-logic/user/repository/user.repository';
import {NgModule} from '@angular/core';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';
import {CreateGroupRoutingModule} from 'app/view/group/submodule/create-group/create-group.routing';
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
    ReactiveFormsModule,
    SearchBarTemplateModule,
    MasterDetailTemplateModule,
    SimpleListTemplateModule
  ],
  exports:[CreateGroupComponent],
  declarations: [
    UpdateGroupComponent
], providers: [GroupRepository, GroupService, UserRepository, UserService]
})
export class UpdateGroupModule { }