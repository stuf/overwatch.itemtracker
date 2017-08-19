import * as React from 'karet';
import * as U from 'karet.util';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { addPropsFromContext } from '../helpers';
import HomePage from './home-page';
import CharacterPage from './character-page';
import { NavBar } from './controls';

const IndexPage = ({
  state,
  data = U.view('data', state)
}) =>
  <Router>
    <div>
      <NavBar {...{ state }} />

      <div>
        <Route path="/" component={HomePage} exact />
        <Route path="/character/:name" component={CharacterPage} />
      </div>
    </div>
  </Router>

export default addPropsFromContext(IndexPage);
