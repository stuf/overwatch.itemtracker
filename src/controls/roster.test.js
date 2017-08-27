import * as React from 'karet';
import { shallow } from 'enzyme';

import { Roster } from './roster';

it('should render a character roster', () => {
  const wrapper = shallow(<Roster />);
});
