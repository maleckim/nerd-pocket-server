const knex = require('knex')
const app = require('../src/app')

describe('Deadlines Endpoint', () => {

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

  before('create deadline', () => {
    return db.raw(
      `INSERT INTO user_deadlines (user_id, deadline, task)
       VALUES
       (1, 'TEST', 'TEST');`
    )
  })


  describe('/api/deadlines', () => {

    it('retrieves user deadlines', () => {

      const replica = {user_id: 1, id: 1, deadline: 'TEST', task: 'TEST'}

      return supertest(app)
      .get('/api/deadlines?userId=1')
      .expect(200, [replica])
    })

    it('creates a new user deadline and returns 200', () => {
      const newData = {user_id: 1, deadline: 'NEW', task: 'NEW'}

      return supertest(app)
        .post('/api/deadlines')
        .send(newData)
        .expect(200)
    })

    it('delete a deadline and returns 204', () => {
      return supertest(app)
        .delete('/api/deadlines')
        .send({id: 1})
        .expect(200)
    })
  })


})