import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EntitiesDeleteComponent} from "./entities-delete/entities-delete.component";
import {EntitiesCreateComponent} from "./entities-create/entities-create.component";
import {EntitiesListComponent} from "./entities-list/entities-list.component";
import {EntitiesEditComponent} from "./entities-edit/entities-edit.component";
import {Error404Component} from "../component/error404/error404.component";


const routes: Routes = [
  {path:"entities",component:EntitiesListComponent},
  {path:"entities/delete/:id",component:EntitiesDeleteComponent},
  {path: "entities/create", component: EntitiesCreateComponent},
  {path: "entities/update/:id", component: EntitiesEditComponent},
  {path: '404', component: Error404Component},
  // {path: "**", redirectTo: "/404"},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
