/* eslint-disable semi */
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import Person from './models/person.js'

const app = express()

dotenv.config()

const getRequestTime = () => {
  const date = new Date().toString()
  return date
}


// const generateRandomID = (max, min) => {
//   return Math.floor(Math.random() * (max - min) + min)
// }

// const maxId = persons.length > 0
//   ? Math.max(...persons.map(p => p.id))
//   : 1

//global middlewares
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// app.use(morgan('tiny'))

//use of custom token post-request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-request'))

morgan.token('post-request', (req) => {
  return JSON.stringify(req.body)
})


//routes
app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => response.json(result))
})

app.get('/info', (request, response, next) => {
  // response.send(`<p>Phone book has info for ${getTotalPersons()} people <br /> ${getRequestTime()} </p>`)
  Person.countDocuments({}, function (err, count) {
    if(err) {
      next(err)
    }
    response.send(`<p>Phone book has info for ${count} people <br /> ${getRequestTime()} </p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(p => p.id === id)

  // person
  // ? response.json(person)
  // : (response.statusMessage = `Person with id ${id} not found`, response.status(400).end())

  Person
    .findById(request.params.id)
    .then(result => response.json(result))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('id', request.params.id)
  Person
    .findByIdAndRemove(request.params.id)
    .then(response.status(200).end())
    .catch(error => next(error))

  // const id = Number(request.params.id)
  // const person = persons.find(p => p.id === id)

  // !person
  // ? (response.statusMessage = `Person not found with id ${id}`, response.status(404).end())
  // : persons = persons.filter(person => person.id !== id)
  //     response.status(202).end()
})

app.post('/api/persons', (request, response, next) => {
  console.log(request.body)

  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })

  Person.find({ name: newPerson.name }, (err, count) => {
    if(count.length) {
      response.status(400).json({ error: `${newPerson.name} already exists in phonebook!` })
    } else {
      newPerson
        .save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
    }
  })



  //   if(!person.name) {
  //     return response.status(400).json({error: 'name is missing'})
  //     } else if(!person.number) {
  //     return response.status(400).json({error: 'number is missing'})
  //     } else {
  //     if(persons.find(p => p.name === person.name)) {
  //         return response.status(400).json({error: 'name must be unique'})
  //     } else {
  //         const newPerson = new Person({
  //             name: person.name,
  //             number: person.number
  //         })
  //         newPerson.save().then(savedPerson => response.json(savedPerson))
  //     }
  // }
})

app.put('/api/persons/:id', (request, response, next) => {
  const updatedPerson = {
    number: request.body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(updated => response.json(updated))
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('Error:', error.name)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || '3001'
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})

