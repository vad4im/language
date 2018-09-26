import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { FieldConfig, Validator } from '../../field.interface';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createGroup();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === 'button') { return; }
      // const control = this.fb.control(field.value,
      //                                this.bindValidations(field.validations || []));
      group.addControl(field.name, this.createControl(field));
    });
    return group;
  }

  createControl(config: FieldConfig): any {
    const { disabled, validations, value } = config;
    if (config.type === 'multiCheckbox') {
      return this.fb.array(
        config.options.map(x => {
          return this.fb.group({
            name: x,
            value: value ? value.indexOf(x) > - 1 : false
          });
        }));
    }
    if (config.type === 'checkboxBlock') {
      return this.fb.array(
        config.options.map(x => {
          return this.fb.group({
            name: x,
            value: value ? value.indexOf(x) > - 1 : false,
            order: 0
          });
        }));
    }
    return this.fb.control({ disabled, value }, this.bindValidations(validations || []));
  }




  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
