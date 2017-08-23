import * as React from 'karet';
import * as L from 'partial.lenses';

import { Icon as Icons } from '../assets/resources';

export const Icon = ({ type }) =>
  <span className="icon">
    {L.get([type, L.valueOr(<div>empty</div>)], Icons)}
  </span>;
