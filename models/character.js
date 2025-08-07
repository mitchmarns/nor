module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nickname: DataTypes.STRING(100),
    age: DataTypes.INTEGER.UNSIGNED,
    birthday: DataTypes.DATE,
    zodiac: DataTypes.STRING(50),
    hometown: DataTypes.STRING(100),
    education: DataTypes.STRING(100),
    occupation: DataTypes.STRING(100),
    sexuality: DataTypes.STRING(50),
    pronouns: DataTypes.STRING(50),
    languages: DataTypes.STRING(100),
    religion: DataTypes.STRING(50),
    gender: DataTypes.STRING(50),
    url: DataTypes.STRING(255),
    role: {
      type: DataTypes.ENUM('Player', 'Staff', 'Civilian'),
      allowNull: false
    },
    position: DataTypes.STRING(50),
    jerseyNumber: DataTypes.INTEGER.UNSIGNED,
    teamId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'teams',
        key: 'id'
      }
    },
    job: DataTypes.STRING(100),
    bio: DataTypes.TEXT,
    faceclaim: DataTypes.STRING(255),
    avatarUrl: DataTypes.STRING(255),
    bannerUrl: DataTypes.STRING(255),
    sidebarUrl: DataTypes.STRING(255),
    spotifyEmbed: DataTypes.TEXT,
    quote: DataTypes.TEXT,
    personality: DataTypes.TEXT,
    strengths: DataTypes.TEXT,
    weaknesses: DataTypes.TEXT,
    likes: DataTypes.TEXT,
    dislikes: DataTypes.TEXT,
    fears: DataTypes.TEXT,
    goals: DataTypes.TEXT,
    appearance: DataTypes.TEXT,
    background: DataTypes.TEXT,
    skills: DataTypes.TEXT,
    favFood: DataTypes.STRING(100),
    favMusic: DataTypes.STRING(100),
    favMovies: DataTypes.STRING(100),
    favColor: DataTypes.STRING(50),
    favSports: DataTypes.STRING(100),
    inspiration: DataTypes.TEXT,
    fullBio: DataTypes.TEXT,
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    gallery: DataTypes.TEXT,
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'characters'
  });

  // Associations (optional, but recommended)
  Character.associate = models => {
  Character.belongsTo(models.Team, { foreignKey: 'teamId' });
  Character.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
  Character.hasMany(models.Connection, { as: 'connections', foreignKey: 'characterId' });
  Character.hasMany(models.Connection, { as: 'connectedTo', foreignKey: 'connectedCharacterId' });
};

  return Character;
};