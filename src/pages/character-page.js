/**
 * @module Pages.CharacterPage
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { addPropsFromContext } from '../helpers';

import { ItemGroup } from '../controls/item';
import { CurrencyIcon } from '../assets/icons';
import { CompletionProgress } from '../controls/progress';

import {
  Character as C,
  Generic as G,
  Entry as E,
  Items as I
} from './meta';

//

const completionStatusFor =
  U.lift1(items => ({
    completed: I.totalCompletedItemCount(items),
    total: I.totalItemCount(items)
  }));

const completionText = text => ([a, b]) => U.string`${a} / ${b} ${text}`;

//

const CharacterPage =
  ({
     state,
     match,
     id = match.params.name,
     character = C.forName(id, G.dataFor(state)),
     items = G.itemsFor(character),
     allItems = I.collectCharacterItems(character),
     status = completionStatusFor(allItems),
     progress = U.apply(U.divide, U.values(status)),
     text = U.template(U.values(status)).map(completionText('unlocks')),
     barColor = U.view(['colors', 'primary'], character)
    }) => {
    return (
      <section className="page page--character">
        <div className="container">
          <header>
            <h2 className="display-2">{G.nameFor(character)}</h2>
            <h3>{G.classFor(character)}</h3>
          </header>

          <div className="completion completion--character sticky-top pb-2">
            <div className="row align-items-center">
              <div className="col">
                <CompletionProgress {...{ progress, text, barColor }} />
              </div>
              <aside className="col-3 total-cost align-middle">
                <span>
                  {E.totalCost(allItems)}
                </span>
                <CurrencyIcon />
              </aside>
            </div>

            <div className="btn-toolbar"
                 role="toolbar"
                 aria-label="Controls for all item categories">
              <div className="btn-group"
                   role="group"
                   aria-label="Control all items">
                <button className="btn btn-outline-light"
                        onClick={() => C.completeAllFor(character)}>
                  Mark all
                </button>

                <button className="btn btn-outline-light"
                        onClick={() => C.unCompleteAllFor(character)}>
                  Mark none
                </button>
              </div>

              <div className="btn-group ml-2"
                   role="group"
                   aria-label="Filters">
                <button className="btn btn-outline-light active">
                  All items
                </button>
                <button className="btn btn-outline-light">
                  Event only
                </button>
                <button className="btn btn-outline-light">
                  Special
                </button>
              </div>

              <div className="btn-group ml-2"
                   role="group"
                   aria-label="Display worthless items">
                <button className="btn btn-outline-light active">
                  All items
                </button>
                <button className="btn btn-outline-light">
                  No standard items
                </button>
              </div>
            </div>
          </div>

          <ItemGroup {...{ items }} />
        </div>
      </section>
    )
  };

export default addPropsFromContext(CharacterPage);
