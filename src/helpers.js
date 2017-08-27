import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

// React

export const addPropsFromContext =
  (Component, asProps = L.props('state')) =>
    U.withContext((props, ctx) =>
      <Component {...{ ...props, ...L.get(asProps, ctx) }} />);

// Atoms

const modifyA = R.curryN(2, (fn, atom) => atom.modify(fn));
const setA = R.curryN(2, (fn, atom) => atom.set(fn));

export const toggle = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};



// Controls

// Progress

export const getProgressFor = U.compose(U.apply(U.divide), U.values);
export const getProgress = o => U.apply(U.divide, U.values(o));

//

export const toInt = n => parseInt(n, 10);
export const toFixed = ds => (n: number) => n.toFixed(ds);
export const toPct = R.multiply(100);

// Presentation

export const showPct = n => `${n}%`;

export const number = {
  showAsPercent: U.compose(showPct, toFixed(1), toPct)
};

const capitalizeString = U.lift1(L.modify(0, R.toUpper));

export const string = {
  capitalize: capitalizeString
};

export const withPreventDefault =
  fn => e => {
    e.preventDefault();
    fn();
  };
