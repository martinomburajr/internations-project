
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGroupComponent} from 'app/view/group/submodule/create-group/create-group.component';

export const routes : Routes = [
  {
    path: '',
    component: CreateGroupComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CreateGroupRoutingModule {}
