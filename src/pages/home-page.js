/**
 * @module Pages.HomePage
 */
import * as React from 'karet';
import * as U from 'karet.util';
import { Link } from 'react-router-dom';

import { CurrencyIcon } from '../assets/icons';
import { addPropsFromContext } from '../helpers';
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

  const getProgressFor = U.compose(U.apply(U.divide), U.values);
  const getProgress = o => U.apply(U.divide, U.values(o));

  const allItems = I.collectAllItems(chars);
  const itemStats = {
    completed: I.totalCompletedItemCount(allItems),
    total: I.totalItemCount(allItems)
  };

  const progress = {
    size: 'lg',
    progress: getProgressFor(itemStats),
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

      <section className="container roster">
        {/* <svg>
          <defs>
            <clipPath id="roster-card">
              <rect x="0" y="0" width="8.75rem" height="8.75rem" rx="0.2rem" ry="0.2rem" />
            </clipPath>
          </defs>
        </svg> */}
        <div className="roster-list">
          {U.seq(chars,
                 U.indices,
                 U.mapCached(i => {
                   const c = U.view(i, chars);
                   const allCharItems = I.collectCharacterItems(c);
                   const id = G.idFor(c);
                   const name = G.nameFor(c);
                   const charColor = U.view(['colors', 'primary'], c);

                   const charItemStats = {
                     completed: I.totalCompletedItemCount(allCharItems),
                     total: I.totalItemCount(allCharItems)
                   };

                   const charItemProgress = getProgress(charItemStats);
                   const text = U.join(' / ', U.values(charItemStats));

                   return (
                    <Link karet-lift to={U.string`/character/${id}`}
                          className={U.cns('roster-link mb-2 py-3', U.string`hero-${id}`)}>
                      <header>
                        <div className="hero-icon" />
                        {name}
                      </header>

                      <CompletionProgress progress={charItemProgress}
                                          size="sm"
                                          barColor={charColor}
                                          text={text} />
                    </Link>
                 );
                 }))}
        </div>
      </section>
    </section>
  );
};

export default addPropsFromContext(HomePage);
