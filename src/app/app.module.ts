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
import { ClausesKitComponent } from './clauses-kit/clauses-kit.component';

import { FormEditComponent } from './form-edit/form-edit.component';
// import { DynFormComponent} from './dyn-form/dyn-form.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFieldDirective} from './components/dynamic-field/dynamic-field.directive';
import {InputComponent} from './components/input/input.component';
import {DateComponent} from './components/date/date.component';
import {ButtonComponent} from './components/button/button.component';
import {RadiobuttonComponent} from './components/radiobutton/radiobutton.component';
import {SelectComponent} from './components/select/select.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormImportComponent } from './form-import/form-import.component';
import { CvsParse } from './components/parse-data/csv-parse.component';
import {CsvUtil} from './components/parse-data/csv-util';
import {CsvConf} from './components/parse-data/csv-conf';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {CheckboxBlockComponent} from './components/checkbox/checkbox-block.component';
import {MultiCheckboxComponent} from './components/checkbox/multi-checkbox';




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
    StatusBarComponent,
    ClausesKitComponent,

    FormEditComponent,
    // DynFormComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    DateComponent,
    CheckboxComponent,
    CheckboxBlockComponent,
    MultiCheckboxComponent,
    ButtonComponent,
    RadiobuttonComponent,
    SelectComponent,
    FileUploadComponent,
    FormImportComponent

  ],
  entryComponents: [
    FormImportComponent,
    FormEditComponent,
    InputComponent,
    DateComponent,
    CheckboxComponent,
    CheckboxBlockComponent,
    MultiCheckboxComponent,
    ButtonComponent,
    RadiobuttonComponent,
    SelectComponent
  ],
  providers:    [
    ClausesKitService,
    CvsParse,
    CsvUtil,
    CsvConf
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
