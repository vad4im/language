import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../field.interface';
@Component({
  selector: 'app-checkbox-block',
  templateUrl: 'checkbox-block.component.html',
  styleUrls: ['checkbox-block.component.css']
})
export class CheckboxBlockComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
