import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CageCreateComponent} from "./cage-create/cage-create.component";
import {AuthGuard} from "../sercurity/auth.guard";
import {CageEditComponent} from "./cage-edit/cage-edit.component";


const routes: Routes = [
  {path: 'employee/cage/create', component: CageCreateComponent, canActivate:[AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
  {path: 'employee/cage/edit/:id', component: CageEditComponent, canActivate:[AuthGuard], data:{expectedRole: ['ROLE_EMPLOYEE', 'ROLE_ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CageRoutingModule { }
