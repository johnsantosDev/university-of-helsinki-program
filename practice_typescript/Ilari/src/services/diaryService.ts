import diaryEntries from '../data/entries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({id, date, weather, visibility}) => ({
    id,
    date,
    weather,
    visibility
  }));
}

const addDiary = (newEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaryEntries.map(d => d.id)) + 1,
    ...newEntry
  }
  diaryEntries.push(newDiary); 
  return newDiary; 
};

const findDiaryByID = (id: number): DiaryEntry | undefined => {
  return diaryEntries.find(d => d.id === id); 
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findDiaryByID
};