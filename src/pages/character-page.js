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

      <div className="container-fluid">
        <div className="row">
          {U.seq(U.view('items', char),
            U.mapElems((group, index) =>
              <div className="col-md-3 px-1">
                <div className="card mx-0 px-0"
                      key={index}>
                  <div className="card-header">
                    <div className="row">
                      <div className="col">
                        {G.idFor(group)}
                      </div>
                      <div className="col-xs-2 text-right">
                        <CompletionStatus {...{ items: G.dataFor(group),
                                                className: '' }} />
                      </div>
                    </div>
                  </div>

                  <EntryList items={G.dataFor(group)} />
                </div>
              </div>))}
        </div>
      </div>
    </div>
  )
};

export default addPropsFromContext(CharacterPage);
