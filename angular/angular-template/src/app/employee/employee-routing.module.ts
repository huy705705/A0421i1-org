import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';


const routesEmployee: Routes = [
  {
    path: 'employee',
    children: [
      {path: '', component: EmployeeListComponent},
      // {path: ':id',component: },
      {path: 'update/:employeeId', component: EmployeeEditComponent},
      {path: 'update', component: EmployeeEditComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesEmployee)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
