import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimpleModalTemplateComponent} from 'app/components/template/modal/simple-modal/simple-modal.template';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule
  ],
  exports:[SimpleModalTemplateComponent],
  declarations: [SimpleModalTemplateComponent]
})
export class SimpleModalTemplateModule { }