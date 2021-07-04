import React, { useState } from 'react'

const Numbers = ({persons, filter}) => {
  return (
    persons.map( person => {
      if (person.name.toLowerCase().includes(filter.toLowerCase())) {
        return(
          <p key={person.name}> {person.name} {person.number} </p>
        )
      }
    } )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState("")
  const [ filter, setFilter ] = useState("")

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

    setPersons(persons.concat(personObj));
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
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <div>debug: {filter}</div>
      Filter shown with  <input onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addToPhonebook}>
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
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} filter={filter} />
      </div>
    </div>
  )
}

export default App
