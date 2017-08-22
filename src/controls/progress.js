import * as React from 'karet';

import { number } from '../helpers';

//

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

export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;