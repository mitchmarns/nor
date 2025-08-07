const { Character, Team, User, Connection, Sequelize } = require('../models');

exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll({
      include: [
        { model: Team, attributes: ['name', 'id'] },
        { model: User, as: 'creator', attributes: ['username'] }
      ],
      order: [['name', 'ASC']]
    });
    res.render('characters/characters', { title: 'Character Directory', characters });
  } catch (err) {
    res.status(500).send('Error loading characters');
  }
};

exports.createCharacter = async (req, res) => {
  try {
    const { name, nickname, avatarUrl, teamId, role, position, jerseyNumber, shortBio, bio } = req.body;
    await Character.create({
      name,
      nickname,
      avatarUrl,
      teamId: teamId || null,
      role,
      position,
      jerseyNumber,
      shortBio,
      bio,
      createdBy: req.user ? req.user.id : null // <-- use createdBy
    });
    res.redirect('/characters');
  } catch (err) {
    console.error('Error creating character:', err);
    res.status(500).send('Error creating character');
  }
};

  exports.getCreateCharacter = async (req, res) => {
  try {
    const teams = await Team.findAll({ order: [['name', 'ASC']] });
    res.render('characters/create', { title: 'Create Character', teams });
  } catch (err) {
    res.status(500).send('Error loading teams');
  }
};

exports.getCharacterProfile = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.id, {
      include: [
        { model: Team, attributes: ['id', 'name'] },
        {
          model: Connection,
          as: 'connections',
          include: [{ model: Character, as: 'connectedCharacter', attributes: ['id', 'name', 'avatarUrl'] }]
        },
        { model: User, as: 'creator', attributes: ['username', 'id'] }
      ]
    });

    const allCharacters = await Character.findAll({
      where: { id: { [Sequelize.Op.ne]: req.params.id } },
      attributes: ['id', 'name']
    });

    if (!character) {
      return res.status(404).render('404', { title: 'Character Not Found' });
    }
    // Parse gallery JSON to array for EJS
    let gallery = [];
    if (character.gallery) {
      try {
        gallery = JSON.parse(character.gallery);
      } catch (e) {
        gallery = [];
      }
    }
    const isOwner = req.user && character.createdBy === req.user.id;
    res.render('characters/profile', {
      title: character.name,
      character: { ...character.toJSON(), gallery },
      team: character.Team,
      isOwner,
      allCharacters 
    });
  } catch (err) {
    console.error('Error loading character profile:', err);
    res.status(500).send('Error loading character profile');
  }
};

exports.getEditCharacter = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.id, {
      include: [
        { model: Team, attributes: ['id', 'name'] }
      ]
    });
    const teams = await Team.findAll({ order: [['name', 'ASC']] });
    if (!character) {
      return res.status(404).render('404', { title: 'Character Not Found' });
    }
    res.render('characters/edit', { title: `Edit ${character.name}`, character, teams });
  } catch (err) {
    console.error('Error loading character for edit:', err);
    res.status(500).send('Error loading character for edit');
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const { gallery, ...fields } = req.body;

    // Convert empty strings to null for all fields
    Object.keys(fields).forEach(key => {
      if (fields[key] === '') fields[key] = null;
    });

    // Parse gallery URLs if needed
    if (gallery) {
      fields.gallery = gallery.split(',').map(url => ({ url: url.trim() }));
    }

    // Fix birthday: if invalid, set to null
    if (fields.birthday && isNaN(Date.parse(fields.birthday))) {
      fields.birthday = null;
    }

    await Character.update(fields, { where: { id: req.params.id } });
    res.redirect(`/characters/${req.params.id}`);
  } catch (err) {
    console.error('Error updating character:', err);
    res.status(500).send('Error updating character');
  }
};

exports.addGalleryImage = async (req, res) => {
  try {
    const character = await Character.findByPk(req.params.id);
    if (!character) return res.status(404).send('Character not found');
    const { imgUrl, imgCaption } = req.body;
    if (!imgUrl) return res.status(400).send('Image URL required');
    // Parse gallery if it exists, otherwise start with empty array
    let gallery = [];
    if (character.gallery) {
      try {
        gallery = JSON.parse(character.gallery);
      } catch (e) {
        gallery = [];
      }
    }
    gallery.push({ url: imgUrl, caption: imgCaption });
    character.gallery = JSON.stringify(gallery);
    await character.save();
    res.redirect(`/characters/${character.id}#instagram`);
  } catch (err) {
    console.error('Error adding gallery image:', err);
    res.status(500).send('Error adding image');
  }
};

exports.addConnection = async (req, res) => {
  try {
    const { connectedCharacterId, relationship, details } = req.body;
    await Connection.create({
      characterId: req.params.id,
      connectedCharacterId,
      relationship,
      details
    });
    res.redirect(`/characters/${req.params.id}#connections`);
  } catch (err) {
    console.error('Error adding connection:', err);
    res.status(500).send('Error adding connection');
  }
};