const knex = require('knex')
const app = require('../src/app')

describe('Notes Endpoints', () => {

  let db

  
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => {
      return db.raw(
        `TRUNCATE
          user_notes,
          pocket_users
          RESTART IDENTITY CASCADE`
      )
  })

  before('create base user', () => {
    return db.raw(
      `INSERT INTO pocket_users (user_name, password)
       VALUES
       ('TEST', 'TEST');`
    )
  })

  before('create note', () => {
    return db.raw(
      `INSERT INTO user_notes (user_id, subject, topic, content)
      VALUES
      (1, 'TEST', 'TEST','TEST');`
    )
  })

  describe('/api/notes', () => {

    it('retrieves user specific notes', () => {

      const replica = {id: 1, user_id: 1, subject: 'TEST', topic: 'TEST', content: 'TEST'}

      return supertest(app)
        .get('/api/notes?userId=1')
        .expect(200, [replica]) 
    })

    it('edits a specific note and returns 200', () => {

      const editData = {id: 1, note_id: 1, subject: 'EDIT', topic: 'EDIT', content: 'EDIT'}

      return supertest(app)
        .post('/api/notes/edit')
        .send(editData)
        .expect(200)


    })

    it('deletes specific note and returns 204', () => {

      const deleteData = {user_id: '1', note_id: '1'}

      return supertest(app)
        .delete('/api/notes')
        .send(deleteData)
        .expect(204)
    })

    it('adds a new note and returns 200', () => {

      const newNote = {user_id: 1, subject: 'NEW', topic: 'NEW', content: 'NEW'}
      
      return supertest(app)
        .post('/api/notes/add')
        .send(newNote)
        .expect(200)
    })
  })
  
})