import { UpdateUserComponent } from './update-user.component';
import { ClarityModule } from 'clarity-angular/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLocalService } from '../../_local/user-local.service';
import { UserRepository } from '../../../../api/dynamic-library/application-logic/user/repository/user.repository';
import { UserService } from '../../../../api/dynamic-library/application-logic/user/service/user.service';
import { GroupRepository } from '../../../../api/dynamic-library/application-logic/group/repository/group.repository';
import { GroupService } from '../../../../api/dynamic-library/application-logic/group/service/group.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NglModule} from 'ng-lightning';
import {SimpleModalTemplateModule} from 'app/components/template/modal/simple-modal/simple-modal.template.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    NglModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateUserComponent],
  declarations: [UpdateUserComponent],
  providers:[UserService, UserRepository]
})
export class UpdateUserModule { }