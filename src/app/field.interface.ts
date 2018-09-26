export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name?: string;
  inputType?: string;
  options?: string[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
}
