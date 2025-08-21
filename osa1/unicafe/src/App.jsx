import { useState } from 'react'

const Statistics = (props) => {
  const { allFeedback } = props

  if (allFeedback.length === 0) {
    return <p>No feedback given yet</p>
  }

  const good = allFeedback.filter(c => c === 'G').length
  const neutral = allFeedback.filter(c => c === 'N').length
  const bad = allFeedback.filter(c => c === 'B').length
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="Good:" value={good} />
          <StatisticsLine text="Neutral:" value={neutral} />
          <StatisticsLine text="Bad:" value={bad} />
          <StatisticsLine text="All:" value={total} />
          <StatisticsLine text="Average:" value={average} />
          <StatisticsLine text="Positive:" value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [score, setScore] = useState(0)
  const [allFeedback, setAllFeedback] = useState([])

  const handleGoodClick = () => {
    setAllFeedback(allFeedback.concat('G'))
    const updatedGood = good + 1
    setGood(updatedGood)
    setScore(score + 1)
  }

  const handleNeutralClick = () => {
    setAllFeedback(allFeedback.concat('N'))
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    setAllFeedback(allFeedback.concat('B'))
    const updatedBad = bad + 1
    setBad(updatedBad)
    setScore(score - 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <Statistics allFeedback={allFeedback} />
    </div>
  )
}

export default App
