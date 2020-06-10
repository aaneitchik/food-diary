import React from 'react';

import './DayCard.css';

import { toLocaleDate } from '../../common/formatting.utils';
import NoteEntry from './NoteEntry';
import FoodEntry from './FoodEntry';

const DayCard = ({ day }) => {
  return (
    <article className="day">
      <h1 className="day__date">{toLocaleDate(day.datetime)}</h1>
      {/* TODO: Actually index is not a good idea, but for now we don't have any editing. */}
      {/* Replace with something like an id when necessary */}
      {/* eslint-disable react/no-array-index-key */}
      {day.entries.map((entry, index) => {
        let entryToRender = null;

        if (entry.type === 'NOTE') {
          entryToRender = <NoteEntry entry={entry} />;
        } else if (entry.type === 'EATING') {
          entryToRender = <FoodEntry entry={entry} />;
        }

        if (entryToRender) {
          return (
            <div className="--mb-1" key={index}>
              {entryToRender}
            </div>
          );
        }

        return null;
      })}
      {/* eslint-enable react/no-array-index-key */}
    </article>
  );
};

export default DayCard;
