import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import {
  Cost, Quality, Color
} from '../constants';

//
export const findByName = id => L.find(R.whereEq({ id }));

// export const isCompleted = L.isDefined('completed');
export const isCompleted = L.isDefined(['completed', L.when(R.identity)]);

export const charItemsT = ['items', L.elems, 'data', L.elems];

//

export const Item = {
  qualityColor: 0,
  cost: R.compose(R.prop(R.__, Cost),
                  L.get('quality'))
};

// Character-specific

export const Character = {
  forName: (name, atom) => U.view(findByName(name), atom),
  completeAllFor: atom => atom.modify(L.set([charItemsT, 'completed'], true))
};

// Generic viewers

export const Generic = {
  idFor: U.view('id'),
  dataFor: U.view('data'),
  nameFor: U.view('name'),
  classFor: U.view('class'),
  qualityFor: U.view(['quality', L.valueOr(Quality.NONE)]),
  itemsFor: U.view('items'),
  costFor: U.view('cost'),
  eventFor: U.view('event'),

  percentageFor: status =>
    U.seq(status,
          U.apply(R.divide),
          U.multiply(100),
          U.lift1(x => `${x}%`))
};

//

export const EntryList = {
  // @todo Augment items to contain cost
  dataFor: U.view('data'),
  itemFor: (id, data) => U.view(id, data),
  completedFor: (id, data) => U.view([id, 'completed', L.valueOr(false)], data)
}

//

// Traversals
const allItemsCostT = [L.elems, 'cost'];
const completedItemsCostT = [L.elems, L.when(R.prop('completed')), 'cost'];

const allCharItems = [L.elems, 'data', L.elems];
const totalPrice = U.lift1Shallow(L.sum([allCharItems, 'cost']));
const incompletedPrice = U.lift1(L.sumAs(R.identity, [...allCharItems, 'cost']));

const allItems = U.lift1(L.collect(allCharItems));
const itemCount = U.lift1(L.count(L.elems));
const completedItemCount = U.lift1(L.countIf(isCompleted, L.elems));

const totalCost = items =>
  K(items, allItemsCostT, completedItemsCostT, (xs, allT, doneT) =>
    R.subtract(L.sum(allT, xs), L.sum(doneT, xs)));

const getWithQuality = obj =>
  U.lift1(R.pipe(L.get('quality'),
                 R.prop(R.__, obj)));

export const Entry = {
  allItems,
  itemCount,
  completedItemCount,

  totalPrice,
  incompletedPrice,
  totalCost,

  costForQuality: getWithQuality(Cost),
  colorForQuality: getWithQuality(Color),

  getCompletionStatus: items =>
    U.seq([Entry.completedItemCount, Entry.itemCount],
          U.map(R.apply(R.__, R.of(items))),
          U.lift(U.show))
};
