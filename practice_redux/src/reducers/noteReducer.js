import { createSlice } from '@reduxjs/toolkit'

import noteService from '../services/notes'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   // const content = action.payload
    //   // state.push({
    //   //   content,
    //   //   important: false,
    //   //   id: generateId(),
    //   // })
    //   state.push(action.payload)
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    }, 
    appendNote(state, action) {
      state.push(action.payload)
    }, 
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const note = await noteService.create(content)
    dispatch(appendNote(note))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer