const express = require('express')
const NotecardService = require('./note-cards-service')
const bcrypt = require('bcryptjs')
const authService = require('../Auth/auth-service')

const NotecardRouter = express.Router()
const jsonBodyParser = express.json()

NotecardRouter
  .route('/')
  .get( (req, res, next) => {
    const authToken = req.get('Authorization')


    NotecardService.getAllNotecards(req.app.get('db'), userName)
      .then( cards => {
        res.status(200).json(cards)
      })

  })

module.exports = NotecardRouter