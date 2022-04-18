import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewRoutingModule } from './new-routing.module';
import { NewListComponent } from './new-list/new-list.component';
import { NewCreateComponent } from './new-create/new-create.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { NewDeleteComponent } from './new-delete/new-delete.component';
import {NewsService} from '../service/news.service'

@NgModule({
  declarations: [NewListComponent, NewCreateComponent, NewEditComponent, NewDeleteComponent],
  exports: [
    NewListComponent,
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    ReactiveFormsModule, FormsModule
  ],
  providers:[NewsService]
})
export class NewModule { }
