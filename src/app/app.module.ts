import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [BaseComponent]
})
export class AppModule { }
