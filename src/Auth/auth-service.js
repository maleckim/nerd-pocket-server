const AuthService = {
  getUserWithUserName(db, user_name){
    return db('pocket_users')
      .where({user_name})
      .first()
  }

}

module.exports = AuthService