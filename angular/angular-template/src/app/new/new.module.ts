import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoutingModule } from './new-routing.module';
import { NewCreateComponent } from './new-create/new-create.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { NewDeleteComponent } from './new-delete/new-delete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NewListComponent} from "./new-list/new-list.component";


@NgModule({
  declarations: [NewListComponent, NewCreateComponent, NewEditComponent, NewDeleteComponent],
    imports: [
        CommonModule,
        NewRoutingModule,
        ReactiveFormsModule
    ]
})
export class NewModule { }
