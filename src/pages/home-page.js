/**
 * @module Pages.HomePage
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { CurrencyIcon } from '../assets/icons';
import { addPropsFromContext, number } from '../helpers';
import { CompletionProgress } from '../controls/progress';
import {
  Generic as G,
  Items as I
} from './meta';

//

/**
 * @class HomePage
 * @param state
 * @returns {XML}
 * @constructor
 */
const HomePage = ({ state }) => {
  const chars = G.dataFor(state);

  const getProgress = o => U.apply(U.divide, U.values(o));

  const allItems = I.collectAllItems(chars);
  const itemStats = {
    completed: I.totalCompletedItemCount(allItems),
    total: I.totalItemCount(allItems)
  };

  const progress = {
    size: 'lg',
    progress: getProgress(itemStats),
    text: U.seq(U.template(U.values(itemStats)),
                U.join(' / '))
  };

  const costs = {
    completed: I.completedItemCost(allItems),
    total: I.itemCost(allItems)
  };

  const costsLeft =
    U.seq(U.values(costs),
          U.reverse,
          U.apply(U.subtract));

  return (
    <section className="page page--home">
      <header className="jumbotron progress--total">
        <div className="container">
          <p className="display-3">
            <em>Total completion status</em>
          </p>

          <CompletionProgress {...progress} />

          <div className="row justify-content-end align-items-center progress--total-costs mt-4">
            <div className="col-auto">
              <dl>
                <dt>Total</dt>
                <dd>
                  {I.itemCost(allItems)}
                  <CurrencyIcon />
                </dd>
              </dl>
            </div>
            <div className="col-auto progress--symbol">
              -
            </div>
            <div className="col-auto">
              <dl>
                <dt>Completed</dt>
                <dd>
                  {I.completedItemCost(allItems)}
                  <CurrencyIcon />
                </dd>
              </dl>
            </div>
            <div className="col-auto progress--symbol">=</div>
            <div className="col-auto">
              <dl>
                <dt>Left</dt>
                <dd>
                  {costsLeft}
                  <CurrencyIcon />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="row">
          {U.seq(chars,
                 U.indices,
                 U.mapCached(i => {
                   const c = U.view(i, chars);
                   const allCharItems = I.collectCharacterItems(c);
                   const name = G.nameFor(c);
                   const charColor = U.view(['colors', 'primary'], c);

                   const charItemStats = {
                     completed: I.totalCompletedItemCount(allCharItems),
                     total: I.totalItemCount(allCharItems)
                   };

                   const charItemProgress = getProgress(charItemStats);
                   const text = U.join(' / ', U.values(charItemStats));

                   return (
                     <article key={i}
                              className="col-2">
                       <header>
                         {name}
                       </header>

                       <CompletionProgress progress={charItemProgress}
                                           size="sm"
                                           barColor={charColor}
                                           text={text} />
                     </article>
                   );
                 }))}
        </div>
      </div>
    </section>
  );
};

export default addPropsFromContext(HomePage);
