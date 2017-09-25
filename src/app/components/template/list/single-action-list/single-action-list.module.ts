import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleActionListComponent } from './single-action-list.component';
import {NglModule} from 'ng-lightning';
import {ClarityModule} from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forChild(),
    NglModule
  ],
  exports:[SingleActionListComponent],
  declarations: [SingleActionListComponent]
})
export class SingleActionListModule { }