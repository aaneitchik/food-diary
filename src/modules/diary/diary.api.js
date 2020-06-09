import firebase from 'firebase/app';

import { db } from '../../firebase';

// Comment out for styling and figuring out structure
const entriesRef = db.collection('entries');

const diaryApi = {
  getAll,
  getEntryTypes,
  addEntry,
};

export default diaryApi;

async function getAll() {
  const querySnapshot = await entriesRef.get();

  return querySnapshot.docs.map(doc => doc.data());
}

function getEntryTypes() {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve([
        {
          _id: 'EATING',
          label: 'еда',
        },
        {
          _id: 'NOTE',
          label: 'пометка',
        },
      ]);
    }, 500)
  );
}

function addEntry(entry) {
  // Since each entry corresponds to a date, we'll use it as an id
  const entryId = entry.datetime.toString();

  // Create an entry if it doesn't exist, update otherwise
  return entriesRef.doc(entryId).set(
    {
      datetime: entry.datetime,
      entries: firebase.firestore.FieldValue.arrayUnion(entry),
    },
    { merge: true }
  );
}
