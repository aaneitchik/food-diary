import firebase from 'firebase/app';

import { getDb } from '../../firebase';
import { ENTRY_TYPES } from '../../common/types';

const getUserDaysRef = async () => {
  const userId = firebase.auth().currentUser.uid;

  const db = await getDb();

  return db.collection('days').doc(userId).collection('days');
};

const diaryApi = {
  getAll,
  getEntryTypes,
  addEntry,
};

export default diaryApi;

async function getAll() {
  const userDaysRef = await getUserDaysRef();
  const querySnapshot = await userDaysRef
    .orderBy('datetime', 'desc')
    // TODO: Limit is temporary, will need proper loading by page
    .limit(14)
    .get();

  return querySnapshot.docs.map(doc => doc.data());
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
  // Since each entry corresponds to a date, we'll use it as an id
  const entryId = entry.datetime.toString();

  const userDaysRef = await getUserDaysRef();
  // Create an entry if it doesn't exist, update otherwise
  return userDaysRef.doc(entryId).set(
    {
      datetime: entry.datetime,
      entries: firebase.firestore.FieldValue.arrayUnion(entry),
    },
    { merge: true }
  );
}
