import * as React from 'karet';
import * as U from 'karet.util';
import { shallow } from 'enzyme';
import RootScene from './index';

it('renders without crashing', () => {
  const root = (
    <U.Context {...{ context: {} }}>
      <RootScene />
    </U.Context>
  );
  shallow(root);
});

/**
 * @todo Fix me
 */
it('handles missing data', () => {
  const root = (
    <U.Context {...{ context: {} }}>
      <RootScene />
    </U.Context>
  );

  const wrapper = shallow(root);
  // expect(wrapper.contains(<div>No data</div>)).toEqual(true);
});
