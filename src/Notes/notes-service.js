const NotesService = {

  getAllNotes(db, id){
    return db('user_notes')
      .where({user_id:`${id}`})    
},

  addNote(db, user_id, subject, topic, content){
    return db('user_notes')
      .insert([
        {user_id: `${user_id}`,
        subject: `${subject}`,
        topic: `${topic}`,
        content: `${content}`}
      ])
},
  editNote(db, id, data){
    const { note_id, subject, topic, content } = data;
  
    return db('user_notes')
      .where('user_id',`${id}`)
      .andWhere('id', `${note_id}`)
      .update({
        subject: `${subject}`,
        topic: `${topic}`,
        content: `${content}`
    })
      
},

  deleteNote(db, data){
    const{user_id, note_id} = data;
    return db('user_notes')
      .where('user_id',`${user_id}`)
      .andWhere('id', `${note_id}`)
      .del()
  }
  


}

module.exports = NotesService


