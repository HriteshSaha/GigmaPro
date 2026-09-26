const request = require('supertest')
const app = require('../app')
const { db, truncateAll } = require('./helpers/db')

beforeEach(async () => {
  await truncateAll()
})

afterAll(async () => {
  await db.sequelize.close()
})

describe('public pages', () => {
  it('GET / returns 200 and mentions GigmaPro', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.text).toMatch(/GigmaPro/)
  })

  it('GET /this-route-does-not-exist returns the branded 404 page', async () => {
    const res = await request(app).get('/this-route-does-not-exist')
    expect(res.status).toBe(404)
    expect(res.text).toMatch(/Page not found/)
  })

  it('GET /projects redirects to /login when not authenticated', async () => {
    const res = await request(app).get('/projects')
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/login')
  })

  it('GET /client/dashboard redirects to /login when not authenticated', async () => {
    const res = await request(app).get('/client/dashboard')
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/login')
  })
})
