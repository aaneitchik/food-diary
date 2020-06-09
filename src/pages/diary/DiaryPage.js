import React, { useEffect, useState } from 'react';

import './DiaryPage.css';

import diaryApi from '../../modules/diary/diary.api';
import DayCard from './DayCard';

// TODO: Try out state machines to handle errors/loading state here etc.
const DiaryPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let didCancel = false;
    const fetchEntries = async () => {
      try {
        const allEntries = await diaryApi.getAll();

        if (!didCancel) {
          // TODO: I should probably move this to mobx
          setEntries(allEntries);
        }
      } catch (e) {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    fetchEntries();

    return () => {
      didCancel = true;
    };
  }, []);

  return (
    <div className="diary">
      {entries.map(day => (
        <DayCard key={day.datetime} day={day} />
      ))}
    </div>
  );
};

export default DiaryPage;
