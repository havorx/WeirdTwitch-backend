const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const route = require('./routes/routing');

// Connect db
const db = require('./config/database');
db.connect();

const app = express();

// Authentication
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(logger('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
route(app);

module.exports = app;
