const express = require('express')
const deadlinesService = require('./deadlines-service')

const DeadlinesRouter = express.Router()
const jsonBodyParser = express.json()


DeadlinesRouter
  .route('/')

  .get( (req, res, next) => {
    
    let id = req.query.userId
    console.log(id)
    

    deadlinesService.getAllDeadlines(req.app.get('db'), id)
      .then( deadlines => {
        res.status(200).json(deadlines)
      })
      .catch(next)

  })

  .post(jsonBodyParser, (req, res, next) => {

    const {user_id, deadline, task} = req.body;

    deadlinesService.addDeadline(req.app.get('db'), user_id, deadline, task)
      .then( added => {
        res.status(200).end();
      })
      .catch(next)
    
  })

  .delete(jsonBodyParser, (req, res, next) => {
    const {id} = req.body;

    deadlinesService.deleteDeadline(req.app.get('db'), id)
      .then( del => {
        res.status(200).end();
      })
      .catch(next)
  })


  module.exports = DeadlinesRouter;
