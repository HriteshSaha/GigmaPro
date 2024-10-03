'use strict';
module.exports = (sequelize, DataType) => {
  const project = sequelize.define("project", {
    title: {
      type: DataType.STRING,
      allowNull: false
    },
    description: {
      type: DataType.TEXT,
      allowNull: true
    },
    budget: {
      type: DataType.FLOAT,
      allowNull: true
    },
    freelancerUserId: {
      type: DataType.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    clientUserId: {
      type: DataType.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataType.ENUM,
      values: ['open', 'closed'],
      allowNull: false,
      defaultValue: 'open'
    }
  }, {
    timestamps: true
  });

  // Associations

  project.associate = (models) => {

    // Association with user
    project.belongsTo(models.user, {
      foreignKey: 'clientUserId',
      as: 'client'
    });

    project.belongsTo(models.user, {
      foreignKey: 'freelancerUserId',
      as: 'freelancer'
    });

    // Association with contract
    project.hasOne(models.contract, {
      foreignKey: 'projectId',
      as: 'contract'
    });

    // Associating with bid
    project.hasMany(models.bid, {
      foreignKey: 'projectId',
      as: 'projectBids'
    });

    // Associating with skill
    project.belongsToMany(models.skill, {
      through: 'projectRequireSkills',
      foreignKey: 'projectId',
      otherKey: 'skillId'
    });
  }

  return project;
};
