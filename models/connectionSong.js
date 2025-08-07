module.exports = (sequelize, DataTypes) => {
  const ConnectionSong = sequelize.define('ConnectionSong', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    connectionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title: DataTypes.STRING,
    spotifyUrl: { type: DataTypes.STRING, allowNull: false }
  }, {
    timestamps: true,
    tableName: 'connection_songs'
  });

  ConnectionSong.associate = models => {
    ConnectionSong.belongsTo(models.Connection, { foreignKey: 'connectionId' });
  };

  return ConnectionSong;
};