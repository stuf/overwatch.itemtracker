import * as React from 'karet';
import * as ReactDOM from 'react-dom';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import 'bootstrap/dist/css/bootstrap.css';

import IndexPage from './pages';
import itemData from './data/items.json';

// Transform some data yo

const intoDataPair = ([id, data]) => ({ id, data });
const transformItems =
  R.compose(R.map(intoDataPair),
            R.toPairs);

const characterData = L.collect(L.values, itemData);
const dataTransformL = [L.elems, 'items', L.modifyOp(transformItems)]
const dataModified = L.transform(dataTransformL, characterData);

console.log({ dataModified });

const state = U.atom({
  data: dataModified
});

state.log('state');

ReactDOM.render(
  <U.Context context={{ state }}>
    <IndexPage />
  </U.Context>,
  document.getElementById('root'))
