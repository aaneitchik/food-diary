// eslint-disable-next-line no-unused-vars
import { db } from '../../firebase';
import { diaryMock } from './diary.mock';

// Comment out for styling and figuring out structure
// const entriesRef = db.collection('entries');

const diaryApi = {
  getAll,
  getEntryTypes,
};

export default diaryApi;

async function getAll() {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(diaryMock);
    }, 500)
  );
}

// async function getAll() {
//   const querySnapshot = await entriesRef.get();
//
//   return querySnapshot.docs.map((doc) => doc.data());
// }

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