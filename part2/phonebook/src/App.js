import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Numbers = ({persons, filter, setPersons, notifications}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    filteredPersons.map( person => {
        return(
          <div key={person.name}>
            <Number  name={person.name} number={person.number} />
            <Delete name={person.name} id={person.id} persons={persons} setPersons={setPersons} notifications={notifications} />
          </div>
        )    
    } )
  )
}

const Number = ({name, number}) => {
  return (
    <p> {name} {number} </p>
  )
}

const Delete = ({name, id, persons, setPersons, notifications}) => {

  function removePerson() {
    if (window.confirm(`Do you want to delete ${name} from the phonebook?`)) {
    personService.removePerson(id)
      .then(response => {
        if(response.status === 200) {
        const filtered = persons.filter( person => {
          return (person.id !== id)
        } )
        notifications(`${name} was deleted from the phonebook.`, "blue")
        setPersons(filtered);
      }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <button onClick={removePerson} >Delete</button>
  )
}

const PersonForm = ({newName, newNumber, submit, handleNameChange, handleNumberChange }) => {
  
  return(
    <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({handleFilterChange}) => {
  return(
    <>
      Filter shown with  <input onChange={handleFilterChange} />
    </>
  )
}

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={style} >
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ messageColor, setMessageColor ] = useState("blue")

  useEffect(() => {
    personService.getPersons()
        .then( initialPersons => {
          setPersons(initialPersons)
        })
        .catch(error => {
          console.log(error)
        })
    
  }, [])

  const notificationStyle = {
  color: `${messageColor}`,
  background: `lightgrey`,
  fontSize: 20,
  borderStyle: `solid`,
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  }

  function addToPhonebook(e) {
    e.preventDefault();

    if(newName === ""){
      alert("Name is empty.")
      return;
    }

   if(persons.some( person =>  person.name === newName )) {
    if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)){
      const updatedPerson = persons.find( person =>  person.name === newName )
      updatedPerson.number = newNumber;

      personService.updatePerson(updatedPerson.id, updatedPerson)
        .then(returnedUpdate => {
          notify(`${updatedPerson.name}'s phone number has been updated.`, "green")
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedUpdate))
        })
        .catch(error => {
          console.log(error)
          notify(`Information of ${updatedPerson.name} has already been removed from the server.`, "red")
        })
      
      setNewName("");
      setNewNumber("");
      }
     return;
   }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    personService.addPerson(personObj)
      .then( returnedPerson => {
        notify(`${returnedPerson.name} was added to the phonebook.`, "green")
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        notify(error.response.data.error, "red")
      })
  }

  function notify(message, messageColor) {
    setMessageColor(messageColor);
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} style={notificationStyle} />
        <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} submit={addToPhonebook} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} filter={filter}  setPersons={setPersons} notifications={notify} />
      </div>
    </div>
  )
}

export default App
