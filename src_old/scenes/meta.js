import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const State = {
  navBarIn: U.view(L.props('navbar', 'characters'))
};

export const NavBar = {
  showDropdownIn: U.view(['navbar', 'show', L.define(false)]),
  dropdownItemsIn: U.view(['characters', 'data', L.valueOr([])])
};

export const nameOf = U.view('name');
export const idOf = U.view('id');
