/* eslint-disable no-unused-vars */
require('dotenv').config()

const Note = require('./models/note')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())


// const mongoose = require('mongoose')

// const password = process.env.DATABASE_PASS

// const url = `mongodb+srv://Rashdebas:rashdebas@cluster0.kerip.mongodb.net/Notes?retryWrites=true&w=majority`

// mongoose.connect(url)

/* const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
}) */

// const Note = mongoose.model('Note', noteSchema)



let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-05-30T17:30:31.098Z',
    importance: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-05-30T18:39:34.091Z',
    importance: false
  },
  {
    id: 3,
    content: 'Get and Post are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    importance: true
  }
]


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(notes => {
      if (notes) {
        response.json(notes)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/* app.get('/api/notes', (request, response) => {
    response.json(notes)
}) */



app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => {

    return note.id === id
  })
  if (note) {
    response.json(note)
  }else{
    response.status(204).end()
  }

})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})
/* const generatId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

    return maxId + 1
}
 */

app.put('/api/notes/:id', (request, response, next) => {

  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  ).then(updatedNote => {
    response.json(updatedNote)
  }).catch(error => next(error))

  /* const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, {new: true})
      .then(updatedNote => {
        response.json(updatedNote)
      .catch(error => next(error))
    }) */
})


app.post('/api/notes', (request, response, next) => {

  const body = request.body

  /* if (body.content === undefined) {
    return response.status(400).json({
    error: 'content missing'
    })
} */


  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`sever runnin on pot ${PORT}`)
})