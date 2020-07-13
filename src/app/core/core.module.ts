import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {OAuthModule} from 'angular-oauth2-oidc';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PaginationModule.forRoot(),
    OAuthModule.forRoot()
  ]
})
export class CoreModule {}
