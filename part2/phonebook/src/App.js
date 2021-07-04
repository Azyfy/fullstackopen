import React, { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    persons.map( person => {
      return(
        <p key={person.name}> {person.name} {person.number} </p>
      )
    } )
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: "123-4567" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
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
        <Numbers persons={persons} />
      </div>
    </div>
  )
}

export default App
