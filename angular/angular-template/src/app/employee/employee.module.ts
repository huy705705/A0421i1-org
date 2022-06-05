import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [EmployeeListComponent, EmployeeCreateComponent, EmployeeEditComponent, EmployeeDeleteComponent],
  exports: [
    EmployeeListComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        FormsModule,
        MatDialogModule
    ],
  providers:[]
})
export class EmployeeModule { }
