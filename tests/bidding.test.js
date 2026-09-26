const request = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const { db, truncateAll } = require('./helpers/db')

const PASSWORD = 'Password123'
let client, freelancer, openProject

async function loginAgent(email) {
  const agent = request.agent(app)
  await agent.post('/login').type('form').send({ email, password: PASSWORD })
  return agent
}

beforeEach(async () => {
  await truncateAll()

  client = await db.user.create({
    firstName: 'C', lastName: 'Client', email: 'client@example.com',
    password: await bcrypt.hash(PASSWORD, 10), role: 'Client', organization: 'Co', isActive: true
  })
  freelancer = await db.user.create({
    firstName: 'F', lastName: 'Freelancer', email: 'freelancer@example.com',
    password: await bcrypt.hash(PASSWORD, 10), role: 'Freelancer', isActive: true
  })
  openProject = await db.project.create({
    title: 'Test Project', description: 'A test project', budget: 1000,
    category: 'Web Development', clientUserId: client.id, status: 'open'
  })
})

afterAll(async () => {
  await db.sequelize.close()
})

function futureDate(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

describe('bid submission', () => {
  it('creates a bid and redirects to the freelancer dashboard', async () => {
    const agent = await loginAgent('freelancer@example.com')

    const res = await agent.post('/freelancer/bid-submission').type('form').send({
      projectId: openProject.id,
      quotationAmount: 900,
      deliveryDate: futureDate(7),
      pitch: 'I can do this'
    })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/freelancer/dashboard')

    const bids = await db.bid.findAll({ where: { projectId: openProject.id, userId: freelancer.id } })
    expect(bids.length).toBe(1)
    expect(Number(bids[0].bidAmmount)).toBe(900)
  })

  it('updates the existing bid instead of creating a duplicate on a second submission', async () => {
    const agent = await loginAgent('freelancer@example.com')
    const deliveryDate = futureDate(7)

    await agent.post('/freelancer/bid-submission').type('form').send({
      projectId: openProject.id, quotationAmount: 900, deliveryDate, pitch: 'first pitch'
    })
    await agent.post('/freelancer/bid-submission').type('form').send({
      projectId: openProject.id, quotationAmount: 950, deliveryDate, pitch: 'updated pitch'
    })

    const bids = await db.bid.findAll({ where: { projectId: openProject.id, userId: freelancer.id } })
    expect(bids.length).toBe(1)
    expect(Number(bids[0].bidAmmount)).toBe(950)
    expect(bids[0].proposalDetails).toBe('updated pitch')
  })

  it('rejects a non-positive quotation amount', async () => {
    const agent = await loginAgent('freelancer@example.com')

    const res = await agent.post('/freelancer/bid-submission').type('form').send({
      projectId: openProject.id, quotationAmount: -5, deliveryDate: futureDate(1), pitch: 'bad'
    })

    expect(res.status).toBe(400)
    const bids = await db.bid.findAll({ where: { projectId: openProject.id } })
    expect(bids.length).toBe(0)
  })

  it('rejects a bid on a project that is already closed', async () => {
    await openProject.update({ status: 'closed' })
    const agent = await loginAgent('freelancer@example.com')

    const res = await agent.post('/freelancer/bid-submission').type('form').send({
      projectId: openProject.id, quotationAmount: 900, deliveryDate: futureDate(7), pitch: 'too late'
    })

    expect(res.status).toBe(403)
  })
})

describe('assigning work', () => {
  it('creates a contract and closes the project when a client assigns a bid', async () => {
    const bid = await db.bid.create({
      bidAmmount: 900,
      proposalDetails: 'pitch',
      submittedAt: new Date(),
      estimatedDateOfDelivery: futureDate(7),
      userId: freelancer.id,
      projectId: openProject.id
    })

    const agent = await loginAgent('client@example.com')
    const res = await agent.post('/client/assign-work').type('form').send({
      projectId: openProject.id,
      freelancerId: freelancer.id
    })

    expect(res.status).toBe(302)
    expect(res.headers.location).toBe('/client/dashboard')

    const updatedProject = await db.project.findByPk(openProject.id)
    expect(updatedProject.status).toBe('closed')

    const contracts = await db.contract.findAll({ where: { projectId: openProject.id } })
    expect(contracts.length).toBe(1)
    expect(contracts[0].freelancerUserId).toBe(freelancer.id)
    expect(Number(contracts[0].budget)).toBe(900)
  })
})
