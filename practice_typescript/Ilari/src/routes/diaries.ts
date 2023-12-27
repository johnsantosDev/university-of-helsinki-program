import express from 'express';

import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries()); 
})

router.post('/', (req, res) => {
  try {
    const newDiary = toNewDiaryEntry(req.body); 
    const addedDiary = diaryService.addDiary(newDiary);
    res.json(addedDiary);
  } catch (error: unknown) {
    let errMsg = 'Something went wrong '; 
    if(error instanceof Error) {
      errMsg += error.message
    }
    res.status(400).send(errMsg); 
  }
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findDiaryByID(Number(req.params.id)); 

  if(diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

export default router;