import * as React from 'karet';
import { shallow } from 'enzyme';

import { NavBar } from './navigation';

it('should render a NavBar', () => {
  const wrapper = shallow(<NavBar />);
});
