import firebase from 'firebase/app';

import { getDb } from '../../firebase';
import { ENTRY_TYPES } from '../../common/types';

const getUserEntriesRef = async () => {
  const userId = firebase.auth().currentUser.uid;

  const db = await getDb();

  return db.collection('userEntries').doc(userId).collection('entries');
};

const diaryApi = {
  getAll,
  getEntryTypes,
  addEntry,
};

export default diaryApi;

async function getAll() {
  const userEntriesRef = await getUserEntriesRef();
  const daysToLoad = 7;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dateFilter =
    new Date(year, month, date).getTime() / 1000 -
    (daysToLoad - 1) * 24 * 60 * 60;

  const querySnapshot = await userEntriesRef
    .where('datetime', '>=', dateFilter)
    .get();

  // This is an example of reduce method which is better with param reassigning.
  // It's also fine cause the data comes from the API.
  /* eslint-disable no-param-reassign */
  const daysByDate = querySnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .reduce((days, entry) => {
      const day = days[entry.datetime];
      if (day) {
        day.entries.push(entry);
      } else {
        days[entry.datetime] = {
          datetime: entry.datetime,
          entries: [entry],
        };
      }

      return days;
    }, {});
  /* eslint-enable */

  return Object.values(daysByDate)
    .map(day => ({
      ...day,
      entries: day.entries.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => b.datetime - a.datetime);
}

// Would be better to get this from the server, but for now here is ok
function getEntryTypes() {
  return new Promise(resolve =>
    resolve([
      {
        _id: ENTRY_TYPES.EATING,
        label: 'еда',
      },
      {
        _id: ENTRY_TYPES.NOTE,
        label: 'пометка',
      },
    ])
  );
}

async function addEntry(entry) {
  const userEntriesRef = await getUserEntriesRef();

  return userEntriesRef.doc().set(entry);
}
