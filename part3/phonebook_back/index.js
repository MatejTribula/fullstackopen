let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


const express = require('express')
const app = express()
var morgan = require('morgan')

const cors = require('cors')

app.use(cors())

app.use(express.json())

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('data', function (req) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
    response.send('<h1>welcome to phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    person ? response.json(person) : response.status(404).end()
})

app.get('/info', (request, response) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const time = currentDate.toLocaleTimeString('en-US', { timeZone: 'CET' });

    response.send(`<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${dayOfWeek}, ${month} ${day}, ${year} ${time} CET</p>
    </div>`);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const idGenerator = (arr) => {
    const maxId = arr.length > 0
        ? Math.max(...arr.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}


app.post('/api/persons', (request, response) => {
    let error = ''

    if (!request.body.name) {
        error = "name missing"
    } else if (!request.body.number) {
        error = "number missing"
    } else if (persons.find(person => person.name === request.body.name)) {
        error = 'person already is in your phonebook'
    }

    if (error) {
        return response.status(400).json({
            error: { error }
        })
    }

    const person = {

        id: idGenerator(persons),
        name: request.body.name,
        number: request.body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})