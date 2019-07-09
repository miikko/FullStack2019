import React, { useState, useEffect } from "react"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [personsToShow, setPersonsToShow] = useState("")
  const [notificationStyle, setNotificationStyle] = useState(null)
  const [message, setMessage] = useState(null)

  const successNotificationStyle = {
    color: "green",
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorNotificationStyle = {
    color: "red",
    fontSize: 20,
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(
              person => person.id !== personToUpdate.id
                ? person
                : returnedPerson
            ))
            setNotificationStyle(successNotificationStyle)
            setMessage(`${personObject.name}: numero päivitettiin`)
            setTimeout(() => {setMessage(null)}, 5000)
          })
          .catch(error => {
            setNotificationStyle(errorNotificationStyle)
            setMessage(`Henkilö ${personObject.name} on jo valitettavasti poistettu palvelimelta`)
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.filter(
              person => person.id !== personToUpdate.id)
            )
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setNotificationStyle(successNotificationStyle)
          setMessage(`Lisättiin ${personObject.name}`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
  }

  const removePerson = (id) => {
    personService.remove(id).then(() => {
      const personToRemove = persons.find(person => person.id === id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationStyle(successNotificationStyle)
      setMessage(`${personToRemove.name} poistettiin`)
      setTimeout(() => {setMessage(null)}, 5000)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPersonsToShow(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={message} notificationStyle={notificationStyle}/>
      <Filter
        personsToShow={personsToShow}
        handleFilterChange={handleFilterChange}
      />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numerot</h3>
      <Persons
        persons={persons.filter(
          person => person.name.toUpperCase().includes(
            personsToShow.toUpperCase()
          )
        )}
        removePerson={removePerson}
      />
    </div>
  )
}

const Filter = ({ personsToShow, handleFilterChange }) => (
  <form>
    <div>
      rajaa näytettäviä <input value={personsToShow} onChange={handleFilterChange} />
    </div>
  </form>
)

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      nimi: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      numero: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

const Persons = ({ persons, removePerson }) => (
  persons.map(person =>
    <p key={person.id}>
      {person.name} {person.number} <RemoveButton removePerson={removePerson} person={person} />
    </p>
  )
)

const RemoveButton = ({ removePerson, person }) => {
  const confirmWindow = () => {
    if (window.confirm("Poistetaanko ".concat(person.name))) {
      removePerson(person.id)
    }
  }
  return (
    <button onClick={confirmWindow}>poista</button>
  )
}

const Notification = ({message, notificationStyle}) => {
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default App
