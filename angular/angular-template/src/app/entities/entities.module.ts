import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesRoutingModule } from './entities-routing.module';
import { EntitiesCreateComponent } from './entities-create/entities-create.component';
import { EntitiesListComponent } from './entities-list/entities-list.component';
import { EntitiesEditComponent } from './entities-edit/entities-edit.component';
import { EntitiesDeleteComponent } from './entities-delete/entities-delete.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [EntitiesCreateComponent, EntitiesListComponent, EntitiesEditComponent, EntitiesDeleteComponent],
    imports: [
        CommonModule,
        EntitiesRoutingModule,
        ReactiveFormsModule
    ]
})
export class EntitiesModule { }
