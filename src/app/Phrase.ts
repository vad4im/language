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
      getFieldConfig(): FieldConfig[] {
        return [
          {
            type: 'input',
            label: 'Phrase',
            inputType: 'text',
            name: 'orig',
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
          },
          {
            type: 'button',
            label: 'Save'
          }
        ];

  }

  }

