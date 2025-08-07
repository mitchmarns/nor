module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mascot: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    logoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    primaryColor: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    secondaryColor: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    accentColor: {
      type: DataTypes.STRING(7),
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'teams'
  });

  return Team;
};