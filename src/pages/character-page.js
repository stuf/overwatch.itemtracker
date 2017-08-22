/**
 * @module Pages.CharacterPage
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { addPropsFromContext } from '../helpers';

import { ItemGroup } from '../controls/item';
import {
  CompletionProgress,
  CompletionStatus
} from '../controls/progress';

import {
  Character as C,
  Generic as G,
  Entry as E,
  Items as I
} from './meta';

//

/**
 * @class CharacterPage
 * @param state
 * @param match
 * @returns {XML}
 * @constructor
 */
const CharacterPage = ({ state, match }) => {
  const { name } = match.params;

  const char = C.forName(name, G.dataFor(state));
  const items = G.itemsFor(char);
  const allItems = I.collectCharacterItems(char);

  const status = {
    completed: E.completedItemCount(allItems),
    total: E.itemCount(allItems)
  };

  const progress = U.apply(U.divide, U.values(status));

  return (
    <section className="page page--character">
      <div className="container">
        <aside>
          {E.totalCost(allItems)}
        </aside>

        <header>
          <h2 className="display-2">{G.nameFor(char)}</h2>
          <h3>{G.classFor(char)}</h3>
        </header>

        <CompletionProgress {...{ progress }} />
        <CompletionStatus {...status} />

        <button className="btn btn-lg btn-secondary"
                onClick={e => {
                  e.preventDefault();
                  C.completeAllFor(char);
                }}>
          Mark all completed
        </button>

        <ItemGroup {...{ items }} />
      </div>
    </section>
  )
};

export default addPropsFromContext(CharacterPage);
