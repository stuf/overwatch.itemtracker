import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import {
  Generic as G,
  EntryList as EL
} from './meta';

const toggleState = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};

export const Entry = ({ completed, item }) => {
  return (
    <li className={U.cns('list-group-item', U.ift(completed, 'active'))}
        onClick={toggleState(completed)}>
      {G.nameFor(item)}
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

