import * as React from 'karet';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as M from './meta';
// import * as T from '../../common/toolbelt';

//

const toggleItem = item => {
  console.log('toggle item', item.get());
  item.view('done').modify(R.not);
};

export const ItemsProgress = ({ done, total }) =>
  <div>
    {done} / {total}
  </div>;

//

export const Header = ({ character }) => {
  const items = M.itemsOf(character);
  const done = M.Items.countDone(items);
  const total = M.Items.countAll(items);

  return (
    <header>
      <p>{M.nameOf(character)}</p>
      <p>{M.classOf(character)}</p>
      <ItemsProgress {...{ done, total }} />
    </header>
  );
};

//

export const Item = ({
  item,
  value = U.view('done', item)
}) =>
  <a className={U.cns('list-group-item', U.ift(value, 'active'))}
      onClick={e => {
        e.preventDefault();
        toggleItem(item);
      }}>
    <span className="item-name">
      {M.nameOf(item)}
    </span>
    <span className="item-cost">
      ({M.costOf(item)})
    </span>
  </a>;

//

export const ItemGroup = ({ items, name, className }) =>
  <ul className={U.cns('list-group list-group-flush', className)}>
    {U.seq(items,
           U.mapElems((item, idx) =>
             <Item {...{ key: idx, item }} />))}
  </ul>;

//

export const Category = ({ name, items, className = "card mb-3" }) =>
  <article {...{ className }}>
    <header className="card-header">
      {name}
    </header>

    <ItemGroup items={items} name={name} />
  </article>;

//

export const Categories = ({ items }) =>
  <div>
    {U.sink(U.scope(() => {
      items.map(L.collect(['items', L.elems]))
           .log('items');
    }))}

    {/* Well this is a bit unorthodox */}
    {U.seq(U.keys(items),
           U.mapIndexed((x, i) =>
             <Category key={i}
                       name={x}
                       items={U.view(x, items)} />))}
  </div>;
