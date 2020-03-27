const express = require('express')
const NotesService = require('./notes-service')
const authService = require('../Auth/auth-service')

const NotesRouter = express.Router()
const jsonBodyParser = express.json()


NotesRouter
.route('/')
.get( (req, res, next) => {
  
  let id = req.query.userId
  console.log(id)
  

  NotesService.getAllNotes(req.app.get('db'), id)
    .then( notes => {
      res.status(200).json(notes)
    })
    .catch(next)

})

module.exports = NotesRouter