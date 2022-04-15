import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module'
import { NewModule } from './new/new.module';
import {NewsService} from './service/news.service'
import { MyserviceService } from './myservice.service';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [NewsService,MyserviceService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    NewModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, NgbAlertModule,
    FormsModule,
    ReactiveFormsModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
