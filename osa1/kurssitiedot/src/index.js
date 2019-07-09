import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1>{props.course}</h1>
)

const Content = (props) => {

    const Part = (props) => (
        <p>{props.part.name} {props.part.exercises}</p>
    )    

    return (
        <div>
            <Part part = {props.parts[0]} />
            <Part part = {props.parts[1]} />
            <Part part = {props.parts[2]} />    
        </div>
    )
}

const Total = (props) => {
    let amount = 0
    props.parts.forEach(element => {
        amount += element.exercises
    })
    return (
        <>
            <p>yhteensä {amount} tehtävää</p>
        </>
    )
}

const App = () => {
    const course =  {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
