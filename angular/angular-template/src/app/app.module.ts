import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {EmployeeModule} from "./employee/employee.module";
import {EntitiesModule} from "./entities/entities.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EntitiesService} from "./service/entities.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [EntitiesService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EntitiesModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
