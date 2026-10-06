const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Unknown'
  },
  company: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  source: {
    type: DataTypes.STRING,
    defaultValue: 'Website'
  },
  salesperson: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'New'
  },
  value: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Lead;
