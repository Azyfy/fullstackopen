const e = require("express")
const { response } = require("express")
const express = require("express")
const app = express()

const morgan = require("morgan")
const cors = require("cors")

app.use(cors())

morgan.token("person", (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :person'))

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get("/", (request, response) => {
    response.send("<h1> Phonebook backend </h1> ")
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people 
     <p> ${new Date()} </p> `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find( person => person.id === id )

    if(person) {
        response.json(person) 
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter( person => person.id != id )

    response.status(200).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    const id = Math.floor(Math.random() * 1000000)
    
    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'Name or number missing' 
        })
      }
    else if ( persons.find( person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'Name must be unique' 
          })
    }

    const person = {
        id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})