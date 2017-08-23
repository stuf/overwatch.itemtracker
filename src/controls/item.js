/**
 * @module Controls.Item
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { toggle, string } from '../helpers';
import { Icon } from '../controls/icon';
import { Icon as Icons } from '../assets/resources';
import {
  Generic as G,
  EntryList as EL,
  Items as I
} from '../pages/meta';

console.log({ Icon, Icons });

//

export const Item = ({ completed, item }) =>
  <li onClick={toggle(completed)}
      className={U.cns('list-group-item',
                       'item-group__list-item',
                       'item-quality-bg',
                       U.ift(completed, 'active'),
                       U.string`item-quality-${G.qualityFor(item)}`)}>
    {G.nameFor(item)}

    <span className="item-group__list-item__cost">
      {G.costFor(item)}
    </span>
  </li>;

//

export const ItemGroupList = ({ items }) =>
  <ul className={U.cns('list-group', 'item-group__list')}>
    {U.seq(items,
           U.indices,
           U.mapCached(i => <Item item={EL.itemFor(i, items)}
                                  completed={EL.completedFor(i, items)} />))}
  </ul>;

//

export const ItemGroup = ({ items, name }) =>
  <section className="item-groups">
    <div className="row">
      {U.seq(items,
             U.indices,
             U.mapCached(i => {
               const group = U.view(i, items);
               const id = G.idFor(group);
               const data = G.dataFor(group);
               const name = string.capitalize(id);

               return (
                 <article key={i} className="item-group col-6 mt-2">
                   <header className="item-group__header">
                     <h3>
                       {name}
                       <span className="item-group__status">
                         {I.totalCompletedItemCount(data)} / {I.totalItemCount(data)}
                       </span>
                     </h3>
                   </header>

                   <ItemGroupList items={data} />
                 </article>
               )
             }))}
    </div>
  </section>;

