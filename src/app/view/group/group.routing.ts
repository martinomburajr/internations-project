import { GroupComponent } from './group.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      // {
      //   path: 'groups/create-group',
      //   loadChildren: './submodule/create-group/create-group.module#CreateGroup'
      // },
      // {
      //   path: 'groups/update-group',
      //   loadChildren: './submodule/update-group/update-group.module#UpdateGroup'
      // },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GroupRoutingModule {}
