-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS test_northern_attitude;

-- Use the database
USE test_northern_attitude;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  displayName VARCHAR(50),
  bio TEXT,
  isAdmin BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE, -- e.g., "Toronto Maple Leafs"
  description TEXT,
  city VARCHAR(100),
  mascot VARCHAR(100),
  logoUrl VARCHAR(255),
  primaryColor VARCHAR(7),
  secondaryColor VARCHAR(7),
  accentColor VARCHAR(7),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  nickname VARCHAR(100) NULL,
  age INT UNSIGNED NULL,
  birthday DATE NULL,
  zodiac VARCHAR(50) NULL,
  hometown VARCHAR(100) NULL,
  education VARCHAR(100) NULL,
  occupation VARCHAR(100) NULL,
  sexuality VARCHAR(50) NULL,
  pronouns VARCHAR(50) NULL,
  languages VARCHAR(100) NULL,
  religion VARCHAR(50) NULL,
  gender VARCHAR(50) NULL,
  url VARCHAR(255) NULL, -- URL for the player's image
  role ENUM('Player', 'Staff', 'Civilian') NOT NULL,
  position VARCHAR(50) NULL,
  jerseyNumber INT UNSIGNED NULL,
  teamId INT UNSIGNED NULL, -- Reference by team ID instead of name
  job VARCHAR(100) NULL,
  bio TEXT NULL,
  faceclaim VARCHAR(255) NULL,
  avatarUrl VARCHAR(255) NULL,
  bannerUrl VARCHAR(255) NULL, -- URL for the character's banner image
  sidebarUrl VARCHAR(255) NULL, -- URL for the character's sidebar image
  spotifyEmbed TEXT NULL, -- Spotify playlist embed code
  quote TEXT NULL, -- A quote displayed on the character's profile
  personality TEXT NULL,
  strengths TEXT NULL,
  weaknesses TEXT NULL,
  likes TEXT NULL,
  dislikes TEXT NULL,
  fears TEXT NULL,
  goals TEXT NULL,
  appearance TEXT NULL,
  background TEXT NULL,
  skills TEXT NULL,
  favFood VARCHAR(100) NULL,
  favMusic VARCHAR(100) NULL,
  favMovies VARCHAR(100) NULL,
  favColor VARCHAR(50) NULL,
  favSports VARCHAR(100) NULL,
  inspiration TEXT NULL,
  fullBio TEXT NULL,
  isPrivate BOOLEAN NOT NULL DEFAULT FALSE,
  isArchived BOOLEAN NOT NULL DEFAULT FALSE,
  gallery TEXT DEFAULT NULL,
  createdBy INT UNSIGNED NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (teamId) REFERENCES teams(id) ON DELETE SET NULL,
  INDEX idx_created_by (createdBy),
  INDEX idx_team_id (teamId)
);

CREATE TABLE IF NOT EXISTS connections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  characterId INT UNSIGNED NOT NULL,
  connectedCharacterId INT UNSIGNED NOT NULL,
  relationship VARCHAR(100) NOT NULL,
  details TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (connectedCharacterId) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS connection_songs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  connectionId INT UNSIGNED NOT NULL,
  title VARCHAR(255),
  spotifyUrl VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (connectionId) REFERENCES connections(id) ON DELETE CASCADE
);