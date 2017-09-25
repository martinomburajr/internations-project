import { LayoutComponent } from './view/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'groups',
        loadChildren: './view/group/group.module#GroupModule'
      },
      {
        path: 'groups/create-group',
        loadChildren: './view/group/submodule/create-group/create-group.module#CreateGroupModule'
      },
      {
        path: 'groups/update-group',
        loadChildren: './view/group/submodule/update-group/update-group.module#UpdateGroupModule'
      },
      {
        path: 'users',
        loadChildren: './view/user/user.module#UserModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
