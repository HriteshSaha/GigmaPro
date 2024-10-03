'use strict';
module.exports = (sequelize, DataType) => {
  const contract = sequelize.define("contract", {
    startDate: {
      type: DataType.DATE,
      allowNull: false
    },
    endDate: {
      type: DataType.DATE,
      allowNull: true
    },
    budget: {
      type: DataType.FLOAT,
      allowNull: true
    },
    projectId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    freelancerUserId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    clientUserId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    paymentStatus: {
      type: DataType.ENUM,
      values: ['payment pending', 'paid'],
      allowNull: false,
      defaultValue: 'payment pending'
    },
    status: {
      type: DataType.ENUM,
      values: ['active', 'expired'],
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    timestamps: true
  });

  // Associations
  contract.associate = (models) =>{
    
    //associating with user
    contract.belongsTo(models.user, {
      foreignKey: 'clientUserId',
      as: 'client'
    });

    contract.belongsTo(models.user, {
      foreignKey: 'freelancerUserId',
      as: 'freelancer'
    });

    // Associating with project
    contract.belongsTo(models.project, {
      foreignKey: 'projectId',
      as: 'project'
    });
  }
  return contract;
};
