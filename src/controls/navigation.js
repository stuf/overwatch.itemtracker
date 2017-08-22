import React, { fromClass } from 'karet';
import * as U from 'karet.util';
import { NavLink as Link } from 'react-router-dom';

import * as H from '../helpers';
import {
  NavBarL as NavL,
  NavBarV as Nav
} from './meta';

const KefirLink = fromClass(Link);

//

export const Roster = ({ characters, itemClassName = 'btn btn-secondary cards__card' }) =>
  <div className="roster cards cards--characters">
    {U.seq(characters,
           U.indices,
           U.mapCached(i =>
             <KefirLink className={itemClassName}
                        activeClassName={'active'}
                        to={U.string`/character/${Nav.idAt(i, characters)}`}>
               {Nav.nameAt(i, characters)}
             </KefirLink>))}
  </div>;

//

export const NavBar = ({
  state,
  isVisible = Nav.isNavigationVisibleFor(state),
  data = U.view(NavL.dataFor, state),
  hasCharacters = U.not(U.isEmpty(data))
}) =>
  <nav className="top-navigation sticky-top text-center">
    <button className="btn btn-secondary float-left"
            onClick={H.toggle(isVisible)}>
      {'≡'}
    </button>
    <Link to="/" className="btn btn-primary float-left">
      Home
    </Link>

    {U.ifte(hasCharacters,
            U.ift(isVisible, <Roster characters={data} />),
            <div>No characters found.</div>)}
  </nav>;
