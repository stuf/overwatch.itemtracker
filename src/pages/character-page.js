import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { addPropsFromContext } from '../helpers';

import { EntryList } from './controls';
import {
  Entry as E
} from './meta';

//

const CharacterPage = ({ state, match }) => {
  const { name } = match.params;

  const chars = U.view('data', state);
  const char = U.view(L.find(R.whereEq({ id: name })), chars);

  const displayName = U.view('name', char);
  const groups = U.view('items', char);

  const allItems = E.allItems(char);

  const itemStatus =
    U.seq([E.completedItemCount, E.itemCount],
          U.map(fn => fn(allItems)),
          U.join(' / '));

  return (
    <div>
      <hr />

      <h2>{displayName}</h2>

      {itemStatus}

      <div className="mt-3">
        {U.seq(groups,
          U.mapElems((group, index) =>
            <div className="card mt-3"
                 style={{ float: 'left', width: '33%' }}
                key={index}>
              <div className="card-header">{U.view('id', group)}</div>

              <EntryList items={U.view('data', group)} />
            </div>))}
      </div>
    </div>
  )
};

export default addPropsFromContext(CharacterPage);
