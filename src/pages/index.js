import * as React from 'karet';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { addPropsFromContext } from '../helpers';
import HomePage from './home-page';
import CharacterPage from './character-page';

const IndexPage = ({ state }) =>
  <Router>
    <div>
      <Route path="/" component={HomePage} exact />
      <Route path="/character/:name" component={CharacterPage} />
    </div>
  </Router>

export default addPropsFromContext(IndexPage);
