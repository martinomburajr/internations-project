import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning';
import {SearchService} from 'app/api/dynamic-library/core-logic/utility/search/search.service';
import {ClarityModule} from 'clarity-angular';
import {SimpleListComponent} from 'app/components/template/list/simple-list/simple-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule
  ],
  exports:[SimpleListComponent],
  declarations: [SimpleListComponent] 
})
export class SimpleListTemplateModule { }