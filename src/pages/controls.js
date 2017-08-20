import * as React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import {
  NavLink as Link
} from 'react-router-dom';

import {
  Generic as G,
  EntryList as EL,
  Entry as E
} from './meta';

import { Quality, Strings, Color } from '../constants';

// Completion tracking

const getCompletionStatus = items =>
  U.seq([E.completedItemCount, E.itemCount],
        U.map(R.apply(R.__, R.of(items))));

const getProgress =
  U.pipe(U.unless(R.is(Array), R.of),
         U.apply(R.divide),
         U.multiply(100));

export const CompletionProgressBar = ({
  progress,
  status = U.seq(progress,
                 getProgress).log('status'),
  pct = '30%'
}) =>
  <div className="progress my-2">
    <div className="progress-bar"
         style={{ width: pct }}>
      {pct}
    </div>
  </div>;

export const CompletionStatus = ({ progress }) =>
  <div>
    {U.seq(progress,
           U.unless(R.is(Array), R.of),
           U.join(Strings.COMPLETION_SEPARATOR))}
  </div>;

// Navigation

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

// Filter

export const Filter = ({ state, filter = U.view('filter', state) }) =>
  <div className="mt-3 text-center">
    Filter

    <div>
    </div>
  </div>;

// Item group specific

export const EntryGroupHeader = ({ id, group }) =>
  <header className="card-header">
    <div className="row">
      <div className="col">{id}</div>
      <div className="col-xs-4 text-right">
        <CompletionStatus {...{ items: G.dataFor(group), progress: [0, 10] }} />
      </div>
    </div>
  </header>;

// Item groups, single items

const toggleState = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};

export const Entry = ({ completed, item }) => {
  const quality = G.qualityFor(item);
  const color =
    K(quality, Color, (q, c) => R.propOr(Color.NONE, q, c));

  const itemClassName =
    U.ifte(completed,
           U.string`item-quality-${G.qualityFor(item)}`);

  return (
    <li onClick={toggleState(completed)}
        className={U.cns('list-group-item',
                         'item-quality-bg',
                         U.ift(completed, 'active'),
                         U.string`item-quality-${G.qualityFor(item)}`)}>
      {G.nameFor(item)}

      <span className="badge badge-primary badge-pill ml-2">
        {G.costFor(item)}
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

