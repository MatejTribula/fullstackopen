require('dotenv').config()

const express = require('express')
const app = express()
const Person = require('./models/person')

var morgan = require('morgan')


// const cors = require('cors')
// app.use(cors())

app.use(express.json())

app.use(express.static('dist'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('data', function (req) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
    response.send('<h1>welcome to phonebook</h1>')
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(newPerson => response.json(newPerson)).catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const currentDate = new Date();
            const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'long' });
            const month = currentDate.toLocaleString('en-US', { month: 'long' });
            const day = currentDate.getDate();
            const year = currentDate.getFullYear();
            const time = currentDate.toLocaleTimeString('en-US', { timeZone: 'CET' });

            response.send(`<div>
                <p>Phonebook has info for ${count} people</p>
                <p>${dayOfWeek}, ${month} ${day}, ${year} ${time} CET</p>
            </div>`);
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    console.error(error.stack)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})