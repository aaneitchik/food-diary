import { action, observable } from 'mobx';

const diaryStore = observable({
  days: [],
  entryTypes: [],
});

diaryStore.setDays = action(days => {
  diaryStore.days = days;
});

diaryStore.setEntryTypes = action(types => {
  diaryStore.entryTypes = types;
});

export default diaryStore;
