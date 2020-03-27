require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const loginValidation = require('./Auth/login-validation');
const userRegistration = require('./Registration/user-registration')
const notecards = require('./NoteCards/note-cards-route')
const notes = require('./Notes/notes-route')



const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

app.use('/api/validateuser', loginValidation)
app.use('/api/adduser', userRegistration)
app.use('/api/notecards', notecards)
app.use('/api/notes', notes)





module.exports = app