import * as React from 'karet';
import { shallow } from 'enzyme';

import HomePage from './home-page';

it('should render a home page with initial data', () => {
  const wrapper = shallow(<HomePage />);
});
