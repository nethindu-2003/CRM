const sequelize = require('../config/database');
const User = require('./User');
const Lead = require('./Lead');
const Note = require('./Note');

// Associations
Lead.hasMany(Note, {
  foreignKey: 'leadId',
  as: 'notes',
  onDelete: 'CASCADE'
});
Note.belongsTo(Lead, {
  foreignKey: 'leadId',
  as: 'lead'
});

module.exports = {
  sequelize,
  User,
  Lead,
  Note
};
