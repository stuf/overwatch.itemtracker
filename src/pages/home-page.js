import * as React from 'karet';
import * as U from 'karet.util';

import { addPropsFromContext, number } from '../helpers';
import {
  Generic as G,
  Items as I
} from './meta';

//

const HomePage = ({ state }) => {
  const chars = G.dataFor(state);

  const allItems = I.collectAllItems(chars);
  const itemStats = {
    completed: I.totalCompletedItemCount(allItems),
    total: I.totalItemCount(allItems)
  };

  const percentageProgress = U.apply(U.divide, U.values(itemStats));

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
            Total completion status
          </p>

          <div className="progress">
            <div className="progress-bar"
                 style={{ width: number.showAsPercent(percentageProgress) }}>
              {itemStats.completed} / {itemStats.total}
            </div>
          </div>

          <div className="row justify-content-end progress--total-costs mt-4">
            <div className="col-sm-2">
              <dl>
                <dt>Total</dt>
                <dd>{I.itemCost(allItems)}</dd>
              </dl>
            </div>
            <div className="col-sm-2">
              <dl>
                <dt>Completed</dt>
                <dd>{I.completedItemCost(allItems)}</dd>
              </dl>
            </div>
            <div className="col-sm-2">
              <dl>
                <dt>Left</dt>
                <dd>{costsLeft}</dd>
              </dl>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default addPropsFromContext(HomePage);
