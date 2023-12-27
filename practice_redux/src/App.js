import { useDispatch} from 'react-redux'
import { useEffect } from 'react'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes, setNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   noteService
  //     .getAll().then(notes => dispatch(setNotes(notes)))
  // }, [dispatch])

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])
  
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}

export default App