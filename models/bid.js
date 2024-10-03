'use strict';
module.exports = (sequelize, DataType) => {
  const bid = sequelize.define("bid", {
    bidAmmount: {
      type: DataType.FLOAT,
      allowNull: false
    },
    proposalDetails: {
      type: DataType.TEXT,
      allowNull: true
    },
    submittedAt: {
      type: DataType.DATE,
      allowNull: false
    },
    estimatedDateOfDelivery: {
      type: DataType.DATE,
      allowNull: true
    },
    userId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    projectId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    }
  }, {
    timestamps: true
  });

  // Associations

  // Associating with user
  bid.associate = (models)=> {
    bid.belongsTo(models.user, {
    foreignKey: 'userId',
    as: 'freelancer'
  });

  // Associating with project
  bid.belongsTo(models.project, {
    foreignKey: 'projectId',
    as: 'project'
  });
  }
  

  return bid;
};
