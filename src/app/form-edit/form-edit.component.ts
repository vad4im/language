import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Validators } from '@angular/forms';
import { FieldConfig } from '../field.interface';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit{
  constructor(public dialogRef: MatDialogRef<FormEditComponent>
               ,@Inject(MAT_DIALOG_DATA)    public data: any
  ) { }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];


  ngOnInit(){
    this.regConfig = this.data;
    // console.log('Form edit data.fieldConfig length: ' +  this.regConfig.length );
  }

  submit(value: any) {}

  onNoClick(): void { this.dialogRef.close(); }
}
