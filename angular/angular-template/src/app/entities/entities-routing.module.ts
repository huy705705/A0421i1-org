import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntitiesListComponent} from "./entities-list/entities-list.component";
import {EntitiesDeleteComponent} from "./entities-delete/entities-delete.component";


const routes: Routes = [
  {path:"entities",component:EntitiesListComponent},
  {path:"entities/delete/:id",component:EntitiesDeleteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
