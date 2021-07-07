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

const personService = {getPersons, addPerson}

export default personService