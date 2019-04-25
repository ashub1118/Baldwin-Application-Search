import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationSearchComponent} from "./application-search/application-search.component";

const routes: Routes = [
    { path: '', component: ApplicationSearchComponent, pathMatch: 'full' }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
