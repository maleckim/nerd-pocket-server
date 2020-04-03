const DeadlineService = {

  getAllDeadlines(db, id){
    return db('user_deadlines')
      .where({user_id:`${id}`})  
  },

  addDeadline(db, user_id, deadline, task ){
    return db('user_deadlines')
      .insert([
      {
        user_id: `${user_id}`,
        deadline: `${deadline}`,
        task: `${task}`
      }
    ])
  },

  deleteDeadline(db, id){
    return db('user_deadlines')
      .where({id})
      .del()
  }


}


module.exports = DeadlineService