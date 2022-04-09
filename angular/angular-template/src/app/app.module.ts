import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EntitiesModule} from "./entities/entities.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EntitiesService} from "./service/entities.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [EntitiesService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EntitiesModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
