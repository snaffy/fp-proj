import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminMessagesComponent} from './admin-messages/admin-messages.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminProductFormComponent} from './admin-product-form/admin-product-form.component';
import {AdminProductAddComponent} from './admin-product-add/admin-product-add.component';
import {AdminProductEditComponent} from './admin-product-edit/admin-product-edit.component';
import {AdminRoutingModule} from './admin-routing.module';
import {NgxCurrencyModule} from 'ngx-currency';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ProductFormModalComponent} from './product-form--modal/product-form-modal.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminMessagesComponent,
    AdminProductsComponent,
    AdminProductFormComponent,
    AdminProductAddComponent,
    AdminProductEditComponent,
    ProductFormModalComponent,
  ],
  imports: [
    NgxCurrencyModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PaginationModule
  ]
})
export class AdminModule {
}
