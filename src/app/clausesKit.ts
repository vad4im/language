import { Validators } from '@angular/forms';
import { FieldConfig } from './field.interface';

export class ClausesKit  {
  _id: string;
  id: number;
  clausesName: string;
  origLang: string;
  translLang: string;
  sourceUrl: string;
  constructor() {
    this._id = null;
    this.id = null;
    this.clausesName = null;
    this.origLang = null;
    this.translLang = null;
    this.sourceUrl = null;
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
    ret.cells = ClausesKit.getTableColList();
    ret.sellVisible =  tableFields;
    if (typeof multiselect !== 'undefined' ){
      ret.sellVisible.unshift(ret.checkColumn.name);
      ret.checkColumn.multiselect = multiselect;
    }
    return ret;
  }
  static createFieldsEditListConf( kit: ClausesKit, fieldList: string[]): FieldConfig[]  {
    const retValue = [];
    for (let j = 0; j < fieldList.length; j++ ) {
      for (let i = 0; i < conf.cells.length; i++) {
        if (conf.cells[i].name ===  fieldList[j] ) {
          let v = conf.cells[i];
          v['value'] = kit[conf.cells[i].name];
          retValue.push(v);
        }
      }
    }
    return retValue;
  }
  static getEditedFieldsList(kit: ClausesKit, input): ClausesKit {
    const editedPhrase = new ClausesKit();
    ClausesKit.serialize(editedPhrase, kit);
    ClausesKit.serialize(editedPhrase, input);
    return editedPhrase;
  }
  static serialize(kit: ClausesKit, input ) {
    console.log('Phrase deserialize - input.orig :' + input.clausesName );
    if (typeof input._id !== 'undefined') {kit._id = input._id; }
    if (typeof input.id !== 'undefined') {kit.id = input.id; }
    if (typeof input.clausesName !== 'undefined') {kit.clausesName = input.clausesName; }
    if (typeof input.origLang !== 'undefined') {kit.origLang = input.origLang; }
    if (typeof input.translLang !== 'undefined') {kit.translLang = input.translLang; }
    if (typeof input.sourceUrl !== 'undefined') {kit.sourceUrl = input.sourceUrl;}
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
    sellVisible: ['id', 'clausesName', 'origLang', 'translLang', 'sourceUrl']
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
      label: 'Order',
      inputType: 'text',
      name: 'id',
      value: ''
    },
    {
      type: 'input',
      label: 'Name',
      inputType: 'text',
      name: 'clausesName',
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
      label: 'Orign lng',
      inputType: 'text',
      name: 'origLang',
      value: ''
    },
    {
      type: 'input',
      label: 'Trnsl lng',
      inputType: 'text',
      name: 'translLang',
      value: ''
    },
    {
      type: 'input',
      label: 'source Url',
      inputType: 'text',
      name: 'sourceUrl',
      value: ''
    }
  ]}
