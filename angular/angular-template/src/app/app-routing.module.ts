
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {NewListComponent} from "./new/new-list/new-list.component";


const routes: Routes = [
  {path: '', component: NewListComponent}
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
