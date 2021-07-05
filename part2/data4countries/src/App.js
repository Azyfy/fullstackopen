import axios from "axios";
import React, { useState, useEffect } from "react"

const Countries = ({countries, filter}) => {

  if(filter === "") {
    return <p>Input country name</p>
  }
  if(countries.length === 0) {
    return <p>No country found</p>
  }
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if(countries.length < 10 && countries.length !== 1) {
    return (
      countries.map(country => {
        return (
          <div key={country.numericCode}>
            {country.name} <Toggle country={country} /> 
          </div>

        )
      })
    )
  }

  return (
    <Country country={countries[0]} />
  )
}

const Country = ({country}) => {

  return(
    <>
      <h2> {country.name } </h2>
      <p> Capital: {country.capital } </p>
      <p> Population: {country.population } </p>

      <h5> Languages </h5>
      <ul>
      { country.languages.map( language => {
        return(
          <li key={language.nativeName}>
            {language.name}
          </li>
        )
      } ) }
      </ul>
      <img src={country.flag} alt="Flag" style={{width: "35%"}} />
    </>
  )
}

const Toggle = ({country}) => {
  
  const [ showInfo, setShowInfo ] = useState(false);

  function toggleShow() {
    setShowInfo(!showInfo)
  }

  return(
    <>
    <button onClick={toggleShow}> {showInfo ? "Hide" : "Show" } </button>
    <div>
    { showInfo ? (
      <Country country={country} />
    ) : (
      <></>
    ) }
    </div>
    </>
  )
}

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState("");
  const [ pickedCountries, setPickedCountries ] = useState([]);

  useEffect(() => {
  axios.get("https://restcountries.eu/rest/v2/all")
      .then( response => {
        setCountries(response.data);
        alert("Resources fetched")
      })
    }, [])

    useEffect(() => {
      setPickedCountries(countries.filter(filterCountries))
        }, [filter])

    function filterCountries(country) {

      return (country.name.toLowerCase().includes(filter.toLowerCase()));
    }

  function handleFilter (e) {
    setFilter(e.target.value)
  } 


  return (
    <div>
        <h2>Data for countries</h2>
      <div>
        Find countries <input onChange={handleFilter} />
      </div>
      <Countries countries={pickedCountries} filter={filter} />
    </div>
  );
}

export default App;
