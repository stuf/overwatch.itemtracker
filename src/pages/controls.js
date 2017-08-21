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

const KefirLink = React.fromClass(Link);

// Completion tracking

export const CompletionProgressBar = ({
  progress,
  text,
  value = U.seq(progress,
                U.multiply(100),
                U.lift1(x => parseInt(x, 10)),
                U.lift1(x => `${x}%`))
}) =>
  <div className="progress my-2" style={{ height: '2rem' }}>
    <div className="progress-bar"
         style={{ width: value, height: '2rem', fontSize: '1.5rem' }}>
      {text} unlocks
    </div>
  </div>;

export const CompletionStatus = ({ completed, total }) =>
  <div>
    C: {completed} / T: {total}
  </div>;

// Navigation

export const NavBar = ({ state, data = U.view('data', state) }) =>
  <nav className="top-navigation sticky-top text-center">
    {U.seq(data,
           U.indices,
           U.mapCached(i =>
             <KefirLink karet-lift
                   className="btn btn-secondary ml-1"
                   to={U.string`/character/${U.view([i, 'id'], data)}`}>
               {U.view([i, 'name'], data)}
             </KefirLink>))}
  </nav>;

// Filter

export const Filter = ({ state, filter = U.view('filter', state) }) =>
  <div className="mt-3 text-center">
    <div>
    </div>
  </div>;

// Item group specific

export const EntryGroupHeader = ({
  id,
  group,
  allItems = U.view('data', group),
  completedCount: completed = E.completedItemCount(allItems).log(),
  totalCount: total = E.itemCount(allItems).log()
}) =>
  <header className={U.cns('card-header')}>
    <div className="row">
      <div className="col">{id}</div>
      <div className="col-xs-4 text-right">
        <CompletionStatus {...{ completed, total }} />
      </div>
    </div>
  </header>;

// Item groups, single items

const toggleState = atom => e => {
  e.preventDefault();
  atom.modify(R.not);
};

// Single group item

export const Entry = ({ completed, item }) =>
  <li onClick={toggleState(completed)}
      className={U.cns('list-group-item',
                       'entry__list__item',
                       'item-quality-bg',
                       U.ift(completed, 'active'),
                       U.string`item-quality-${G.qualityFor(item)}`)}>
    {G.nameFor(item)}

    <span className="badge badge-primary badge-pill ml-2">
      {G.costFor(item)}
    </span>
  </li>;

//

export const EntryList = ({ items }) =>
  <ul className={U.cns('list-group', 'entry__list')}>
    {U.seq(items,
           U.indices,
           U.mapCached(i =>
             <Entry item={EL.itemFor(i, items)}
                    completed={EL.completedFor(i, items)} />))}
  </ul>

