import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormErrorHandlerComponent } from './form-error-handler/form-error-handler.component';
import { LoadDataSpinnerComponent } from './load-data-spinner/load-data-spinner.component';

@NgModule({
  declarations: [FormErrorHandlerComponent, LoadDataSpinnerComponent],
  exports: [
    FormErrorHandlerComponent,
    LoadDataSpinnerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}
