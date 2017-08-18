import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { Link } from 'react-router-dom';

import { addPropsFromContext } from '../helpers';

import { Entry, EntryList } from './controls';

const CharacterPage = ({ state, match }) => {
  const { name } = match.params;

  const chars = U.view('data', state);
  const char = U.view(L.find(R.whereEq({ id: name })), chars);

  const displayName = U.view('name', char);
  const groups = U.view('items', char);

  return (
    <div>
      {/* Navigation bar */}
      <div className="mt-3" style={{ textAlign: 'center' }}>
        {U.seq(chars,
               U.mapElems((c, i) =>
                 <Link karet-lift
                       className="btn btn-secondary"
                       to={U.string`/character/${U.view('id', c)}`}>
                   {U.view('name', c)}
                 </Link>))}
      </div>

      <hr />

      <h2>{displayName}</h2>

      <div className="mt-3">
        {U.seq(groups,
          U.mapElems((group, index) =>
            <div className="card"
                key={index}>
              <div className="card-header">{U.view('id', group)}</div>

              <EntryList items={U.view('data', group)} />
            </div>))}
      </div>
    </div>
  )
};

export default addPropsFromContext(CharacterPage);
