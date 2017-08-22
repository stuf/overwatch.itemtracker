import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import {
  Cost, Quality, Color
} from '../constants';

import { number } from '../helpers';

// Composable lenses

export const findByName = id => L.find(R.whereEq({ id }));
export const isCompleted = L.isDefined(['completed', L.when(R.identity)]);

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
  percentageFor: U.pipe(U.apply(R.divide), U.lift1(number.showAsPercent))
};

//

export const EntryList = {
  // @todo Augment items to contain cost
  dataFor: U.view('data'),
  itemFor: (id, data) => U.view(id, data),
  completedFor: (id, data) => U.view([id, 'completed', L.valueOr(false)], data)
};

//

// Traversals
const itemsT = [L.elems];
const completedItemsT = [itemsT, L.when(R.prop('completed'))];
const characterItemsT = ['items', L.elems, 'data', L.elems];
const allCharacterItemsT = [L.elems, characterItemsT];

const itemCostsT = [itemsT, 'cost'];
const completedItemCostsT = [completedItemsT, 'cost'];

const allItemsCostT = [L.elems, 'cost'];
const completedItemsCostT = [L.elems, L.when(R.prop('completed')), 'cost'];

const allCharItemsL = [L.elems, 'data', L.elems];
const totalPrice = U.lift1Shallow(L.sum([allCharItemsL, 'cost']));
const incompletedPrice = U.lift1(L.sumAs(R.identity, [...allCharItemsL, 'cost']));

const allCharItems = U.lift1(L.collect(allCharItemsL));
const itemCount = U.lift1(L.count(L.elems));
const completedItemCount = U.lift1(L.countIf(isCompleted, L.elems));

//

// Character-specific

export const Character = {
  forName: (name, atom) => U.view(findByName(name), atom),
  completeAllFor: atom => atom.modify(L.set([characterItemsT, 'completed'], true))
};

export const Items = {
  collectAllItems: U.lift1(L.collect(allCharacterItemsT)),
  collectCharacterItems: U.lift1(L.collect(characterItemsT)),
  totalItemCount: U.lift1(L.count(L.elems)),
  totalCompletedItemCount: U.lift1(L.countIf(isCompleted, L.elems)),
  itemCost: U.lift1(L.sum(itemCostsT)),
  completedItemCost: U.lift1(L.sum(completedItemCostsT))
};

//

const totalCost = items =>
  K(items, allItemsCostT, completedItemsCostT, (xs, allT, doneT) =>
    R.subtract(L.sum(allT, xs), L.sum(doneT, xs)));

const getWithQuality = obj =>
  U.lift1(R.pipe(L.get('quality'),
                 R.prop(R.__, obj)));

export const Entry = {
  allCharItems,
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
          U.lift(U.show)),

  optics: {
    characterItemsT,
    allCharacterItemsT,
    itemsT,
    itemCostsT,
    allItemsCostT,
    completedItemsT,
    completedItemCostsT,
    completedItemsCostT,
    allCharItemsL
  }
};
