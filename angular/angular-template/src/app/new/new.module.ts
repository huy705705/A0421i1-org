import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';

import { NewCreateComponent } from './new-create/new-create.component';
import { NewEditComponent } from './new-edit/new-edit.component';
import { NewDeleteComponent } from './new-delete/new-delete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NewListComponent} from "./new-list/new-list.component";
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { WeatherComponent } from './weather/weather.component';
import { StatiticalComponent } from './statitical/statitical.component';

@NgModule({
  declarations: [NewListComponent, NewCreateComponent, NewEditComponent, NewDeleteComponent, WeatherComponent, StatiticalComponent],
    imports: [
        CommonModule,
        NewRoutingModule,
        ReactiveFormsModule,
        MatCarouselModule,
    ]
})
export class NewModule { }
