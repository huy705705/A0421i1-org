
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {NotificationListComponent} from "./notification/notification-list/notification-list.component";


const routes: Routes = [
  // {path: '', component: NewListComponent}
  {path:'notification',component:NotificationListComponent},

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
