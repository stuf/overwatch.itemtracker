/**
 * @module Pages.CharacterPage
 */
import * as React from 'karet';
import K, * as U from 'karet.util';

import { addPropsFromContext } from '../helpers';

import { ItemGroup } from '../controls/item';
import { CurrencyIcon } from '../assets/icons';
import {
  CompletionProgress
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
  const text = U.template(U.values(status)).map(([x, y]) => `${x} / ${y} unlocks`);
  const barColor = U.view(['colors', 'primary'], char);

  return (
    <section className="page page--character">
      <div className="container">
        <header>
          <h2 className="display-2">{G.nameFor(char)}</h2>
          <h3>{G.classFor(char)}</h3>
        </header>

        <div className="completion completion--character sticky-top">
          <div className="row align-items-center">
            <div className="col">
              <CompletionProgress {...{ progress, text, barColor }} />
            </div>
            <aside className="col-auto total-cost align-middle">
              <span>
                {E.totalCost(allItems)}
              </span>
              <CurrencyIcon />
            </aside>
          </div>
        </div>

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
