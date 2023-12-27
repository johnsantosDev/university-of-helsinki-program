//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, notifyMessage, removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
   // const dispatch = useDispatch()

    const createNew = async (event) => {
      event.preventDefault()
      const anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''
      //dispatch(createNewAnecdote(anecdote))
      // dispatch(setNotification(`You created ${anecdote}`))
      // setTimeout(() => {
      //   dispatch(removeNotification())
      // }, 5000);
      //dispatch(notifyMessage(`You created ${anecdote}`, 10))
      props.createNewAnecdote(anecdote)
      props.notifyMessage(`You created ${anecdote}`, 10)
    }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={createNew}>
        <div><input name='anecdote'/></div>
        <button>create</button>
        </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNewAnecdote,
  notifyMessage
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)