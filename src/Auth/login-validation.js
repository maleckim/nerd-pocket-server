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
          res.statusMessage=`No user registered under '${userName}' `
          return res.status(404).end()
        }
        const {id, password} = pocketUser

        if( userPassword != password ){
          res.statusMessage=`Invalid password`
          return res.status(401).end()
        }

        res.status(200).json({ success: id})
        
      })
      .catch(next)
  })

  module.exports = loginValidation
