const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Check if username exists
exports.checkUsernameExists = async (username) => {
  const user = await User.findOne({ where: { username } });
  return !!user;
};

// Check if email exists
exports.checkEmailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

// Register user
exports.registerUser = async (data) => {
  const { username, email, password, displayName } = data;
  return await User.create({
    username,
    email,
    password,
    displayName
  });
};

// Get user profile
exports.getUserProfile = async (userId) => {
  return await User.findByPk(userId);
};

// Update user profile
exports.updateUserProfile = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  await user.update(data);
  return user;
};

// Change password
exports.changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  const isMatch = await user.validPassword(currentPassword);
  if (!isMatch) throw new Error('Current password is incorrect');
  user.password = newPassword;
  await user.save();
  return user;
};