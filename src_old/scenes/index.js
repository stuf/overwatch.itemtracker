import * as React from 'karet';
import { fromEvents } from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import * as T from '../common/toolbelt';
import * as M from './meta';
import { NavBar } from './controls';
import { addPropsFromContext } from './helpers';

import CharacterPage from './character';

const fromEventsF1 = R.flip(fromEvents);
// const fromEventsF1U = U.lift(fromEventsF1);

//

/**
 * @todo Fixme
 */
const attachListeners =
  U.pipe(U.lift1(fromEventsF1('click')),
         U.lift1(U.show));

//

const RootScene = ({
  state,
  characters = U.view(['characters', 'data'], state),
  root = U.variable(),
  rootListener = attachListeners(root)
}) =>
  <Router>
    <div ref={U.refTo(root)}>
      <NavBar state={M.State.navBarIn(state)} />

      <div className="container-fluid">
        <Route path="/character/:name" component={CharacterPage} />
        <Route path="/error/:id" render={() => <div>No data</div>} />
        <Route exact path="/" render={() => <div>root</div>} />
      </div>
    </div>
  </Router>;

export default addPropsFromContext(RootScene);
