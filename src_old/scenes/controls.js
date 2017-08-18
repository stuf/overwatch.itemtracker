import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import { Link } from 'react-router-dom';

import * as M from './meta';

//

export const DropDownItem = ({ item }) =>
  <Link karet-lift
        className="dropdown-item"
        to={U.string`/character/${M.idOf(item)}`}>
    {M.nameOf(item)}
  </Link>;

//

export const DropDown = ({ show, items }) =>
  <li className={U.cns('nav-item', 'dropdown', U.ift(show, 'show'))}>
    <a className="nav-link dropdown-toggle"
       onClick={() => show.modify(R.not)}>
      dropdown
    </a>
    <div className="dropdown-menu">
      {U.seqPartial(items,
                    U.mapElems((it, idx) =>
                      <DropDownItem key={idx} item={it} />))}
    </div>
  </li>;

//

export const NavBar = ({
  state,
  characters = M.NavBar.dropdownItemsIn(state),
  show = M.NavBar.showDropdownIn(state)
}) =>
  <nav className="navbar navbar-inverse bg-primary">
    <Link to="/" className="navbar-brand">Brand</Link>

    <div className="navbar-collapse">
      <ul className="navbar-nav">
        <DropDown {...{ show, items: characters }} />
      </ul>
    </div>
  </nav>;
