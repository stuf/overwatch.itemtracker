import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import {
  NavLink as Link
} from 'react-router-dom';

import {
  Generic as G,
  EntryList as EL,
  Entry as E
} from './meta';

//

export const CompletionStatus = ({ items }) =>
  <div>
    {U.seq([E.completedItemCount, E.itemCount],
           U.map(R.apply(R.__, R.of(items))),
           U.join(' / '))}
  </div>;

export const NavBar = ({ state }) =>
  <div className="mt-3" style={{ textAlign: 'center' }}>
    {U.seq(U.view('data', state),
      U.mapElems((c, i) =>
        <Link karet-lift
              className="btn btn-secondary"
              to={U.string`/character/${U.view('id', c)}`}>
          {U.view('name', c)}
        </Link>))}
  </div>;

//

const toggleState = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};

export const Entry = ({ completed, item }) => {
  return (
    <li className={U.cns('list-group-item', U.ift(completed, 'active'))}
        onClick={toggleState(completed)}>
      {G.nameFor(item)}

      <span className="badge badge-primary ml-2">
        {E.costForQuality(item)}
      </span>
    </li>
  );
};

//

export const EntryList = ({ items }) =>
  <ul className={U.cns('list-group')}>
    {U.seq(items,
           U.indices,
           U.mapCached(i =>
             <Entry item={EL.itemFor(i, items)}
                    completed={EL.completedFor(i, items)} />))}
  </ul>

