import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';

export const addPropsFromContext =
  (Component, asProps = L.props('state')) =>
    U.withContext((props, ctx) =>
      <Component {...{ ...props, ...L.get(asProps, ctx) }} />);
