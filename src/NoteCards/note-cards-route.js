const express = require('express')
const NotecardService = require('./note-cards-service')
const authService = require('../Auth/auth-service')

const NotecardRouter = express.Router()
const jsonBodyParser = express.json()

NotecardRouter
  .route('/')
  .get( (req, res, next) => {
    
    let id = req.query.userId
    console.log(id)
    

    NotecardService.getAllNotecards(req.app.get('db'), id)
      .then( cards => {
        res.status(200).json(cards)
      })
      .catch(next)

  })
  .post( jsonBodyParser, (req, res, next) => {

    const {id, subject, question, answer} = req.body;
    
    if(!id || !subject || !question || !answer){
      res.status(404).json({error: 'all fields are required and must not be left blank'})
    }

    NotecardService.addNotecard(req.app.get('db'), id, subject, question, answer)
      .then( newnote => {
        res.status(200).json(newnote)
      })
      .catch(next)
  })
  .delete( jsonBodyParser, (req, res, next) => {
    const {id} = req.body;

    if(!id){
      res.status(404).json({error: 'notecard doesnt exist?'})
    }

    NotecardService.deleteNotecard(req.app.get('db'), id)
      .then( del => {
        res.status(204).end();
      })
  })


module.exports = NotecardRouter