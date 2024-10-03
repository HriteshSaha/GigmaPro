'use strict';
module.exports = (sequelize, DataType) => {
  const user = sequelize.define("user", {
    firstName: {
      type: DataType.STRING,
      allowNull: false
    },
    lastName: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    password: {
      type: DataType.STRING,
      allowNull: false
    },
    role: {
      type: DataType.ENUM,
      values: ['Client', 'Freelancer'],
      allowNull: false
    },
    phone: {
      type: DataType.STRING,
    },
    description: {
      type: DataType.TEXT
    },
    workExperience: {
      type: DataType.FLOAT
    },
    organization: {
      type: DataType.STRING
    },
    isActive: {
      type: DataType.BOOLEAN
    }
  },
  {
    timestamps: true
  });

  // Associans:-

  user.associate = (models)=>{

    //association for skill
    user.belongsToMany(models.skill, {
      through: 'userHasSkills',
      foreignKey: 'userId',
      otherKey: 'skillId'
    });

    // association for project 
    user.hasMany(models.project, {
      foreignKey: 'clientUserId',
      as: 'clientProjects'
    });

    user.hasMany(models.project, {
      foreignKey: 'freelancerUserId',
      as: 'freelancerProjects'
    });

    //association for contract
    user.hasMany(models.contract, {
      foreignKey: 'clientUserId',
      as: 'contractsByClient'
    });

    user.hasMany(models.contract, {
      foreignKey: 'freelancerUserId',
      as: 'contractsToFreelancer'
    });

    //association for bid
    user.hasMany(models.bid, {
      foreignKey: 'userId',
      as: 'userBids'
    });
  }

  return user
}