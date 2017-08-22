import * as React from 'karet';
import { shallow } from 'enzyme';

import {
  Item,
  ItemGroupList
} from './item';

//

it('should render an entry', () => {
  const wrapper = shallow(<Item />);
});

it('should render an entry list', () => {
  const wrapper = shallow(<ItemGroupList />);
});
