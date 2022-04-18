import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EntitiesModule} from "./entities/entities.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EntitiesService} from "./service/entities.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentModule} from "./component/component.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [EntitiesService],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EntitiesModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ComponentModule,
    AppRoutingModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
