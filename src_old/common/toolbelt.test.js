import * as J from 'jsverify';
import * as R from 'ramda';

import * as T from './toolbelt';

const double = R.multiply(2);
const str = JSON.stringify;
const cmp = (a, b) => str(a) === str(b);

it('should camelcase words', () => {
  const input = 'plipeti plop';
  const expected = 'plipetiPlop';
  const result = T.camelCase(input);
  expect(result).toEqual(expected);
});

J.property('should adjust the first item in an array', J.nearray(J.nat), a => {
  const expected = R.adjust(double, 0, a);
  const result = T.fstTo(double, a);
  return cmp(expected, result);
})

J.property('should adjust the second item in an array', J.nat, J.nat, (a, b) => {
  const input = [a, b];
  const expected = [a, b * 2];
  const result = T.sndTo(double, input);
  return cmp(expected, result);
})
