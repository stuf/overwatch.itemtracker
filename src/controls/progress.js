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
     barColor,
     size = 'md',
     value = number.showAsPercent(progress),
     width = value,
     minWidth = number.showAsPercent(0),
     text = value
   }) =>
    <div className={U.cns('completion completion-progress',
                          U.ift(sticky, 'sticky-top'),
                          U.string`completion-progress-${size}`)}>
      <div className="progress">
        <div className="progress-bar"
             style={{
               width,
               minWidth,
               backgroundColor: U.ift(U.not(U.isEmpty(barColor)), barColor)
             }} />
        <div className="progress-text">
          {text}
        </div>
      </div>
    </div>;

export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;
