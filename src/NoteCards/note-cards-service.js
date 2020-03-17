const NotecardService = {

  getAllNotecards(db, id){
    return db('user_notecards')
      .where({user_id:`${id}`})
      
      
  },

  addNotecard(db, id, subject, question, answer ){
    return db('user_notecards')
      .insert({user_id:`${id}`,subject,question,answer})
      .returning('*')
  },

  deleteNotecard(db, id){
    return db('user_notecards')
      .where({id})
      .del()
      
  }


}

module.exports = NotecardService




// getAllNotecards(db, id){
//   return db()
//     .select('n.user_name AS UserName', 'c.subject AS Subject', 'c.question AS Question', 'c.answer AS Answer','c.id AS NoteId')
//     .from('pocket_users AS n', {'n.id': `${id}`})
//     .join('user_notecards AS c', {'c.user_id': `${id}`})
// },