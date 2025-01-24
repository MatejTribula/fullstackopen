import { useState } from 'react'


const Heading = () => <h1>give feedback</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th border>{text}</th>
      <th>{value}</th>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad
  let avg = sum !== 0 ? (good - bad) / sum : 0
  let positivePer = (good / sum) * 100

  return (
    <>
      <h1>statistics</h1>



      {sum === 0 ? (
        <p>No feedback given</p>
      ) : (

        <table border={1}>

          {console.log(good, neutral, bad)}
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />

          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positivePer} />
        </table>
      )}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)




  return (
    <div>
      <Heading />
      <Button text="good" handleClick={() => setGood(good + 1)
      } />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App