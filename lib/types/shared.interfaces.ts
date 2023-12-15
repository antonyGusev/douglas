import { BaseAbstraction } from '../base.abstractions';

export interface ICompensations {
  rateLevel: string;
  rateNumbers: string;
  respondentsQuantity: string;
}

export interface IObjectAnyVal {
  [k: string]: any;
}

export interface IObjectStringVal {
  [k: string]: string;
}

export interface IObjectNumberVal {
  [k: string]: number;
}

export interface IObjectNullVal {
  [k: string]: null;
}

export interface IObjectBoolVal {
  [k: string]: boolean;
}

export type TConstructor= new (...args: any[]) => {};

export type TLocatingStrategy = 'ByTestID' | 'ByRole';

export type TElementRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'generic'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'meter'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'time'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export interface BaseArgs {
  selector: string;
  name: string;
}
export type TAbstractCTor<T extends BaseAbstraction> = { new (args: BaseArgs): T };

export enum TRANSFORMED_COUNTRIES {
  'Brazil' = 'brazil',
  'Canada' = 'canada',
  'Japan' = 'japan',
}

export enum TRANSFORMED_ROLES {
  'Accountant' = 'accountant',
  'QA Engineer' = 'qaEngineer',
  'Software Engineer' = 'softwareEngineer',
}

export enum COUNRTY_OPT_API {
  'Brazil' = 'BR',
  'Canada' = 'CA',
  'Japan' = 'JP',
}

export enum CURRENCY_SIGN_UI {
  'Brazil' = 'R$',
  'Canada' = 'C$',
  'Japan' = '¥',
}

export enum CURRENCY_OPT_API {
  'Brazil' = 'BRL',
  'Canada' = 'CAD',
  'Japan' = 'JPY',
}
