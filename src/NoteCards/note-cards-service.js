const NotecardService = {

  getAllNotecards(db, user_name){
    return db()
      .select('n.user_name AS UserName', 'c.subject AS Subject', 'c.question AS Question', 'c.answer AS Answer')
      .from('pocket_users AS n', {'n.user_name': `${user_name}`})
      .join('user_notecards AS c', {'c.user_id': 'n.id'})
  }


}

module.exports = NotecardService