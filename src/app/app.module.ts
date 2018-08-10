import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialModule} from './material.modules';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClausesComponent } from './clauses/clauses.component';
import { PhraseDetailComponent } from './phrase-detail/phrase-detail.component';
import { ClausesKitListComponent } from './clauses-kit-list/clauses-kit-list.component';
import { PhraseSearchComponent } from './phrase-search/phrase-search.component';
import { MessagesComponent } from './messages/messages.component';
import { ResourceComponent } from './resource/resource.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { ClausesKitService } from './clauses-kit.service';
import { SimpleTableComponent } from './simple-table/simple-table.component';
import { SecondTableComponent } from './second-table/second-table.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,  NO Anomation

    AppRoutingModule,

    MaterialModule,
    MatGridListModule

  ],
  declarations: [
    AppComponent,
    ClausesComponent,
    PhraseDetailComponent,
    MessagesComponent,
    ClausesKitListComponent,
    PhraseSearchComponent,
    ResourceComponent,

    SimpleTableComponent,
    SecondTableComponent,
    StatusBarComponent
  ],
  providers:    [ ClausesKitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
