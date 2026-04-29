import {
  CrudCreateInterface,
  CrudEditInterface,
  CRUDInterface,
} from '@/core/pages/crud/crud.interface';
import { Path } from 'react-hook-form';
import FormForm from '@/components/form/type-form/form-form';

export enum FormType {
  Text = 'text',
  Email = 'email',
  SelectSingle = 'selectSingle',
  SelectMultiple = 'selectMultiple',
  SelectMultipleWithOption = 'selectMultipleWithOption',
  SelectSingleWithOption = 'selectSingleWithOption',
  Password = 'password',
  Number = 'number',
  Date = 'date',
  Image = 'image',
  Color = 'color',
  Custom = 'custom',
  TextArea = 'textArea',
  WYSIWYG = 'wysiwyg',
  Checkbox = 'checkbox',
  CheckboxCase = 'checkboxCase',
  FormCrud = 'crud',
  Object = 'object',
}

export interface FormFieldInterface<TEdit> {
  name: Path<TEdit>;
  label: string;
  type: FormType;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  crud?: CrudEditInterface | CrudCreateInterface;
}

export interface FormSectionInterface<TEdit> {
  layout: 'row' | 'column';
  fields: FormFieldInterface<TEdit>[];
  // repeats?: number,
}

export interface FormStepInterface<TEdit> {
  title: string;
  label: string;
  section: FormSectionInterface<TEdit>[];
}
