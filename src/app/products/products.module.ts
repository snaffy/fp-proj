import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';

import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductListComponent} from './product-list/product-list.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {ProductService} from '../core/services/product.service';


@NgModule({
  declarations: [ProductDetailsComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [ProductService]
})
export class ProductsModule {
}
