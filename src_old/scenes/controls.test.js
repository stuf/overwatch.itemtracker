import * as React from 'karet';
import * as U from 'karet.util';
import { shallow } from 'enzyme';
import * as C from './controls';

it('should create a dropdown item', () => {
  const wrapper = shallow(<C.DropDownItem />);
});
it('should create a dropdown', () => {
  const wrapper = shallow(<C.DropDown />);
});
it('should create a navigation bar');
