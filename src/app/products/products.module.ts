import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductFilterComponent} from './product-filter/product-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {SharedModule} from '../shared/shared.module';
import {OrderModalComponent} from './order-modal/order-modal.component';
import {CartComponent} from './cart/cart.component';


@NgModule({
  declarations: [ProductDetailsComponent, ProductListComponent, ProductFilterComponent, OrderModalComponent, CartComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PaginationModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule {
}
