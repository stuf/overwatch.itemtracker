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

  const items = G.itemsFor(char);

  return (
    <div className="px-1">
      <hr />

      <h2>{G.nameFor(char)}</h2>

      {E.totalCost(items)}

      <CompletionStatus {...{ progress: [0, 10] }} />
      <CompletionProgressBar {...{ progress: [0, 10] }} />

      <div className="container-fluid">
        <div className="row">
          {U.seq(items,
            U.indices,
            U.mapCached(i => {
              const group = U.view(i, items);
              const id = G.idFor(group);

              return (
                <div className="col-md-3 px-1" key={i}>
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
