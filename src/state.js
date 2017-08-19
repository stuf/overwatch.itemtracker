import * as U from 'karet.util';

export const createStore = initial => U.atom(initial);

export const createContext = ({ state }) =>
  ({
    state,
    data: U.view('data', state)
  });
