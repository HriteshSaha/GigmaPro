const db = require('../../models')

async function truncateAll() {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  const qi = db.sequelize.getQueryInterface()
  await qi.bulkDelete('projectRequireSkills', {})
  await qi.bulkDelete('userHasSkills', {})
  await db.bid.destroy({ where: {}, truncate: true })
  await db.contract.destroy({ where: {}, truncate: true })
  await db.project.destroy({ where: {}, truncate: true })
  await db.skill.destroy({ where: {}, truncate: true })
  await db.user.destroy({ where: {}, truncate: true })
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
}

module.exports = { db, truncateAll }
