import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationSearchComponent } from './application-search/application-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgSelect2Module } from 'ng-select2';
import {HttpClientModule} from "@angular/common/http";
import { PartDetailComponent } from './part-detail/part-detail.component';
import { ApplicationCoverageComponent } from './application-coverage/application-coverage.component';
import { ApplicationRefPaginationComponent } from './application-ref-pagination/application-ref-pagination.component';
import {CollapsibleModule} from "angular2-collapsible";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationSearchComponent,
    PartDetailComponent,
    ApplicationCoverageComponent,
    ApplicationRefPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule,
      NgSelect2Module,
      HttpClientModule,
      ReactiveFormsModule,
      CollapsibleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
