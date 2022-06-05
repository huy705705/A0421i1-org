import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CageRoutingModule } from './cage-routing.module';
import { CageListComponent } from './cage-list/cage-list.component';
import { CageCreateComponent } from './cage-create/cage-create.component';
import { CageEditComponent } from './cage-edit/cage-edit.component';
import { CageDeleteComponent } from './cage-delete/cage-delete.component';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import { CageHistoryComponent } from './cage-history/cage-history.component';
import {AppModule} from "../app.module";
import {ValidatorModule} from "../validator/validator.module";


@NgModule({
  declarations: [CageListComponent, CageCreateComponent, CageEditComponent, CageDeleteComponent, CageHistoryComponent],
    imports: [
        CommonModule,
        CageRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ValidatorModule,
    ]
})
export class CageModule { }
