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

export const toggle = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};

//

export const toInt = n => parseInt(n, 10);
export const toFixed = ds => n => n.toFixed(ds);
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
