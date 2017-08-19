import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as State from './state';
import IndexPage from './pages';
import itemData from './data/items.json';

//

const intoDataPair = ([id, data]) => ({ id, data });
const transformItems =
  R.compose(R.map(intoDataPair),
            R.toPairs);

const characterData = L.collect(L.values, itemData);
const dataTransformL = [L.elems, 'items', L.modifyOp(transformItems)]
const dataModified = L.transform(dataTransformL, characterData);

const state = State.createStore({ data: dataModified });
const context = State.createContext({ state });

//

const App = () =>
  <U.Context {...{ context }}>
    <IndexPage />
  </U.Context>;

export default App;
