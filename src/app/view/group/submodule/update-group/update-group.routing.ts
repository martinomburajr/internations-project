
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateGroupComponent} from 'app/view/group/submodule/update-group/update-group.component';
export const routes : Routes = [
  {
    path: '',
    component: UpdateGroupComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UpdateGroupRoutingModule {}
