import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  let all = good + neutral + bad;

  if( all === 0 ) {
    return <p> No feedback given </p>
  }

  return(
    <>
      <h1> Statistics </h1>
      <Statistic text={"Good"} value={good} />
      <Statistic text={"Neutral"} value={neutral} />
      <Statistic text={"Bad"} value={bad} />
      <Statistic text={"All"} value={all} />
      <Statistic text={"Average"} value={(good - bad) / all } />
      <Statistic text={`Positive ${good/all * 100 } %`} />
    </>
  )
}

const Statistic = ({text, value}) => {
  return <p> {text} {value} </p>
}

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}> {text} </button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function setGoodFeedback() {
    setGood(good + 1)
  }

  function setNeutralFeedback() {
    setNeutral(neutral + 1)
  }

  function setBadFeedback() {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button handleClick={setGoodFeedback} text={"good"} />
      <Button handleClick={setNeutralFeedback} text={"neutral"} />
      <Button handleClick={setBadFeedback} text={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
