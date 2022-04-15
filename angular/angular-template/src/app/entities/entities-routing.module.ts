import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntitiesCreateComponent} from "./entities-create/entities-create.component";
import {EntitiesListComponent} from "./entities-list/entities-list.component";
import {EntitiesEditComponent} from "./entities-edit/entities-edit.component";


const routes: Routes = [
  {path:"entities",component:EntitiesListComponent},
  {path: "entities/create", component: EntitiesCreateComponent},
  {path: "entities/update/:id", component: EntitiesEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
