import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CageRoutingModule } from './cage-routing.module';
import { CageListComponent } from './cage-list/cage-list.component';
import { CageCreateComponent } from './cage-create/cage-create.component';
import { CageEditComponent } from './cage-edit/cage-edit.component';
import { CageDeleteComponent } from './cage-delete/cage-delete.component';


@NgModule({
  declarations: [CageListComponent, CageCreateComponent, CageEditComponent, CageDeleteComponent],
  imports: [
    CommonModule,
    CageRoutingModule
  ]
})
export class CageModule { }
