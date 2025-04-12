import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/Auth/login/login.component';


import { WarehouseListComponent } from './modules/Warehouse/warehouse-list/warehouse-list.component';
import { WarehouseFormComponent } from './modules/Warehouse/warehouse-form/warehouse-form.component';

import { ItemFormComponent } from './modules/Item/item-form/item-form.component';

import { UserListComponent } from './modules/User/user-list/user-list.component';
import { UserFormComponent } from './modules/User/user-form/user-form.component';
import { ChangePasswordComponent } from './modules/User/change-password/change-password.component';
import { MainLayoutComponent } from './Core/layout/main-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { LogViewerComponent } from './modules/logs/log-viewer/log-viewer.component';
import { ItemsListComponent } from './modules/Item/items-list/items-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'warehouse',
        children: [
          { path: '', component: WarehouseListComponent },
          { path: 'add', component: WarehouseFormComponent },
          { path: 'edit/:id', component: WarehouseFormComponent },
          { path: 'items/add/:warehouseId', component: ItemFormComponent },
          { path: 'items/edit/:itemId', component: ItemFormComponent }
        ]
      },

      {
        path: 'users',
        children: [
          { path: '', component: UserListComponent },
          { path: 'add', component: UserFormComponent },
          { path: 'edit/:id', component: UserFormComponent },
          { path: 'change-password/:id', component: ChangePasswordComponent }
        ]
      },

      { path: 'logs', component: LogViewerComponent },
      {
        path: 'items',
        children: [
          { path: '', component: ItemsListComponent },
          { path: 'add', component: ItemFormComponent },
          { path: 'edit/:itemId', component: ItemFormComponent }
        ]
      }
    ]
  },

  // Optional: fallback route
  { path: '**', redirectTo: 'login' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
