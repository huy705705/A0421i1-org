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

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {ComponentModule} from "./component/component.module";


import { authInterceptorProviders } from './sercurity/auth.interceptor ';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { ComponentModule } from './component/component.module';
import {EmployeeModule} from "./employee/employee.module";
import {NotificationModule} from "./notification/notification.module";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";



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
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    EntitiesModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ComponentModule,
    AppRoutingModule,
    SecurityModule,
    EmployeeModule,
    NotificationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
