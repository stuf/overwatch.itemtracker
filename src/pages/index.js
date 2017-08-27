import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import { addPropsFromContext } from '../helpers';
import HomePage from './home-page';
import CharacterPage from './character-page';
import { NavBar } from '../controls/navigation';

const BASE_NAME = '/overwatch.itemtracker'

const IndexPage = ({
  state,
  data,
  filter
}) =>
  <Router>
    <div>
      <NavBar {...{ state, baseName: BASE_NAME }} />

      <div>
        <Redirect from="/" to={BASE_NAME} />
        <Route path={BASE_NAME} component={HomePage} exact />
        <Route path={U.string`${BASE_NAME}/character/:name`} component={CharacterPage} />
      </div>
    </div>
  </Router>

export default addPropsFromContext(IndexPage, L.props('state', 'filter', 'data'));
