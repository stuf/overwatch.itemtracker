import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as State from './state';
import IndexPage from './pages';
import itemData from './data/items.json';
import { Cost } from './constants';

//

// @fixme Extract data transformation into migration or somesuch

const intoDataPair = ([id, data]) => ({ id, data });
const transformItems =
  R.compose(R.map(intoDataPair),
            R.toPairs);

const addItemCosts =
  L.modify([L.elems,
            'data',
            L.elems],
            v => R.assoc('cost', Cost[v.quality], v));

const characterData = L.collect(L.values, itemData);
const dataTransformL = [L.elems,
                        'items',
                        L.seq(L.modifyOp(transformItems),
                              L.modifyOp(addItemCosts))];
const dataModified = L.transform(dataTransformL, characterData);

const state = State.createStore({ data: dataModified });
const filter = State.createStore();
const context = State.createContext({ state, filter });

if (process.env.NODE_ENV === 'development') {
  state.log('state');
}

//

const App = () =>
  <U.Context {...{ context }}>
    <IndexPage />
  </U.Context>;

export default App;
