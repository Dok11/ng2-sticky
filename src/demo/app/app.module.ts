import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StickyModule } from 'ngx-sticky-kit';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, StickyModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
