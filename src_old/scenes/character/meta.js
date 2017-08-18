import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import { Filter, Quality, Cost, CostInverse } from '../../common/constants';

const character = id => [L.find(R.whereEq({ id }))];

export const getCharacterDataFor = (name, data) =>
  U.view(['characters', 'data', character(name)], data);


// Lenses

export const itemCostI =
  L.iso(x => Cost[x],
        x => CostInverse[x]);

// Character data

const allItemsL = [L.values, L.elems];

export const Items = {
  countAll: U.lift1(L.count(allItemsL)),
  countDone: U.lift1(L.countIf(L.isDefined('done'), allItemsL))
};

export const selectedStateOf = U.view('done');
export const nameOf = U.view('name');
export const idOf = U.view('id');
export const classOf = U.view('class');
export const colorsOf = U.view('colors');
export const descriptionOf = U.view('description');
export const itemsOf = U.view(['items', L.define({})]);
export const qualityOf = U.view(['quality', L.define(Quality.NONE)]);
export const costOf = U.view(['quality', L.normalize(x => Cost[x])]);

export const char = id => [L.normalize(R.sortBy(R.prop('id'))),
                           L.find(R.propEq(id)),
                           L.is(id)];

// State

export const filterIn = U.view(['filter', L.define(Filter.NONE)]);
