import * as U from 'karet.util';
import Stored from 'atom.storage';
import Undo, { Replace } from 'atom.undo';

/**
 * Create an observable store
 * @param {any} initial
 */
export const createStore = initial =>
  U.atom(initial);

/**
 * Create an observable store that will be persisted to localStorage
 * @param {any} initial
 */
export const createPersistentStore = initial =>
  Stored({ key: 'overwatch.itemtracker:v1',
           value: initial,
           Atom: U.atom,
           storage: localStorage })

/**
 * Create an observable store that records undo history
 * @param {any} initial
 */
export const createHistoryStore = initial =>
  Undo({ value: initial,
         Atom: U.atom,
         replace: Replace.youngerThan(1000) });

/**
 * Create a context object that will be used in the root application node
 * @param {Object} data
 */
export const createContext = ({ state }) => ({ state });
