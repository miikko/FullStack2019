import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, text}) => (
    <button onClick={clickHandler}>{text}</button>
)

const Anecdote = ({text, voteCount}) => {
    return (
        <>
        <p>{text}</p>
        <p>has {voteCount} votes</p>
        </>
    )    
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const randomSelection = () => {
        let index = Math.floor(Math.random() * anecdotes.length)
        while (index === selected) {
            index = Math.floor(Math.random() * anecdotes.length)            
        }
        setSelected(index)
    }

    const addVote = () => {
        const copy = [...votes]
        copy[selected]++
        setVotes(copy)
    }

    const indexOfMostVoted = () => {
        let index = 0
        let mostVotes = votes[index]
        for (let i = 1; i < votes.length; i++) {
            if (votes[i] > mostVotes) {
                index = i
                mostVotes = votes[i]
            }
        }
        return index
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecdote text={anecdotes[selected]} voteCount={votes[selected]} />
            <Button clickHandler={() => addVote()} text="vote" />
            <Button clickHandler={() => randomSelection()} text="next anecdote" />
            <h1>Anecdote with the most votes</h1>
            <Anecdote text={anecdotes[indexOfMostVoted()]} voteCount={votes[indexOfMostVoted()]}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
