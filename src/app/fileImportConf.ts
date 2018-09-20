import { Validators } from '@angular/forms';
import { FieldConfig } from './field.interface';

interface FieldDesc {name: string;
                     impFlag: boolean; }

export class FileImportConf {
  encoding: string;
  fields: FieldDesc[];
  }
