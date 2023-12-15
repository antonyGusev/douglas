import {IElementHandle} from '../types';

const makeHash = (length: number = 10, justNumbers: true | false = false) => {
  let text = '';
  const chars = justNumbers ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
};

const initSingleton = (ClassPage: any) => {
  if (!ClassPage._instance) {
    ClassPage._instance = new ClassPage();
    return ClassPage._instance;
  }

  return ClassPage._instance;
};

const sleep = async (timeout: number = 1000) => new Promise((res) => setTimeout(res, timeout));

const arrayEquals = (a: any[], b: any[]) => a.length === b.length && a.every((c: any) => b.includes(c));

const toCleanString = (str: string) => str.replace(/[^a-zA-Z ]/g, '');

function prettifyCamelCase(camelCaseString: string): string {
  let humanReadableString = '';
  for (let index = 0; index < camelCaseString.length; index++) {
    const char = camelCaseString.charAt(index);

    if (index === 0) {
      humanReadableString += char.toUpperCase();
    } else if (Number.isInteger(+char) || (char !== char.toLowerCase() && char === char.toUpperCase())) {
      humanReadableString += ` ${char}`;
    } else {
      humanReadableString += char;
    }
  }

  return humanReadableString;
}

const getRandomNumber = (maxLength: number) => Math.floor(Math.random() * maxLength) + 1;

const isZero = (amount: number): boolean => amount === 0;

async function asyncFind(arr: IElementHandle[], asyncCallback: (el: any) => Promise<any | undefined>) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
}

async function asyncForEach<T>(array: T[], callback: (item: T, index: number, allItems: T[]) => void) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const isLocal = (): boolean => process.env.NODE_ENV === 'local';

const prettyStringify = (data: any) => JSON.stringify(data, null, '  ')

export {
  makeHash,
  initSingleton,
  arrayEquals,
  sleep,
  prettifyCamelCase,
  asyncFind,
  asyncForEach,
  isZero,
  getRandomNumber,
  toCleanString,
  isLocal,
  prettyStringify
};
