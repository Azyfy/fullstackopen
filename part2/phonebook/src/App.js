import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Numbers = ({persons, filter}) => {
  return (
    persons.map( person => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return(
          <Number key={person.name} name={person.name} number={person.number} />
        )
      }
      else {
        return <></>
      }
    } )
  )
}

const Number = ({name, number}) => {
  return (
    <p> {name} {number} </p>
  )
}

const PersonForm = ({submit, handleNameChange, handleNumberChange }) => {
  
  return(
    <form onSubmit={submit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
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
    console.log('effect')
    axios.get("http://localhost:3001/persons")
        .then( response => {
          setPersons(response.data)
        })
    
  }, [])

  function addToPhonebook(e) {
    e.preventDefault();

   if(persons.some( person =>  person.name === newName )) {
      alert(`${newName} is already added to phonebook.`)
     return;
   }

    const personObj = {
      name: newName,
      number: newNumber,
    }

    axios.post("http://localhost:3001/persons", personObj)
      .then( response => {
        setPersons(persons.concat(response.data));
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
        <PersonForm submit={addToPhonebook} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} filter={filter} />
      </div>
    </div>
  )
}

export default App
