
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {NotificationListComponent} from "./notification/notification-list/notification-list.component";



import {NewListComponent} from "./new/new-list/new-list.component";
import {ContactComponent} from "./component/contact/contact.component";
import {CageListComponent} from "./cage/cage-list/cage-list.component";

const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: '', component: NewListComponent},
    {path:'notification',component:NotificationListComponent},

  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
