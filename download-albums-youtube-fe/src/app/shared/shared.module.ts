import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UrlInputComponent } from './components/url-input/url-input.component';

const components = [AlertComponent, LoaderComponent, UrlInputComponent];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [components]
})
export class SharedModule { }
