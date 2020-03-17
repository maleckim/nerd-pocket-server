const express = require('express')
const registrationService = require('./user-registration-service')


const userRegistration = express.Router()
const jsonBodyParser = express.json()

userRegistration
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {

    let { userName, userPass } = req.body


    registrationService.checkUserExists(req.app.get('db'), userName)
      .then(user => {
        if (user.length == 1) {
          return res.status(404).json({ error: 'User Exists' })
        } else {
          registrationService.registerUser(req.app.get('db'), userName, userPass)
            .then(added => {
              return res.status(200).json(added)
            })
        }
      })

  })

module.exports = userRegistration