import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { addPropsFromContext } from '../helpers';

import { EntryList, CompletionStatus } from './controls';
import {
  Character as Char,
  Generic as G,
  Entry as E
} from './meta';

//

const CharacterPage = ({ state, match }) => {
  const { name } = match.params;

  const chars = G.dataFor(state);
  const char = Char.forName(name, chars)

  return (
    <div>
      <hr />

      <h2>{G.nameFor(char)}</h2>

      <CompletionStatus {...{ items: E.allItems(char) }} />

      <div className="mt-3">
        {U.seq(U.view('items', char),
          U.mapElems((group, index) =>
            <div className="card mt-3"
                 style={{ float: 'left', width: '33%' }}
                 key={index}>
              <div className="card-header">
                {U.view('id', group)}
                <CompletionStatus {...{ items: G.dataFor(group) }} />
              </div>

              <EntryList items={G.dataFor(group)} />
            </div>))}
      </div>
    </div>
  )
};

export default addPropsFromContext(CharacterPage);
