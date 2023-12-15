import { deepStrictEqual } from 'assert';
import { BaseAbstraction } from '../base.abstractions';

function isEqual(a: any, b: any) {
  try {
    deepStrictEqual(a, b);
    return true;
  } catch {
    return false;
  }
}

type TReplacer = (this: any, key: string, value: any) => any;

const stringifyValue = (value: any, replacer?: TReplacer, space?: number) => {
  if (value === null) return '';
  return JSON.stringify(value, replacer, space);
};

const logMessage = (cls: BaseAbstraction, msg: string) => {
  let message = `${cls.name} selector: ${cls.selector} ` + msg;
  // if (cls.constructor.name.includes('Fragment')) {
  //   message = `${cls.name} fragment selector: ${cls.selector} ` + msg;
  // } else if (cls.constructor.name.includes('Element')) {
  //   message = `${cls.name} element selector: ${cls.selector} ` + msg;
  // } else {
  //   message = `${cls.name} selector: ${cls.selector} ` + msg;
  // }
  return message;
}

export { isEqual, stringifyValue, logMessage };
