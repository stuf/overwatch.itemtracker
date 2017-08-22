/**
 * @module Controls.Progress
 */
import * as React from 'karet';

import { number } from '../helpers';

//

/**
 * @class CompletionProgress
 * @param progress
 * @param value
 * @constructor
 */
export const CompletionProgress =
  ({ progress, value = number.showAsPercent(progress) }) =>
    <div className="completion completion-progress">
      <div className="progress">
        <div className="progress-bar"
             style={{ width: value, minWidth: number.showAsPercent(0.075) }}>
          {value}
        </div>
      </div>
    </div>;

/**
 * @class CompletionStatus
 * @param completed
 * @param total
 * @constructor
 */
export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;
