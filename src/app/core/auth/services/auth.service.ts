import {Injectable} from '@angular/core';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject} from 'rxjs';
import {authConfig} from '../auth-config';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.logAboutAuthorizationProcess();
    this.subscribeForCheckingIsAuthenticated();
  }

  public runInitialLoginSequence(): Promise<void> {
    return this.oauthService.loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }
      });
  }

  public login(): void {
    this.oauthService.initCodeFlow('/');
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  private logAboutAuthorizationProcess(): void {
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });
  }

  private subscribeForCheckingIsAuthenticated(): void {
    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      });
  }
}
