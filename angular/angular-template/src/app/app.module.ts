import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SecurityModule} from "./sercurity/security.module";
import {ComponentModule} from "./component/component.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SecurityModule,
        ComponentModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
