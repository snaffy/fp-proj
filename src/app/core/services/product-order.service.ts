import {Injectable} from '@angular/core';
import {Order} from '../../model/order';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {

  private _orders$ = new BehaviorSubject<Array<Order>>([]);

  constructor() {
  }

  get orders(): Observable<Array<Order>> {
    return this._orders$.asObservable();
  }

  purchase(): void {
    sessionStorage.clear();
    this.refreshCurrentOrders();
  }

  refreshCurrentOrders(): void {
    this.refreshCurrentOrdersSubject();
  }

  order(order: Order): void {
    let orders = new Array<Order>();
    if (sessionStorage.length > 0) {
      orders = JSON.parse(sessionStorage.getItem('orders')) as Array<Order>;
    }
    this.addOrder(orders, order);
    sessionStorage.setItem('orders', JSON.stringify(orders));

    this.refreshCurrentOrdersSubject();
  }

  private refreshCurrentOrdersSubject(): void {
    this._orders$.next(this.currentOrders());
  }

  private currentOrders(): Array<Order> {
    let currentOrders = new Array<Order>();
    if (sessionStorage.length > 0) {
      currentOrders = JSON.parse(sessionStorage.getItem('orders')) as Array<Order>;
    }
    return currentOrders;
  }

  private addOrder(currentOrders: Array<Order>, newOrder: Order): void {
    const foundOrder = currentOrders.filter(value => value.productId === newOrder.productId)[0];
    if (foundOrder) {
      foundOrder.quantity = foundOrder.quantity + newOrder.quantity;
      return;
    }
    currentOrders.push(newOrder);
  }
}
