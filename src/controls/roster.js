import * as React from 'karet';
import * as U from 'karet.util';
import { Link } from 'react-router-dom';
import { CompletionProgress } from './progress';

import * as M from './meta';
import {
  Generic as G,
  Items as I
} from '../pages/meta';

const getProgressFor = U.compose(U.apply(U.divide), U.values);
const getProgress = o => U.apply(U.divide, U.values(o));

export const Roster = ({ list }) =>
  <div className="roster-list">
    {U.seq(list,
           U.indices,
           U.mapCached(i => {
             const c = U.view(i, list);
             const allCharItems = I.collectCharacterItems(c);
             const id = G.idFor(c);
             const name = G.nameFor(c);
             const charColor = U.view(['colors', 'primary'], c);

             const charItemStats = {
               completed: I.totalCompletedItemCount(allCharItems),
               total: I.totalItemCount(allCharItems)
             };

             const charItemProgress = M.getProgress(charItemStats);
             const text = U.join(' / ', U.values(charItemStats));

             return (
               <Link karet-lift to={U.string`/character/${id}`}
                     className={U.cns('roster-link', U.string`hero-${id}`)}>
                 <header>
                   <div className="hero-icon" />
                   {name}
                 </header>

                 <CompletionProgress progress={charItemProgress}
                                     size="sm"
                                     barColor={charColor}
                                     text={text} />
               </Link>
           );
           }))}
  </div>

