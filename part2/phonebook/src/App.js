import React, { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    persons.map( person => {
      return(
        <p key={person.name}> {person.name} </p>
      )
    } )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  function addToPhonebook(e) {
    e.preventDefault();

    const personObj = {
      name: newName,
    }

    setPersons(persons.concat(personObj));
  }

  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addToPhonebook}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Numbers persons={persons} />
      </div>
    </div>
  )
}

export default App
