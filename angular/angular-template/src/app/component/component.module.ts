import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { Error404Component } from './error404/error404.component';
import {EntitiesModule} from "../entities/entities.module";
import { NewModule } from '../new/new.module';
import {RouterModule} from "@angular/router";





@NgModule({

  declarations: [FooterComponent, HeaderComponent, Error404Component],
  imports: [
    CommonModule,
    EntitiesModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NewModule
  ],
})
export class ComponentModule { }
