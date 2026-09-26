const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const { db, truncateAll } = require('./helpers/db')

beforeEach(async () => {
  await truncateAll()
})

afterAll(async () => {
  await db.sequelize.close()
})

describe('registration', () => {
  it('creates a client with role "Client" and redirects to /login', async () => {
    const res = await request(app)
      .post('/signup-client')
      .type('form')
      .send({
        firstName: 'Test',
        lastName: 'Client',
        organization: 'Test Co',
        email: 'client@example.com',
        password: 'Password123'
      })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/login')

    const created = await db.user.findOne({ where: { email: 'client@example.com' } })
    expect(created).not.toBeNull()
    // Regression check: registration used to insert role: 'client' (lowercase), which
    // the DB enum (['Client', 'Freelancer']) rejects — this is what that bug looked like.
    expect(created.role).toBe('Client')
  })

  it('creates a freelancer with role "Freelancer" and redirects to /login', async () => {
    const res = await request(app)
      .post('/signup-freelancer')
      .type('form')
      .send({
        firstName: 'Test',
        lastName: 'Freelancer',
        email: 'freelancer@example.com',
        password: 'Password123'
      })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/login')

    const created = await db.user.findOne({ where: { email: 'freelancer@example.com' } })
    expect(created.role).toBe('Freelancer')
  })

  it('rejects a password shorter than 8 characters', async () => {
    const res = await request(app)
      .post('/signup-client')
      .type('form')
      .send({
        firstName: 'Test',
        lastName: 'Client',
        organization: 'Test Co',
        email: 'short@example.com',
        password: 'short'
      })

    expect(res.status).toBe(400)
    const created = await db.user.findOne({ where: { email: 'short@example.com' } })
    expect(created).toBeNull()
  })

  it('rejects a duplicate email', async () => {
    await db.user.create({
      firstName: 'Existing', lastName: 'User', email: 'dup@example.com',
      password: await bcrypt.hash('Password123', 10), role: 'Client', organization: 'Co', isActive: true
    })

    const res = await request(app)
      .post('/signup-client')
      .type('form')
      .send({
        firstName: 'Test', lastName: 'Client', organization: 'Test Co',
        email: 'dup@example.com', password: 'Password123'
      })

    expect(res.status).toBe(400)
    const count = await db.user.count({ where: { email: 'dup@example.com' } })
    expect(count).toBe(1)
  })
})

describe('login', () => {
  const password = 'Password123'

  beforeEach(async () => {
    await db.user.create({
      firstName: 'Login',
      lastName: 'Test',
      email: 'login@example.com',
      password: await bcrypt.hash(password, 10),
      role: 'Client',
      organization: 'Test Co',
      isActive: true
    })
  })

  it('logs in with correct credentials and redirects to the client dashboard', async () => {
    const res = await request(app)
      .post('/login')
      .type('form')
      .send({ email: 'login@example.com', password })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/client/dashboard')
  })

  it('rejects an incorrect password', async () => {
    const res = await request(app)
      .post('/login')
      .type('form')
      .send({ email: 'login@example.com', password: 'wrongpassword' })

    expect(res.status).toBe(400)
    expect(res.text).toMatch(/Wrong email or password/)
  })

  it('rejects a login attempt for an email that does not exist', async () => {
    const res = await request(app)
      .post('/login')
      .type('form')
      .send({ email: 'nobody@example.com', password })

    expect(res.status).toBe(400)
    expect(res.text).toMatch(/Wrong email or password/)
  })
})
