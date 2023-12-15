import { browser, myMoment, MomentFormats, makeHash, test, EmailTypes } from '../lib';
import { UsersLoginDetails } from '../test.data';
import { I } from './actor';

const provider = {
  get actor() {
    return { I };
  },
  get test() {
    return test;
  },
  get packages() {
    return { browser, myMoment, MomentFormats, makeHash, EmailTypes };
  },
  get users() {
    return { UsersLoginDetails };
  },
};

export { provider };
