import * as React from 'karet';
import * as U from 'karet.util';

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

  const items = G.itemsFor(char);

  const allItems = E.allItems(items);

  const progressStatus =
    [E.completedItemCount(allItems),
     E.itemCount(allItems)];

  const progressPct = U.apply(U.divide, progressStatus);

  return (
    <div className="px-1">
      <aside>
        {E.totalCost(allItems)}
      </aside>

      <header>
        <h2 className="display-2">{G.nameFor(char)}</h2>
        <h3>{G.classFor(char)}</h3>
      </header>

      <CompletionStatus {...{ completed: U.view(0, progressStatus),
                              total: U.view(1, progressStatus) }} />
      <CompletionProgressBar {...{ progress: progressPct,
                                   text: U.join(' / ', progressStatus) }} />

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
                <div key={i} className="col-md-4 px-1 entry__block">
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
