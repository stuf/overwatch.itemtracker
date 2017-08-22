import * as React from 'karet';
import * as U from 'karet.util';

import { toggle } from '../helpers';
import {
  Generic as G,
  EntryList as EL
} from '../pages/meta';

//

export const Item = ({ completed, item }) =>
  <li onClick={toggle(completed)}
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

//

export const ItemGroupList = ({ items }) =>
  <ul className={U.cns('list-group', 'entry__list')}>
    {U.seq(items,
           U.indices,
           U.mapCached(i => <Item item={EL.itemFor(i, items)}
                                  completed={EL.completedFor(i, items)} />))}
  </ul>;

//

export const ItemGroup = ({ items, name }) =>
  <div className="item-groups">
    {U.seq(items,
           U.indices,
           U.mapCached(i => {
             const group = U.view(i, items);
             const id = G.idFor(group);
             const data = G.dataFor(group);

             return (
               <div key={i} className="item-group">
                 <header className="row item-group__header">
                   <h3 className="col">{id}</h3>
                   <div className="col-xs-3">0 / 0</div>
                 </header>

                 <ItemGroupList items={data} />
               </div>
             )
           }))};
  </div>;

