import anecdoteService from '../services/anectodes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INCREASE-VOTE':
    const id = action.data.id
    const voteToIncrease = state.find(a => a.id === id)
   
    const changedAnecdote = {
      ...voteToIncrease,
      votes: voteToIncrease.votes + 1
    }
    return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    case 'CREATE-NEW': 
    return [...state, action.data]
    case 'SET-ANECDOTES':
    return action.data
    default: 
    return state
  }
}

//action creators 

export const increaseVote = (id) => {
  return {
    type: 'INCREASE-VOTE', 
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE-NEW',
    data: anecdote
  }
}

export const setAnecdotes = (anecdote) => {
  return {
    type: 'SET-ANECDOTES',
    data: anecdote
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const increaseAnecdoteVote = (id, anecdote) => {
  return async dispatch => {
    dispatch(increaseVote(id))
    await anecdoteService.update(id, anecdote)    
  }
}

export default reducer