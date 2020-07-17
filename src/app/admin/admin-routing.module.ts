import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthGuard} from '../core/auth/auth.guard';
import {AdminMessagesComponent} from './admin-messages/admin-messages.component';
import {AdminProductAddComponent} from './admin-product-add/admin-product-add.component';
import {AdminProductEditComponent} from './admin-product-edit/admin-product-edit.component';

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: AdminMessagesComponent, canActivate: [AuthGuard]},
  {path: 'products/edit/:id', component: AdminProductEditComponent, canActivate: [AuthGuard]},
  {path: 'products/add', component: AdminProductAddComponent, canActivate: [AuthGuard]},
  {path: 'products', redirectTo: '/products', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
