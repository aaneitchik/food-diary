import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import './DiaryPage.css';

import diaryApi from '../../modules/diary/diary.api';
import DayCard from './DayCard';
import rootStoreContext from '../../root.store';

// TODO: Try out state machines to handle errors/loading state here etc.
const DiaryPage = () => {
  const { diaryStore } = useContext(rootStoreContext);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const allEntries = await diaryApi.getAll();

        diaryStore.setDays(allEntries);
      } catch (e) {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    fetchEntries();
  }, [diaryStore]);

  return (
    <div className="diary">
      {diaryStore.days.map(day => (
        <DayCard key={day.datetime} day={day} />
      ))}
    </div>
  );
};

export default observer(DiaryPage);
