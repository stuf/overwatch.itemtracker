import * as React from 'karet';
import * as U from 'karet.util';
import {
  Link as RouterLink
} from 'react-router-dom';

import { addPropsFromContext } from '../helpers';

const Link = React.fromClass(RouterLink);

const HomePage = ({ state }) =>
  <div>
    Home page

    <div>
      {U.seq(U.view('data', state),
             U.indices,
             U.mapCached(i => {
               const char = U.view(['data', i], state);
               const id = U.view('id', char);
               const name = U.view('name', char);

               return (
                 <Link to={U.string`/character/${id}`}>
                   {name}
                 </Link>
               )
             }))}
    </div>
  </div>;

export default addPropsFromContext(HomePage);
