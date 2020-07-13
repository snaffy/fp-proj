import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-fp-az.us.auth0.com/',
  clientId: '38mPLF5BJ2pwkFykjWJyVy0xcO2MZl7R',
  responseType: 'code',
  logoutUrl: 'http://localhost:4200',
  redirectUri: 'http://localhost:4200',
  scope: 'openid'
};
