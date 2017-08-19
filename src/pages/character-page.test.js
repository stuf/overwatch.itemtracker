import * as React from 'karet';
import { shallow } from 'enzyme';

import CharacterPage from './character-page';

it('should render CharacterPage with initial data', () => {
  const wrapper = shallow(<CharacterPage />);
});
