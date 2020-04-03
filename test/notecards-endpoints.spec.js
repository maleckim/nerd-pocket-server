const knex = require('knex')
const app = require('../src/app')

describe('Notecards Endpoints', () => {

  let db

  
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => {
      return db.raw(
        `TRUNCATE
          user_notes,
          user_notecards,
          user_deadlines,
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

  describe('GET /api/notecards', () => {

    before('create notecard', () => {
      return db.raw(
        `INSERT INTO user_notecards (user_id, subject, question, answer)
        VALUES
        (1, 'Physics', 'TEST','TEST');`
      )
    })

    it('retrieves user specific notecards', () => {

      const replica = {id: 1, user_id: 1, subject: 'Physics', question:'TEST', answer: 'TEST'}

      return supertest(app)
        .get('/api/notecards?userId=1')
        .expect(200, [replica])
        
    })
  })



  describe('POST /api/notecards', () => {

    before('cleanup', () => {
      return db.raw(
        `TRUNCATE
          user_notecards
          RESTART IDENTITY CASCADE`
      )
  })

    it('returns created notecard', () => {

      const replica = {id: 1, user_id: 1, subject: 'Physics', question:'TEST', answer: 'TEST'}

      return supertest(app)
      .post('/api/notecards')
      .send(replica)
      .expect(200, [replica])
    })

  })

  describe('DELETE /api/notecards', () => {

    it('returns 204 on successful delete', () => {

      return supertest(app)
      .delete('/api/notecards')
      .send({id: 1})
      .expect(204)
    })
  })

  describe('PATCH /api/notecards/edit', () => {

    before('create notecard', () => {
      return db.raw(
        `INSERT INTO user_notecards (user_id, subject, question, answer)
        VALUES
        (1, 'Physics', 'TEST','TEST');`
      )
    })

    const edit = {id: 1, note_id: 1, subject: 'TEST', question: 'TEST', answer: 'TEST'}

    it('returns 204 on succesful edit', () => {

      return supertest(app)
        .post('/api/notecards/edit')
        .send(edit)
        .expect(200)
    })
  })


})