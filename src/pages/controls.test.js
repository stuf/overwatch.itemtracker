import * as React from 'karet';
import { shallow } from 'enzyme';
import util from 'util';

import {
  NavBar,
  CompletionStatus,
  Entry,
  EntryList
} from './controls';

//

it('should render NavBar', () => {
  const wrapper = shallow(<NavBar />);
})

it('should render Entry', () => {
  const wrapper = shallow(<Entry />);
});

it('should render EntryList', () => {
  const wrapper = shallow(<EntryList />);
});

it('should render CompletionStatus', () => {
  const wrapper = shallow(<CompletionStatus />);
});
