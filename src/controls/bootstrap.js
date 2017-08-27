import * as React from 'karet';
import * as U from 'karet.util';

const BTN_BASE = 'btn';

//

const getSize = size => U.join('-', [BTN_BASE, size]);
const getType = type => U.join('-', [BTN_BASE, type]);

//

export const BaseButton =
  ({
     children,
     size,
     type = 'primary'
   }) =>
    <button className={U.cns(BTN_BASE,
                             getType(type),
                             getSize(size))}>
      {children}
    </button>;

//

export const PrimaryButton =
  ({ type, ...props }) =>
    <BaseButton type="primary" {...props} />;

//

export const SecondaryButton =
  ({ type, ...props }) =>
    <BaseButton type="secondary" {...props} />;
