import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { addPropsFromContext } from '../helpers';

import {
  CompletionStatus,
  CompletionProgressBar,
  EntryList,
  EntryGroupHeader
} from './controls';

import {
  Character as Char,
  Generic as G,
  Entry as E
} from './meta';

//

const CharacterPage = ({ state, match }) => {
  const { name } = match.params;

  const chars = G.dataFor(state);
  const char = Char.forName(name, chars);

  const items = G.itemsFor(char).log();

  const d = E.flatListItems(items);
  const dx = E.itemCount(d).log();
  const dy = E.completedItemCount(d).log();

  return (
    <div className="px-1">
      <hr />

      <h2>{G.nameFor(char)}</h2>

      {E.totalCost(items)}

      <CompletionStatus {...{ progress: [E.completedItemCount(d), E.itemCount(d)] }} />
      <CompletionProgressBar {...{ progress: [E.completedItemCount(d), E.itemCount(d)] }} />

      <button className="btn btn-lg btn-secondary"
              onClick={e => {
                e.preventDefault();
                Char.completeAllFor(char);
              }}>
        Mark all completed
      </button>

      <div className="container-fluid">
        <div className="row">
          {U.seq(items,
            U.indices,
            U.mapCached(i => {
              const group = U.view(i, items);
              const id = G.idFor(group);

              return (
                <div key={i} className="col-md-4 px-1">
                  <div className="card mx-0 px-0">
                    <EntryGroupHeader id={id} group={group} />
                    <EntryList items={G.dataFor(group)} />
                  </div>
                </div>
              )
          }))}
        </div>
      </div>
    </div>
  )
};

export default addPropsFromContext(CharacterPage);
