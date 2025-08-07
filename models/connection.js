module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define('Connection', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    characterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    connectedCharacterId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    details: DataTypes.TEXT
  }, {
    timestamps: true,
    tableName: 'connections'
  });

  Connection.associate = models => {
    Connection.belongsTo(models.Character, { as: 'character', foreignKey: 'characterId' });
    Connection.belongsTo(models.Character, { as: 'connectedCharacter', foreignKey: 'connectedCharacterId' });
  };

  return Connection;
};