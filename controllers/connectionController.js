const { Connection, Character, ConnectionSong } = require('../models');

exports.getConnection = async (req, res) => {
  try {
    const connection = await Connection.findByPk(req.params.id, {
      include: [
        { model: Character, as: 'character', attributes: ['id', 'name', 'avatarUrl'] },
        { model: Character, as: 'connectedCharacter', attributes: ['id', 'name', 'avatarUrl'] },
        { model: ConnectionSong, as: 'songs' }
      ]
    });
    if (!connection) {
      return res.status(404).render('404', { title: 'Connection Not Found' });
    }
    res.render('connections/view', { title: 'Connection', connection });
  } catch (err) {
    console.error('Error loading connection:', err);
    res.status(500).send('Error loading connection');
  }
};

exports.addSong = async (req, res) => {
  try {
    const { spotifyUrl, title } = req.body;
    await ConnectionSong.create({
      connectionId: req.params.id,
      spotifyUrl,
      title
    });
    res.redirect(`/connections/${req.params.id}`);
  } catch (err) {
    res.status(500).send('Error adding song');
  }
};