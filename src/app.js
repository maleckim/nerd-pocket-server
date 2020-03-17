require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config')
const loginValidation = require('./Auth/login-validation');
const userRegistration = require('./Registration/user-registration')
const notecards = require('./NoteCards/note-cards-route')






const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/validateuser', loginValidation)
app.use('/api/adduser', userRegistration)
app.use('/api/notecards', notecards)





module.exports = app