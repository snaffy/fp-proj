import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductOrderService} from '../../core/services/product-order.service';
import {Order} from '../../model/order';
import {ProductService} from '../../core/services/product.service';
import {map, switchMap} from 'rxjs/operators';
import {OrderDetails, OrderSummary} from '../../model/order-summary';
import {Observable, of, Subscription} from 'rxjs';
import {Product} from '../../model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit, OnDestroy {

  orderSummary: OrderSummary;
  isPurchasesFinished = false;
  private orderSummarySubscription: Subscription;

  constructor(private productOrderService: ProductOrderService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productOrderService.refreshCurrentOrders();
    this.subscribeToOrderSummary();
  }

  ngOnDestroy(): void {
    this.orderSummarySubscription.unsubscribe();
  }

  purchase(): void {
    this.productOrderService.purchase();
    // this.subscribeToOrderSummary();
    this.isPurchasesFinished = true;
  }

  private getProductIds(orders: Array<Order>): Array<string> {
    const ids = new Array<string>();
    orders.forEach(order => ids.push(order.productId));
    return ids;
  }

  private subscribeToOrderSummary(): void {
    this.orderSummarySubscription = this.productOrderService.orders
      .pipe(
        switchMap(order => {
          return this.createOrderSummaryIfOrderIsPresent(order);
        }))
      .subscribe(orderDetails => {
        this.orderSummary = new OrderSummary(orderDetails);
      });
  }

  private createOrderSummaryIfOrderIsPresent(orders: Array<Order>): Observable<Array<OrderDetails>> {
    if (orders.length === 0) {
      return of([]);
    } else {
      return this.productService.getProductByIds(this.getProductIds(orders))
        .pipe(map(productDetails => this.merge(productDetails, orders)));
    }
  }

  private merge(productDetails: Array<Product>, orders: Array<Order>): Array<OrderDetails> {
    const ordersDetails = new Array<OrderDetails>();
    for (let i = 0; i < productDetails.length; i++) {
      ordersDetails.push({
          name: productDetails[i].name,
          pricePerUnit: productDetails[i].price,
          quantity: +(orders.find((itmInner) => itmInner.productId === productDetails[i].id)).quantity
        }
      );
    }
    return ordersDetails;
  }

}
