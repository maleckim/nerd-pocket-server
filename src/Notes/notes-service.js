const NotesService = {

  getAllNotes(db, id){
    return db('user_notes')
    .where({user_id:`${id}`})    
},
  


}

module.exports = NotesService