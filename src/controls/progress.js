/**
 * @module Controls.Progress
 */
import * as React from 'karet';
import * as U from 'karet.util';

import { number } from '../helpers';

//

const Size = {
  MD: 'md'
};

const getXPos = U.compose(U.lift1(number.showAsPercent), U.negate, U.subtract(1));

export const CompletionProgress = ({
    progress,
    sticky,
    barColor,
    text,
    size = Size.MD
  }) => {
  const xPos = getXPos(progress);
  const style = {
    transform: U.string`translateX(${xPos})`,
    backgroundColor: barColor
  };

  return (
    <div className={U.cns('completion completion-progress',
                          U.ift(sticky, 'sticky-top'),
                          U.string`completion-progress-${size}`)}>
      <div className="progress">
        <div className="progress-bar" {...{ style }} />
        <div className="progress-text">
          {text}
        </div>
      </div>
    </div>
  );
};

export const CompletionStatus =
  ({ completed, total }) =>
    <div className="completion completion-status">
      {completed} / {total}
    </div>;
