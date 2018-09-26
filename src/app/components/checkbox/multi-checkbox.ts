import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
@Component({
  selector: 'app-multi-checkbox',
  templateUrl: 'multi-checkbox.html',
  styles: []
})
export class MultiCheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
