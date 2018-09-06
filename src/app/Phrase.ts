import { Validators } from '@angular/forms';
import { FieldConfig } from './field.interface';


export class Phrase {
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

  static getTableColList( ): any  {
    const retValue = [];
      for (let i = 0; i < conf.cells.length; i++) {
          retValue.push({name: conf.cells[i].name, label: conf.cells[i].label});
      }
    return retValue;
  }

   static createTableViewConf(tableFields: string[], multiselect : boolean ): any {
       const ret = conf.table;
       ret.cells = Phrase.getTableColList();
       ret.sellVisible =  tableFields;
       if (typeof multiselect !== 'undefined' ){
         ret.sellVisible.unshift(ret.checkColumn.name);
         ret.checkColumn.multiselect = multiselect;
       }
       return ret;
   }

  static createFieldsEditListConf( phrase: Phrase, fieldList: string[]): FieldConfig[]  {
    const retValue = [];
    for (let j = 0; j < fieldList.length; j++ ) {
      for (let i = 0; i < conf.cells.length; i++) {
        if (conf.cells[i].name ===  fieldList[j] ) {
          let v = conf.cells[i];
          v['value'] = phrase[conf.cells[i].name];
          retValue.push(v);
        }
      }
    }
    return retValue;
  }

  static serialize(phrase: Phrase, input ) {
console.log('Phrase deserialize - input.orig :' + input.orig );
    if (typeof input._id !== 'undefined') {phrase._id = input._id; }
    if (typeof input.clausesKitId !== 'undefined') {phrase.clausesKitId = input.clausesKitId; }
    if (typeof input.id !== 'undefined') {phrase.id = input.id; }
    if (typeof input.orig !== 'undefined') {phrase.orig = input.orig; }
    if (typeof input.origTr !== 'undefined') {phrase.origTr = input.origTr; }
    if (typeof input.transl !== 'undefined') {phrase.transl = input.transl; }
    if (typeof input.translTr !== 'undefined') {phrase.translTr = input.translTr;}
    if (typeof input.origSound !== 'undefined') {phrase.origSound = input.origSound;}
    if (typeof input.translSound !== 'undefined') {phrase.translSound = input.translSound;}
  }
  public getEditedFieldsList(input): Phrase {
    const editedPhrase = new Phrase(this.clausesKitId);
    Phrase.serialize(editedPhrase, this);
    Phrase.serialize(editedPhrase, input);
    return editedPhrase;
  }
  }

const conf = {
  table: {
    pageStt: {
      pageSizeOptions: [1, 3, 9],
      showFirstLastButtons: false,
      pageSize: 6,
    },
    checkColumn: {
      name: 'check',
      multiselect: false
    },
    cells: [],
    sort: {
      active: 'id', direction: 'desc'
    },
    sellVisible: ['id', 'orig', 'origTr', 'transl', 'translTr']
  },
  cells: [
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
]}

