import * as React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as State from './state';
import * as C from './controllers/data';
import RootScene from './scenes';

//

const state = State.createStore();

const characterDataIn = U.view(['characters', 'data']);

const data = C.getData();
data.observe(R.pipe(L.collect(L.values),
                    U.set(characterDataIn(state))));

const context = State.createContext({ state });

if (process.env.NODE_ENV === 'development') {
  state.log('state');

  Object.assign(window, {
    state, context, data, K, U, R, L
  })
}

//

const App = () =>
  <U.Context {...{ context }}>
    <RootScene />
  </U.Context>;

export default App;
