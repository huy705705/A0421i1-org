import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './new/new-list/new-list.component'
import { EmployeeListComponent } from './employee/employee-list/employee-list.component'
import { EnititiesIllnessListComponent } from './entities-illness/enitities-illness-list/enitities-illness-list.component'
import { LoginComponent } from './sercurity/login/login.component'

const routes: Routes = [
{path: "", component: NewListComponent},
{path: "employee", component: EmployeeListComponent},
{path: "entities", component: EnititiesIllnessListComponent},
{path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
