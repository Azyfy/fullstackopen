import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNew = async (content) => {
    const newAnecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
} 
const exportedObj = {
    getAll,
    addNew
}

export default exportedObj