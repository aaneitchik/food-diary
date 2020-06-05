import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import './NewEntryPage.css';

import rootStoreContext from '../../root.store';
import diaryApi from '../../modules/diary/diary.api';

const NewEntryPage = () => {
  const { diaryStore } = useContext(rootStoreContext);
  const [selectedEntryType, setSelectedEntryType] = useState(null);

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

  return (
    <div className="new-entry">
      <form>
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
