import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { addPropsFromContext } from '../helpers';
import HomePage from './home-page';
import CharacterPage from './character-page';
import { NavBar, Filter } from './controls';

const IndexPage = ({
  state,
  data,
  filter
}) =>
  <Router>
    <div>
      <NavBar {...{ state }} />
      <Filter {...{ filter }} />

      <div>
        <Route path="/" component={HomePage} exact />
        <Route path="/character/:name" component={CharacterPage} />
      </div>
    </div>
  </Router>

export default addPropsFromContext(IndexPage, L.props('state', 'filter', 'data'));
