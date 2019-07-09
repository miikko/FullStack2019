import React from 'react'

const Course = ({course}) => {
    return (
        <>
        <Header text={course.name} />
        <Content parts={course.parts} />
        </>     
    )
}

const Header = ({text}) => (
    <h1>{text}</h1>
)

const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
) 

const Content = ({parts}) => {     
    return (
        <>
            {parts.map(part => <Part part={part} key={part.id}/>)}
            <Total parts={parts} />    
        </>
    )
}

const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
        <>
            <p>yhteensä {total} tehtävää</p>
        </>
    )
}

export default Course