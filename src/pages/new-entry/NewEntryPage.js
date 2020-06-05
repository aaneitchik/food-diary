import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import './NewEntryPage.css';

import rootStoreContext from '../../root.store';
import diaryApi from '../../modules/diary/diary.api';
import { toLocaleDate } from '../../common/formatting.utils';

const NewEntryPage = () => {
  const { diaryStore } = useContext(rootStoreContext);
  const [selectedEntryType, setSelectedEntryType] = useState(null);
  const today = new Date();
  const [day, setDay] = useState(today.getDay());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    let didCancel = false;

    const fetchEntryTypes = async () => {
      try {
        const entryTypes = await diaryApi.getEntryTypes();

        if (!didCancel && entryTypes.length) {
          setSelectedEntryType(entryTypes[0]._id);
          diaryStore.setEntryTypes(entryTypes);
        }
      } catch (e) {
        // TODO: Handle error
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    fetchEntryTypes();

    return () => {
      didCancel = true;
    };
  }, [diaryStore]);

  const handleEntryTypeChange = e => {
    setSelectedEntryType(e.target.value);
  };

  const handleDayChange = e => {
    setDay(e.target.value);
  };

  const handleMonthChange = e => {
    setMonth(e.target.value);
  };

  const handleYearChange = e => {
    setYear(e.target.value);
  };

  const dateInSeconds = new Date(year, month - 1, day).getTime() / 1000;

  return (
    <div className="new-entry">
      <form>
        <fieldset className="new-entry__date">
          <legend>
            Дата: {toLocaleDate(dateInSeconds)} {year}
          </legend>
          <div className="new-entry__date-part">
            <label htmlFor="day" className="new-entry__date-label">
              День
              <input
                id="day"
                name="day"
                type="number"
                className="new-entry__date-input"
                min={1}
                max={31}
                value={day}
                onChange={handleDayChange}
              />
            </label>
          </div>
          <div className="new-entry__date-part">
            <label htmlFor="month" className="new-entry__date-label">
              Месяц
              <input
                id="month"
                name="month"
                type="number"
                className="new-entry__date-input"
                min={1}
                max={12}
                value={month}
                onChange={handleMonthChange}
              />
            </label>
          </div>
          <div className="new-entry__date-part">
            <label htmlFor="year" className="new-entry__date-label">
              Год
              <input
                id="year"
                name="year"
                type="number"
                className="new-entry__date-input"
                min={0}
                value={year}
                onChange={handleYearChange}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="new-entry__types">
          <legend className="new-entry__types-legend">Вид записи</legend>
          {diaryStore.entryTypes.map(entryType => {
            return (
              <div key={entryType._id} className="new-entry__type">
                <input
                  id={entryType._id}
                  value={entryType._id}
                  type="radio"
                  name="entry-type"
                  className="new-entry__type-input"
                  checked={selectedEntryType === entryType._id}
                  onChange={handleEntryTypeChange}
                />
                <label htmlFor={entryType._id}>{entryType.label}</label>
              </div>
            );
          })}
        </fieldset>
      </form>
    </div>
  );
};

export default observer(NewEntryPage);
