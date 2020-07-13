import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductFilterComponent} from './product-filter/product-filter.component';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ProductDetailsComponent, ProductListComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PaginationModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductsModule {
}
