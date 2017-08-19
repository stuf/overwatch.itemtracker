import * as React from 'karet';
import { shallow } from 'enzyme';

import App from './app';

it('should render the application with initial settings', () => {
  const wrapper = shallow(<App />);
});
