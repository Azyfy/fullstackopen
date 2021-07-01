import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  let all = good + neutral + bad;

  return(
    <>
      <h1> Statistics </h1>
      <p> Good {good} </p>
      <p> Neutral {neutral} </p>
      <p> Bad {bad} </p>
      <p> All {all} </p>
      <p> Average {(good - bad)/all} </p>
      <p> Positive {good/all *100}% </p>
    </>
  )
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
      <button onClick={setGoodFeedback}> good </button>
      <button onClick={setNeutralFeedback}> neutral </button>
      <button onClick={setBadFeedback}> bad </button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
