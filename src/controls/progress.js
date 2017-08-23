/**
 * @module Controls.Progress
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { number } from '../helpers';

//

export const CompletionProgress =
  ({
     progress,
     sticky,
     value = number.showAsPercent(progress),
     width = value,
     minWidth = number.showAsPercent(0),
     text = U.always(value)
   }) =>
    <div className={U.cns('completion completion-progress',
                          U.ift(sticky, 'sticky-top'))}>
      <div className="progress">
        <div className="progress-bar"
             style={{ width, minWidth }} />
        <div className="progress-text">
          {U.apply(text, undefined)}
        </div>
      </div>
    </div>;

export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;
