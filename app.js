require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const path = require('path');
const { sequelize } = require('./models');

console.log('App started. Environment:', process.env.NODE_ENV || 'development');
// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;


// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Method Override
app.use(methodOverride('_method'));

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user ? req.user.get({ plain: true }) : null;
  next();
});

const authRoutes = require('./routes/auth');
const teamsRoutes = require('./routes/teams');
const dashboardRoutes = require('./routes/dashboard');
const homeRoutes = require('./routes/home');
const charactersRouter = require('./routes/characters');
const connectionsRouter = require('./routes/connections');

app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/', homeRoutes);
app.use('/characters', charactersRouter);
app.use('/connections', connectionsRouter);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });