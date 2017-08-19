import * as React from 'karet';
import { shallow } from 'enzyme';

import HomePage from './home-page';

it('should render HomePage with initial data', () => {
  const wrapper = shallow(<HomePage />);
});
