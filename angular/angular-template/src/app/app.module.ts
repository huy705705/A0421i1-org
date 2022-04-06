import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EntitiesModule} from "./entities/entities.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EntitiesService} from "./service/entities.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntitiesModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [EntitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
