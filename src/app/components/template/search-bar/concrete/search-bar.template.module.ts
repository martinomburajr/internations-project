import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning';
import { SearchBarTemplate } from './search-bar.template.component';
import {SearchService} from 'app/api/dynamic-library/core-logic/utility/search/search.service';
import {ClarityModule} from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule
  ],
  exports:[SearchBarTemplate],
  declarations: [SearchBarTemplate],
  providers:[SearchService], 
})
export class SearchBarTemplateModule { }