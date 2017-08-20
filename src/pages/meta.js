import * as U from 'karet.util';
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

export const Entry = {
  flatListItems: U.lift1(L.collect([L.elems, 'data', L.elems])),
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
                         U.lift1(R.prop(R.__, Cost))),

  colorForQuality: U.pipe(U.lift1(L.get('quality'),
                          U.lift1(R.prop(R.__, Color)))),

  getCompletionStatus: items =>
    U.seq([Entry.completedItemCount, Entry.itemCount],
          U.map(R.apply(R.__, R.of(items))),
          U.lift(U.show))
};
