const express = require('express')
const authService = require('./auth-service')
const bcrypt = require('bcryptjs')

const loginValidation = express.Router()
const jsonBodyParser = express.json()

loginValidation
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    
    const {userName, userPassword} = req.body

    if(!userName || !userPassword){
      return res.status(404).json({error: 'please enter a username and password'})
    }


    authService.getUserWithUserName(req.app.get('db'), userName)
      .then( pocketUser => {
        
        if(!pocketUser){
          return res.status(404).json({error: `No user registered under '${userName}' `})
        }
        const {id, password} = pocketUser

        if( userPassword != password ){
          return res.status(401).json({ error: 'Invalid password'})
        }

        res.status(200).json({ success: id})
        
      })
  })

  module.exports = loginValidation
