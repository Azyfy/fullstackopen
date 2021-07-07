import axios from "axios"

const baseUrl = "http://localhost:3001/persons";

const getPersons = () => {
    return axios.get(baseUrl).then( response => {
        return response.data
      })
}

const addPerson = (newPersonObj) => {
    return axios.post(baseUrl, newPersonObj).then( response => {
        return response.data
      })
}

const removePerson = (id) => {
   return axios.delete(`http://localhost:3001/persons/${id}`)
}

const personService = {getPersons, addPerson, removePerson}

export default personService