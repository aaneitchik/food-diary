import React from 'react';

import './DayCard.css';

import { toLocaleDate } from '../../common/formatting.utils';
import NoteEntry from './NoteEntry';
import FoodEntry from './FoodEntry';
import { ENTRY_TYPES } from '../../common/types';

const DayCard = ({ day }) => {
  return (
    <article className="day">
      <h1 className="day__date">{toLocaleDate(day.datetime)}</h1>
      {day.entries.map(entry => {
        let entryToRender = null;

        if (entry.type === ENTRY_TYPES.NOTE) {
          entryToRender = <NoteEntry entry={entry} />;
        } else if (entry.type === ENTRY_TYPES.EATING) {
          entryToRender = <FoodEntry entry={entry} />;
        }

        if (entryToRender) {
          return (
            <div className="--mb-1" key={entry.id}>
              {entryToRender}
            </div>
          );
        }

        return null;
      })}
    </article>
  );
};

export default DayCard;
