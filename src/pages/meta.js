import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

//

export const isCompleted = L.isDefined('completed');

export const charItemsT = ['items', L.elems, 'data', L.elems];

//

export const Character = {
  forName: (name, data) => U.view(L.find(R.whereEq({ id: name })), data)
};

//

export const Generic = {
  dataFor: U.view('data'),
  nameFor: U.view('name')
};

//

export const EntryList = {
  dataFor: U.view('data'),
  itemFor: (id, data) => U.view(id, data),
  completedFor: (id, data) => U.view([id, 'completed', L.valueOr(false)], data)
}

//

export const Entry = {
  allItems: U.lift1(L.collect(charItemsT)),
  itemCount: U.lift1(L.count(L.elems)),
  completedItemCount: U.lift1(L.countIf(isCompleted, L.elems))
};
