import { Validators } from '@angular/forms';
import { FieldConfig } from './field.interface';

export class Phrase  {
    _id: string;
    clausesKitId: string;
    id: number;
    orig: string;
    origTr: string;
    transl: string;
    translTr: string;
    origSound: string;
    translSound: string;
  static getFieldConfig(data: Phrase): FieldConfig[] {
        let retValue = [];
  static const conf = [
          {
            type: 'input',
            label: 'Phrase',
            inputType: 'text',
            name: 'orig',
            value:  'AAA',
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
            name: 'origTr',
            value: ''
          },
          {
            type: 'input',
            label: 'Translate',
            inputType: 'text',
            name: 'transl',
            value: ''
          },
          {
            type: 'input',
            label: 'Translate transcr',
            inputType: 'text',
            name: 'translTr',
            value: ''
          },
          {
            type: 'button',
            label: 'Save'
          }
        ]
    conf.forEach(function (value) {
      let v = value;
      v['value'] = data[value.name];
      retValue.push(v);
      console.log('------------1 '+ data[value.name]);
      console.log('------------2 '+ v.value);
      console.log('------------3 '+ retValue.length);
      // console.log('------------3 '+ retValue[1].value);
    });
    return retValue;
  };



  }

