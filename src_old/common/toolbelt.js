import * as R from 'ramda';
import { constant, Observable } from 'kefir';

// Kefir

export const toConstant = x => x instanceof Observable ? x : constant(x);

//

export const fstU = (a, _) => a;
export const sndU = (_, b) => b;

export const fstTo = R.adjust(R.__, 0);
export const sndTo = R.adjust(R.__, 1);

export const replaceSeparator = R.replace(' - ', ' ');
export const emptyJoin = R.join('');

const firstToUpperCase = fstTo(R.toUpper);
const splitWordAtFirstChar = R.splitAt(1);

export const capitalize = R.compose(emptyJoin, firstToUpperCase, splitWordAtFirstChar, R.toLower);
export const camelCase = R.compose(emptyJoin, fstTo(R.toLower), R.map(capitalize), R.split(' '), replaceSeparator);
