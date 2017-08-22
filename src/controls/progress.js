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
     value = number.showAsPercent(progress),
     width = value,
     minWidth = number.showAsPercent(0.075),
     text = U.always(value)
   }) =>
    <div className="completion completion-progress">
      <div className="progress">
        <div className="progress-bar"
             style={{ width, minWidth }}>
          {U.apply(text, undefined)}
        </div>
      </div>
    </div>;

export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;
