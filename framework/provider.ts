import { browser, myMoment, MomentFormats, makeHash, test, EmailTypes } from '../lib';
import { Users } from '../test.data';
import { Actor } from './actor';

const provider = {
  get actor() {
    return { Actor };
  },
  get test() {
    return test;
  },
  get packages() {
    return { browser, myMoment, MomentFormats, makeHash, EmailTypes };
  },
  get users() {
    return { Users };
  },
};

export { provider };
