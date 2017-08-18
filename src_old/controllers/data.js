import * as U from 'karet.util';
import { constant } from 'kefir';

import itemData from '../data/items.json';

if (process.env.NODE_ENV !== 'test') {
  console.log({ itemData });
}

const state = U.atom(false);

export const IO = U.template(state);

export const getData = () => constant(itemData);
