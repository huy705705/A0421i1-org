import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationCreateComponent } from './notification-create/notification-create.component';
import { NotificationDeleteComponent } from './notification-delete/notification-delete.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FilesModule} from "../files/files.module";
import {ImageCropperModule} from "ngx-image-cropper";


@NgModule({
  declarations: [NotificationListComponent, NotificationEditComponent, NotificationCreateComponent, NotificationDeleteComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    FilesModule,
    ImageCropperModule
  ]
})
export class NotificationModule { }
