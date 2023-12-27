import { useState } from 'react'

const Button = ({click, text}) => {
  return (<button onClick={click}>{text}</button>)
}

const Statisticline = ({value, text}) => {
  return (
    <table>
      <tbody>
      <tr>
        <td style={{width: 100}}>{text}</td>
        <td>{value}</td>
      </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({good, neutral, bad, allFeedbacks, avgPoints, positiveFeedbacks, feedbackCount}) => {
  if(feedbackCount.length === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <>
      <Statisticline value={good} text={'good'}/>
      <Statisticline value={neutral} text={'neutral'}/>
      <Statisticline value={bad} text={'bad'}/>
      <Statisticline value={allFeedbacks} text={'all'}/>
      <Statisticline value={avgPoints} text={'average'}/>
      <Statisticline value={positiveFeedbacks} text={'positive'}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackCount, setFeedbackCount] = useState([]); 

  const clickGood = () => {
    setGood(good + 1)
    setFeedbackCount(feedbackCount.concat(1))
  }

  const clickNeutral = () => {
    setNeutral(neutral + 1)
    setFeedbackCount(feedbackCount.concat(0))
  }

  const clickBad = () => {
    setBad(bad + 1)
    setFeedbackCount(feedbackCount.concat(-1))
  }

  const allFeedbacks = good + neutral + bad;

  let totalScore = 0; 
  feedbackCount.forEach(value => totalScore += value)
  const avgPoints = totalScore/feedbackCount.length;

  const positiveFeedbacks = (good/allFeedbacks) * 100

  return (
    <>
    <h1>give feedback</h1>
    <Button click={clickGood} text={'good'}/>
    <Button click={clickNeutral} text={'neutral'}/>
    <Button click={clickBad} text={'bad'}/>
    <h1>statistics</h1>
    <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      allFeedbacks={allFeedbacks}
      avgPoints={avgPoints}
      positiveFeedbacks={positiveFeedbacks}
      feedbackCount={feedbackCount}
    />
    </>
  )
}

export default App