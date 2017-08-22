import * as React from 'karet';
import { shallow } from 'enzyme';

import {
  CompletionProgress,
  CompletionStatus
} from './progress';

//

it('should render a completion progress bar', () => {
  const wrapper = shallow(<CompletionProgress />);
});

it('should render completion status', () => {
  const wrapper = shallow(<CompletionStatus />);
});
