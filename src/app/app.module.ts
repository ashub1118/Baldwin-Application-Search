import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationSearchComponent } from './application-search/application-search.component';
import {FormsModule} from "@angular/forms";
import { NgSelect2Module } from 'ng-select2';
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    ApplicationSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      NgSelect2Module,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
