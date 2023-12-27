import { useDispatch, useSelector } from "react-redux"

import { increaseAnecdoteVote, increaseVote } from "../reducers/anecdoteReducer"
import { notifyMessage, removeNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)

    const anecdotes = useSelector(state => state.anecdotes)

    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      if(filter === '') {
        return anecdote
      } else if(anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return anecdote
      }
    })
    
    const dispatch = useDispatch()

    const vote = (id, content, anecdote) => {
        dispatch(increaseAnecdoteVote(id, anecdote))
        // dispatch(setNotification(`You voted ${content}`))
        // setTimeout(() => {
        //   dispatch(removeNotification())
        // }, 5000);
        dispatch(notifyMessage(`You voted ${content}`, 10))
    }

  return (
    <div>
        {filteredAnecdotes
        .sort((a, b) => a.votes - b.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList