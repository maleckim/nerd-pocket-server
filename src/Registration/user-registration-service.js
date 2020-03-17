const RegistrationService = {

  checkUserExists(db, user_name){
    return db('pocket_users')
      .where({user_name})
      
  },

  registerUser(db, user_name, password){
    return db('pocket_users')
      .insert([
        {user_name: `${user_name}`, 
        password: `${password}`}
      ])
      .returning('*')
  }

}

module.exports = RegistrationService