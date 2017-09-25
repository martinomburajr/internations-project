import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalTemplateComponent} from 'app/components/template/modal/modal.template';
import {SimpleModalTemplateModule} from 'app/components/template/modal/simple-modal/simple-modal.template.module';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from 'clarity-angular';
import {NglModule} from 'ng-lightning';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule,
    SimpleModalTemplateModule
  ],
  declarations: [ModalTemplateComponent]
})
export class ModalTemplateModule { }