import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({content}) => (
    <h1>{content}</h1>
)

const Button = ({handleClick, text}) => (
    <button onClick = {handleClick}>{text}</button>
)

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <p>Ei yhtään palautetta annettu</p>
        )
    }
    const total = bad + neutral + good
    const average = (good - bad) / total
    const positive = good / total * 100 + " %"
    return (
        <table>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={total} />
                <Statistic text="keskiarvo" value={average} />
                <Statistic text="positiivisia" value={positive} />
            </tbody>
        </table>
    )
}

const Statistic = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>        
) 

const App = () => {
    const header1 = "anna palautetta"
    const header2 = "statistiikka"
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setToValue = (newValue, setter) => {
        setter(newValue)
    }

    return (
        <div>
            <Header content={header1} />
            <Button handleClick={() => setToValue(good + 1, setGood)} text="hyvä" />
            <Button handleClick={() => setToValue(neutral + 1, setNeutral)} text="neutraali" />
            <Button handleClick={() => setToValue(bad + 1, setBad)} text="huono" />
            <Header content={header2}/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)
