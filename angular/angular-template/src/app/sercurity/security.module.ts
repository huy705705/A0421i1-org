import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, VerifyPasswordComponent],
  exports: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ]
})
export class SecurityModule { }
