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

  ngOnInit(){
    console.log('Form edit data.fieldConfig : ' );
    this.regConfig =
      [
      {
        type: 'input',
        label: 'Phrase',
        inputType: 'text',
        name: 'orig',
        value: 'YES',
        validations: [
          {
            name: 'required',
            validator: Validators.required,
            message: 'Phrase Required'
          },
          {
            name: 'pattern',
            validator: Validators.pattern('^[a-zA-Z]+$'),
            message: 'Accept only text'
          }
        ]
      },
      {
        type: 'input',
        label: 'Orign transcript',
        inputType: 'text',
        name: 'origTr'
      },
      {
        type: 'input',
        label: 'Translate',
        inputType: 'text',
        name: 'transl'
      },
      {
        type: 'input',
        label: 'Translate transcr',
        inputType: 'text',
        name: 'translTr'
      }
    ];

  }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  regConfig: FieldConfig[];


  // this.data;
/*
    [
    {
      type: 'input',
      label: 'Username',
      inputType: 'text',
      name: 'name',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Name Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }
      ]
    },
    {
      type: 'input',
      label: 'Email Address',
      inputType: 'email',
      name: 'email',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Email Required'
        },
        {
          name: 'pattern',
          validator: Validators.pattern(
            '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
          ),
          message: 'Invalid email'
        }
      ]
    },
    {
      type: 'input',
      label: 'Password',
      inputType: 'password',
      name: 'password',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Password Required'
        }
      ]
    },
    {
      type: 'radiobutton',
      label: 'Gender',
      name: 'gender',
      options: ['Male', 'Female'],
      value: 'Male'
    },
    {
      type: 'date',
      label: 'DOB',
      name: 'dob',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Date of Birth Required'
        }
      ]
    },
    {
      type: 'select',
      label: 'Country',
      name: 'country',
      value: 'UK',
      options: ['India', 'UAE', 'UK', 'US']
    },
    {
      type: 'checkbox',
      label: 'Accept Terms',
      name: 'term',
      value: true
    },
    {
      type: 'button',
      label: 'Save'
    }
  ];
*/
  submit(value: any) {}


  onNoClick(): void { this.dialogRef.close(); }
}
