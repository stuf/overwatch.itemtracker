import * as U from 'karet.util';
import * as L from 'partial.lenses';

//

const propForItem = p => (i, d) => U.view([i, p], d);

export const NavBarL = {
  dataFor: ['data', L.valueOr([])],
  showBarFor: 'show'
};

export const NavBarV = {
  nameAt: propForItem('name'),
  idAt: propForItem('id'),
  isNavigationVisibleFor: U.view(['navigation', 'show'])
};

// Progress

export const getProgressFor = U.compose(U.apply(U.divide), U.values);
export const getProgress = o => U.apply(U.divide, U.values(o));
