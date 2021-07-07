import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Numbers = ({persons, filter, setPersons}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    filteredPersons.map( person => {
        return(
          <div key={person.name}>
            <Number  name={person.name} number={person.number} />
            <Delete name={person.name} id={person.id} persons={persons} setPersons={setPersons} />
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

const Delete = ({name, id, persons, setPersons}) => {

  function removePerson() {
    if (window.confirm(`Do you want to delete ${name} from the phonebook?`)) {
    personService.removePerson(id)
      .then(response => {
        if(response.status === 200) {
        const filtered = persons.filter( person => {
          return (person.id !== id)
        } )
        setPersons(filtered);
      }
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

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")

  useEffect(() => {
    personService.getPersons()
        .then( initialPersons => {
          setPersons(initialPersons)
        })
    
  }, [])

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
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedUpdate))
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
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
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
        <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} submit={addToPhonebook} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} filter={filter}  setPersons={setPersons} />
      </div>
    </div>
  )
}

export default App
