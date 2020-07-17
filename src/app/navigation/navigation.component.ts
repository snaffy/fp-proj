import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/services/auth.service';
import {Subscription} from 'rxjs';
import {ProductOrderService} from '../core/services/product-order.service';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons/faShoppingCart';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  productOrdersCount = 0;
  private isAuthenticatedSubscription: Subscription;
  private ordersCountSubscription: Subscription;
  faShoppingCartIcon = faShoppingCart;

  constructor(public authService: AuthService, private productOrderService: ProductOrderService) {
    this.initializeIsAuthenticated();
    this.authService.runInitialLoginSequence();
  }

  ngOnInit(): void {
    this.initializeProductOrdersCount();
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
    this.ordersCountSubscription.unsubscribe();
  }

  private initializeIsAuthenticated(): void {
    this.productOrderService.refreshCurrentOrders();
    this.isAuthenticatedSubscription = this.authService.isAuthenticated$.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

  private initializeProductOrdersCount(): void {
    this.ordersCountSubscription = this.productOrderService.orders.subscribe(value => {
      this.productOrdersCount = value.length;
    });
  }
}
