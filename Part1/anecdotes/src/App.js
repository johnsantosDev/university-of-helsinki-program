import { useState } from 'react'

const Heading = ({text}) => {
  return (
    <>
    <h1>{text}</h1>
    <br />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [votes, setVotes] = useState({
    maxAnecdoteIndex: 0,
    maxVote: 0
  })

  const nextAnecdote = () => {
    // the random number should be between 0 and anecdotes.length - 1 in order to randomly get all anecdotes from array
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const makeVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  for(let i = 0; i < points.length; i++) {
    if(votes.maxVote < points[i]) {
      const newVotes = {
        ...votes,
        maxAnecdoteIndex: i,
        maxVote: points[i]
      }
      setVotes(newVotes)
    } 
  }

  return (
    <div>
      <Heading text={'Anecdote of the day'}/>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <br />
      <button onClick={makeVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <br />
      <Heading text={'Anecdote with most vote'}/>
      {anecdotes[votes.maxAnecdoteIndex]}
      <p>has {votes.maxVote} votes</p>
    </div>
  )
}

export default App