const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Import models
const User = require('./user')(sequelize, DataTypes);
const Team = require('./team')(sequelize, DataTypes); 
const Character = require('./character')(sequelize, DataTypes);
const Connection = require('./connection')(sequelize, DataTypes); 
const ConnectionSong = require('./connectionSong')(sequelize, DataTypes);

Object.values({ User, Team, Character, Connection }).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate({ User, Team, Character, Connection });
  }
});

Connection.hasMany(ConnectionSong, { as: 'songs', foreignKey: 'connectionId' });
ConnectionSong.belongsTo(Connection, { foreignKey: 'connectionId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Team,
  Character,
  Connection,
  ConnectionSong,
};