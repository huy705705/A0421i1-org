import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './new-list/new-list.component';
import { EnititiesIllnessListComponent } from '../entities-illness/enitities-illness-list/enitities-illness-list.component'
import { EmployeeListComponent } from '../employee/employee-list/employee-list.component'

const routes: Routes = [
  // {
  //   path: 'employee', 
  //   children: [
  //     {path: '', component: EmployeeListComponent},
  //   ]
  // },
  // {
  //   path: 'entities', 
  //   children: [
  //     {path: '', component: EnititiesIllnessListComponent},
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewRoutingModule { }
