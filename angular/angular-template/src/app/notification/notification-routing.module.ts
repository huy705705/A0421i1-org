import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationListComponent} from "./notification-list/notification-list.component";
import {NotificationEditComponent} from "./notification-edit/notification-edit.component";
import {NotificationCreateComponent} from "./notification-create/notification-create.component";


const routes: Routes = [
  {path:'notification',component:NotificationListComponent},
  {path:'notification/update',component:NotificationEditComponent},
  {path:'notification/create',component:NotificationCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
