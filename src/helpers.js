// @flow
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import type { Atom } from 'kefir.atom';

// React

type AddPropsFromContextFn = (Component: React.ComponentType<*>, asProps: *) => React.Node;

export const addPropsFromContext: AddPropsFromContextFn =
  (Component, asProps = L.props('state')) =>
    U.withContext((props, ctx) =>
      <Component {...{ ...props, ...L.get(asProps, ctx) }} />);

// Atoms

const modifyA = R.curryN(2, (fn, atom) => atom.modify(fn));
const setA = R.curryN(2, (fn, atom) => atom.set(fn));

export const toggle = <T, E>(atom: Atom<T, E>) => (e: Event) => {
  e.preventDefault();
  atom.modify(R.not);
};



// Controls

// Progress

export const getProgressFor = U.compose(U.apply(U.divide), U.values);
export const getProgress = o => U.apply(U.divide, U.values(o));

//

export const toInt = (n: string) => parseInt(n, 10);
export const toFixed = (ds: number) => (n: number) => n.toFixed(ds);
export const toPct: (x: number) => number = R.multiply(100);

// Presentation

export const showPct = (n: number) => `${n}%`;

export const number = {
  showAsPercent: U.compose(showPct, toFixed(1), toPct)
};

const capitalizeString = U.lift1(L.modify(0, R.toUpper));

export const string = {
  capitalize: capitalizeString
};

type EventFn = (event: Event) => void;
type WithPreventDefaultFn = (fn: any) => EventFn;

export const withPreventDefault: WithPreventDefaultFn =
  fn => e => {
    e.preventDefault();
    fn();
  };

//
