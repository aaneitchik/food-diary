import React from 'react';

import './DayCard.css';

import { toLocaleDate } from '../../common/formatting.utils';
import NoteEntry from './NoteEntry';
import FoodEntry from './FoodEntry';

const DayCard = ({ day }) => {
  return (
    <article className="day">
      <h1 className="day__date">{toLocaleDate(day.datetime.seconds)}</h1>
      {day.entries.map(entry => {
        if (entry.type === 'NOTE') {
          return <NoteEntry key={entry.id} entry={entry} />;
        }

        if (entry.type === 'EATING') {
          return <FoodEntry key={entry.id} entry={entry} />;
        }

        return null;
      })}
    </article>
  );
};

export default DayCard;
