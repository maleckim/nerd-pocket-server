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
.delete( jsonBodyParser, (req, res, next) => {
  const data = req.body;

  NotesService.deleteNote(req.app.get('db'), data)
    .then( del => {
      res.status(204).end();
    })


})

NotesRouter
.route('/add')
.post( jsonBodyParser, (req, res, next) => {

  const {user_id, subject, topic, content} = req.body

  NotesService.addNote(req.app.get('db'), user_id, subject, topic, content)
    .then( added => {
      res.status(200).end()
    })
    .catch(next)

})

NotesRouter
  .route('/edit')
  .post( jsonBodyParser, (req, res, next) => {

    const data = req.body;
    const { id } = req.body;
    

    NotesService.editNote(req.app.get('db'), id, data)
      .then( edit => {
        res.status(200).end();
      })
  })

module.exports = NotesRouter