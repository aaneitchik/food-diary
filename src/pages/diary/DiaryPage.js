import React, { useEffect, useState } from 'react';

import './DiaryPage.css';

import diaryApi from './diary.api';
import DayCard from './DayCard';

const DiaryPage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // TODO: Handle unmount, better move somewhere else
    const fetchEntries = async () => {
      try {
        const allEntries = await diaryApi.getAll();

        setEntries(allEntries);
      } catch (e) {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="diary">
      {entries.map(day => (
        <DayCard key={day.datetime.seconds} day={day} />
      ))}
    </div>
  );
};

export default DiaryPage;
