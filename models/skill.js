'use strict';
module.exports = (sequelize, DataType) => {
  const skill = sequelize.define("skill", {
    name: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
    timestamps: true  // If you want to keep track of createdAt and updatedAt
  });

  // Associations

  // Associating with user
  skill.associate = (models)=>{
    skill.belongsToMany(models.user, {
      through: 'userHasSkills',
      foreignKey: 'skillId',
      otherKey: 'userId'
    });

    // Associating with project
    skill.belongsToMany(models.project, {
      through: 'projectRequireSkills',
      foreignKey: 'skillId',
      otherKey: 'projectId'
    });
  }

  return skill;
};
