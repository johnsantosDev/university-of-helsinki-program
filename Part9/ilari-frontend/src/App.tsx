import { useState, useEffect } from 'react';

import { Diary } from './types';
import diaryService from './services/diaryService';

function App() {
  const [diaries, setDiaries] = useState<Diary []>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState(''); 
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');  
  const [message, setMessage] = useState(''); 
  
  useEffect(() => { 
    diaryService.getDiaries()
      .then(data => setDiaries(data))
  }, []);

  const createNew = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.addDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }).then(data => {
      if(data) {
        setDiaries(diaries.concat(data))
        setMessage('Added successfully!')
        setDate(''); 
        setVisibility(''); 
        setWeather(''); 
        setComment('');
      }
    })
    .catch(error => setMessage('Error: ' + error.message))
}

  return (
    <div>
      {message.length < 20 && <p style={{color: 'green'}}>{message}</p>}
      {message.length > 20 && <p style={{color: 'red'}}>{message}</p>}
      <form onSubmit={createNew}>
                <div>
                    <label>Date</label>
                    <input 
                        type='date'
                        value={date} 
                        onChange={(event) => setDate(event.target.value)}
                    />
                </div>
                    <label>Visibility</label>
                      <input type='radio' id='_great' value='great' onChange={(event) => setVisibility(event.target.value)}/>
                      <label htmlFor="_great">great</label>
                      <input type='radio' id='_good' value='good' onChange={(event) => setVisibility(event.target.value)}/>
                      <label htmlFor="_good">good</label>
                      <input type='radio' id='_ok' value='ok' onChange={(event) => setVisibility(event.target.value)}/>
                      <label htmlFor="_ok">ok</label>
                      <input type='radio' id='_poor' value='poor' onChange={(event) => setVisibility(event.target.value)}/>
                      <label htmlFor="_poor">poor</label>
                <div>
                    <label>Weather</label> 
                    <input type='radio' id='_sunny' value='sunny' onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="_sunny">sunny</label>
                    <input type='radio' id='_rainy' value='rainy' onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="_rainy">rainy</label>
                    <input type='radio' id='_cloudy' value='cloudy' onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="_cloudy">cloudy</label>
                    <input type='radio' id='_windy' value='windy' onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="_windy">windy</label>
                    <input type='radio' id='_stromy' value='stromy' onChange={(event) => setWeather(event.target.value)}/>
                    <label htmlFor="_stromy">stromy</label>
                </div>
                <div>
                    <label>Comment</label> 
                    <input 
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </div>
                <button type='submit'>Add diary</button>
            </form>
      {diaries.map(diary => {
        return <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      })}
    </div>
  );
}

export default App;
