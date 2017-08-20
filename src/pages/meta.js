import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import {
  Cost, Quality
} from '../constants';

//

export const isCompleted = L.isDefined('completed');

export const charItemsT = ['items',
                           L.elems,
                           'data',
                           L.elems];

//

export const Item = {
  cost: R.compose(R.prop(R.__, Cost),
                  L.get('quality'))
};

//

export const Character = {
  forName: (name, data) => U.view(L.find(R.whereEq({ id: name })), data)
};

//

export const Generic = {
  idFor: U.view('id'),
  dataFor: U.view('data'),
  nameFor: U.view('name'),
  qualityFor: U.view('quality'),
  itemsFor: U.view('items'),
  costFor: U.view('cost')
};

//

export const EntryList = {
  // @todo Augment items to contain cost
  dataFor: U.view('data'),
  itemFor: (id, data) => U.view(id, data),
  completedFor: (id, data) => U.view([id, 'completed', L.valueOr(false)], data)
}

//

export const Entry = {
  allItems: U.lift1(L.collect(charItemsT)),
  itemCount: U.lift1(L.count(L.elems)),
  completedItemCount: U.lift1(L.countIf(isCompleted, L.elems)),

  totalPrice: U.lift1(L.sum([L.elems, 'data', L.elems, 'cost'])),
  incompletedPrice: U.lift1(L.sum([L.elems, 'data', L.elems, L.when(x => x.completed), 'cost'])),

  totalCost: items =>
    U.seq([Entry.totalPrice, Entry.incompletedPrice],
          U.map(R.apply(R.__, R.of(items))),
          U.apply(U.subtract)),

  // @todo Fixme into something pretty
  costForQuality: U.pipe(U.lift1(L.get('quality')),
                         U.lift1(R.prop(R.__, Cost)))
};
