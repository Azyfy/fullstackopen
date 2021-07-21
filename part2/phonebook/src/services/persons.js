import axios from "axios"

const baseUrl = "http://localhost:3001/api/persons/";

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
   return axios.delete(baseUrl + id)
}

const updatePerson = (id, updatedPerson) => {
  return  axios.put(`http://localhost:3001/persons/${id}`, updatedPerson).then( response => {
    return response.data
  })
}

const personService = {getPersons, addPerson, removePerson, updatePerson}

export default personService