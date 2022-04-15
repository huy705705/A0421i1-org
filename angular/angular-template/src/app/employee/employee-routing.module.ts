import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "../sercurity/auth.guard";
import {EmployeeCreateComponent} from "./employee-create/employee-create.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";


const routes: Routes = [
  {path:'admin/employee',component: EmployeeListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
  {path:'admin/employee/update/:id',component: EmployeeEditComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
