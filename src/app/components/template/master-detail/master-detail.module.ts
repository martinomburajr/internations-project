import { SingleActionListModule } from '../list/single-action-list/single-action-list.module';
import { SimpleListTemplateModule } from '../list/simple-list/simple-list.module';
import { MasterDetailTemplate } from './master-detail.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning';
import {SearchService} from 'app/api/dynamic-library/core-logic/utility/search/search.service';
import {ClarityModule} from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    SimpleListTemplateModule,
    SingleActionListModule,
    NglModule
  ],
  exports:[MasterDetailTemplate],
  declarations: [MasterDetailTemplate]
})
export class MasterDetailTemplateModule { }