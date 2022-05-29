import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationListComponent} from "./notification-list/notification-list.component";
import {NotificationEditComponent} from "./notification-edit/notification-edit.component";
import {NotificationCreateComponent} from "./notification-create/notification-create.component";
import {EmployeeListComponent} from "../employee/employee-list/employee-list.component";
import {AuthGuard} from "../sercurity/auth.guard";
import {EmployeeCreateComponent} from "../employee/employee-create/employee-create.component";
import {EmployeeEditComponent} from "../employee/employee-edit/employee-edit.component";


const routes: Routes = [
  {path:'employee/notification',component:NotificationListComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}},
  {path:'employee/notification/update/:id',component:NotificationEditComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
  {path:'employee/notification/create',component:NotificationCreateComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
