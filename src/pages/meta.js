import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const Generic = {
  nameFor: U.view('name')
};

export const EntryList = {
  dataFor: U.view('data'),
  itemFor: (id, data) => U.view(id, data),
  completedFor: (id, data) => U.view([id, 'completed', L.valueOr(false)], data)
}
