import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { ClausesComponent } from './clauses/clauses.component';
import { ClausesKitListComponent } from './clauses-kit-list/clauses-kit-list.component';
import { PhraseDetailComponent } from './phrase-detail/phrase-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/kit-list', pathMatch: 'full' },
  { path: 'kit-list', component: ClausesKitListComponent },
  { path: 'clauses', component: ClausesComponent },
  { path: 'detail/:id', component: PhraseDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
