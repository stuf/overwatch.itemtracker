import * as Const from './constants';

it('should expose filters', () =>
  expect(Const.Filter).not.toBeFalsy())

it('should expose item quality constants', () =>
  expect(Const.Quality).not.toBeFalsy());

it('should expose item cost constants', () =>
  expect(Const.Cost).not.toBeFalsy());
