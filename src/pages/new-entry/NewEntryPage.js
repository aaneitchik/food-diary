import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Redirect } from 'react-router-dom';

import './NewEntryPage.css';

import rootStoreContext from '../../root.store';
import diaryApi from '../../modules/diary/diary.api';
import { toLocaleDate } from '../../common/formatting.utils';
import FoodItems from './FoodItems';
import { ROUTE_DIARY } from '../../routes';
import { ENTRY_TYPES } from '../../common/types';
import { FOOD_ITEM_INPUT_NAME_PREFIX } from './NewEntryPage.utils';

// TODO: Same here, try out state machines to handle loading/submitting/errors etc.
const NewEntryPage = () => {
  const { diaryStore } = useContext(rootStoreContext);
  const [selectedEntryType, setSelectedEntryType] = useState(null);
  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [eatingName, setEatingName] = useState('');
  const [noteText, setNoteText] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);

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

  const handleEatingNameChange = e => {
    setEatingName(e.target.value);
  };

  const handleNoteTextChange = e => {
    setNoteText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = document.getElementById('new-entry-form');
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    const entryDateInSeconds =
      new Date(
        +formValues.year,
        +formValues.month - 1,
        +formValues.day
      ).getTime() / 1000;

    const entryToCreate = {
      datetime: entryDateInSeconds,
      type: selectedEntryType,
    };

    if (selectedEntryType === ENTRY_TYPES.EATING) {
      entryToCreate.items = Object.keys(formValues)
        .filter(
          key =>
            key.startsWith(FOOD_ITEM_INPUT_NAME_PREFIX) &&
            formValues[key]?.length
        )
        .map(key => ({ name: formValues[key] }));
      entryToCreate.name = eatingName;
    } else if (selectedEntryType === ENTRY_TYPES.NOTE) {
      entryToCreate.text = noteText;
    }

    try {
      await diaryApi.addEntry(entryToCreate);
      setDidSubmit(true);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  };

  if (didSubmit) {
    return <Redirect to={{ pathname: ROUTE_DIARY }} />;
  }

  const dateInSeconds = new Date(year, month - 1, day).getTime() / 1000;

  // TODO: Can I move inputs to separate components?
  // TODO: Can some inputs be uncontrolled, like name?
  return (
    <div className="new-entry">
      <form id="new-entry-form" onSubmit={handleSubmit}>
        <fieldset className="new-entry__date --mb-4">
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

        <fieldset className="new-entry__types --mb-4">
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

        {selectedEntryType === ENTRY_TYPES.EATING && (
          <>
            <FoodItems />
            <label htmlFor="eating-name" className="new-entry__name --mt-4">
              <div className="--mb-1">Название приема пищи</div>
              <input
                id="eating-name"
                name="eating-name"
                type="text"
                value={eatingName}
                onChange={handleEatingNameChange}
              />
            </label>
          </>
        )}

        {selectedEntryType === ENTRY_TYPES.NOTE && (
          <label htmlFor="note-text" className="new-entry__note-text">
            <div className="--mb-1">Текст пометки</div>
            <textarea
              id="note-text"
              name="note-text"
              rows="5"
              className="new-entry__note-text-textarea"
              value={noteText}
              onChange={handleNoteTextChange}
            />
          </label>
        )}

        <button
          type="submit"
          className="new-entry__submit-btn primary-button --mt-6"
        >
          Добавить запись
        </button>
      </form>
    </div>
  );
};

export default observer(NewEntryPage);
