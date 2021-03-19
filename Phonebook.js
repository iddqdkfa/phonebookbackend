
const express = require('express');
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())





app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

  app.post('/api/new', (request, response) => {



 

    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id)) 
      : 0
  
      console.log(persons.find(p => p.name == request.body.name || p.number === request.body.number))

      if(persons.find(p => p.name == request.body.name || p.number === request.body.number)){
        return response.status(400).json({ 
            error: 'Person or number already in phonebook' 
          })
      }
      
    let person = request.body
    let perso2 = JSON.parse(JSON.stringify(request.body))
    morgan.token('type', function (req, res) { 

        return JSON.stringify(perso2) })


    person.id = maxId + 1
  
    persons = persons.concat(person)
  
    response.json(person)
  })



  
  app.delete('/api/delete/:id', (request, response) => {
    
    morgan.token('type', function (req, res) { 

      return JSON.stringify('test') })
    console.log("I am in delete")
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons', (request, response) => {
  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })
    console.log(response.body)
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)

    if(person){
        response.json(person)

    } else{
        response.status(404).end()
    }
  })


app.get('/info', (request, response) => {
  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })
    let count = persons.length;

    let date = new Date()

  response.send(`<p>Phonebook has infor for ${count} people</p> <p>${date}</p>`)
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

   
  