import React from 'react'
import ReactDOM from 'react-dom/client'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import store from './store'

import App from './App'
// import noteReducer, { appendNote, setNotes } from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'
// import noteService from './services/notes'

// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer
//   }
// })

// noteService.getAll().then(notes => {
//   notes.foreach(note => store.dispatch(appendNote(note)))
// })

// noteService.getAll().then(notes => {
//   store.dispatch(setNotes(notes))
// })


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)