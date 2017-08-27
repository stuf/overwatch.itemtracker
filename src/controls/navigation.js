/**
 * @module Controls.Navigation
 */
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

/**
 * @class Roster
 * @param characters
 * @param baseName
 * @param itemClassName
 * @constructor
 */
export const Roster = ({ characters, baseName, itemClassName = 'btn btn-secondary cards__card' }) =>
  <div className="roster cards cards--characters">
    {U.seq(characters,
           U.indices,
           U.mapCached(i =>
             <KefirLink className={itemClassName}
                        activeClassName={'active'}
                        to={U.string`${baseName}/character/${Nav.idAt(i, characters)}`}>
               {Nav.nameAt(i, characters)}
             </KefirLink>))}
  </div>;

//

/**
 *
 * @param state
 * @param isVisible
 * @param data
 * @param hasCharacters
 * @constructor
 */
export const NavBar = ({
  state,
  baseName,
  isVisible = Nav.isNavigationVisibleFor(state),
  data = U.view(NavL.dataFor, state),
  hasCharacters = U.not(U.isEmpty(data))
}) =>
  <nav className="top-navigation sticky-top text-center">
    <button className="btn btn-secondary float-left"
            onClick={H.toggle(isVisible)}>
      {'≡'}
    </button>
    <KefirLink to={U.string`${baseName}`} className="btn btn-primary float-left ml-2">
      Home
    </KefirLink>

    {U.ifte(hasCharacters,
            U.ift(isVisible, <Roster characters={data} baseName={baseName} />),
            <div>No characters found.</div>)}
  </nav>;
