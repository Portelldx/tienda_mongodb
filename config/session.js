const express = require('express');
const session = require('express-session');
const sequelize = require('../data/database-mysql');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({
  db: sequelize,
});

const useStoreSession = () =>
  session({
    secret: 'super-secret',
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  });

module.exports = useStoreSession;
