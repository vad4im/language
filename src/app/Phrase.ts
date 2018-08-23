import { Validators } from '@angular/forms';
import { FieldConfig } from './field.interface';

interface Serializable<T> {
  deserialize(input: Object): T;
}

export class Phrase implements  Serializable<Phrase>  {
    _id: string;
    clausesKitId: string;
    id: number;
    orig: string;
    origTr: string;
    transl: string;
    translTr: string;
    origSound: string;
    translSound: string;
      constructor (kitId: string) {
        this._id = null;
        this.clausesKitId = kitId;
        this.id = null;
        this.orig = null;
        this.origTr = null;
        this.transl = null;
        this.translTr = null;
        this.origSound = null;
        this.translSound = null;
      }
  deserialize(input) {
console.log('Phrase deserialize - input.orig :' + input.orig );
    if (typeof input._id !== 'undefined') {this._id = input._id; }
    if (typeof input.clausesKitId !== 'undefined') {this.clausesKitId = input.clausesKitId; }
    if (typeof input.id !== 'undefined') {this.id = input.id; }
    if (typeof input.orig !== 'undefined') {this.orig = input.orig; }
    if (typeof input.origTr !== 'undefined') {this.origTr = input.origTr; }
    if (typeof input.transl !== 'undefined') {this.transl = input.transl; }
    if (typeof input.translTr !== 'undefined') {this.translTr = input.translTr;}
    if (typeof input.origSound !== 'undefined') {this.origSound = input.origSound;}
    if (typeof input.translSound !== 'undefined') {this.translSound = input.translSound;}
    return this;
  }
      getFieldConfig( fieldList: string[]): FieldConfig[]  {
        const retValue = [];
        for (let j = 0; j < fieldList.length; j++ ) {
          for (let i = 0; i < conf.length; i++) {
            if (conf[i].name ===  fieldList[j] ) {
              let v = conf[i];
              v['value'] = this[conf[i].name];
              retValue.push(v);
            }
          }
        }
         return retValue;
      }
  }

const conf = [
  {
    type: 'input',
    label: 'DB Id',
    inputType: 'text',
    name: '_id',
    value: ''
  },
  {
    type: 'input',
    label: 'Kit  DB Id',
    inputType: 'text',
    name: 'clausesKitId',
    value: ''
  },
  {
    type: 'input',
    label: 'Order',
    inputType: 'text',
    name: 'id',
    value: ''
  },
  {
    type: 'input',
    label: 'Phrase',
    inputType: 'text',
    name: 'orig',
    value:  '',
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
  }
]

