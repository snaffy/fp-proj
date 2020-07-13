import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../core/auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  private isAuthenticatedSubscription: Subscription;

  constructor(public authService: AuthService) {
    this.isAuthenticatedSubscription = this.authService.isAuthenticated$.subscribe(value => {
      this.isAuthenticated = value;
    });
    this.authService.runInitialLoginSequence();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
