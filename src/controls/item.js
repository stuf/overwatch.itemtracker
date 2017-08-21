import * as React from 'karet';
import * as U from 'karet.util';

import {
  Generic as G
} from '../pages/meta';

export const Entry = ({ completed, item }) =>
  <li onClick={toggleState(completed)}
      className={U.cns('list-group-item',
        'entry__list__item',
        'item-quality-bg',
        U.ift(completed, 'active'),
        U.string`item-quality-${G.qualityFor(item)}`)}>
    {G.nameFor(item)}

    <span className="badge badge-primary badge-pill ml-2">
      {G.costFor(item)}
    </span>
  </li>;


