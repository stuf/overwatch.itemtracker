import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'ramda';

import * as M from './meta';
import { Categories, Header } from './controls';
import { addPropsFromContext } from '../helpers';

//

const toggleItem = item => e => {
  e.preventDefault();
  item.view('done').modify(R.not);
};

const CharacterPage = ({
  state,
  player,
  match,
  char = M.getCharacterDataFor(match.params.name, state),
  items = M.itemsOf(char),
  itemCategories = U.keys(items)
}) =>
  <div className="character-page">
    <section>
      <Header character={char} />
      <button className="btn btn-primary"
              onClick={toggleItem(char)}>
        Derp
      </button>
      <Categories items={items} />
    </section>
  </div>;

export default addPropsFromContext(CharacterPage);
