import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationSearchComponent} from "./application-search/application-search.component";
import {PartDetailComponent} from "./part-detail/part-detail.component";
import {ApplicationCoverageComponent} from "./application-coverage/application-coverage.component";

const routes: Routes = [
    { path: '', component: ApplicationSearchComponent, pathMatch: 'full' },
    {path:'partDetail/:id', component: PartDetailComponent},
    { path: 'coverage/:partNumber', component: ApplicationCoverageComponent }
    ];

@NgModule({
    imports: [ RouterModule.forRoot(routes,{ useHash: true,scrollPositionRestoration: 'disabled' }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
