import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {SecurityModule} from "./sercurity/security.module";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntitiesModule} from "./entities/entities.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EntitiesService} from "./service/entities.service";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "./component/component.module";
import { authInterceptorProviders } from './sercurity/auth.interceptor ';

@NgModule({
  declarations: [
    AppComponent
  ],

  providers: [
    EntitiesService,
    authInterceptorProviders,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EntitiesModule,
    SecurityModule,
    ComponentModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
