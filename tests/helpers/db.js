const db = require('../../models')

async function truncateAll() {
  await db.sequelize.query(
    'TRUNCATE TABLE "projectRequireSkills", "userHasSkills", "bids", "contracts", "projects", "skills", "users" RESTART IDENTITY CASCADE'
  )
}

module.exports = { db, truncateAll }
