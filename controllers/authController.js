const db = require("../db")
const SECRET = require('../config/auth').config.secret;

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const randtoken = require('rand-token');

const refreshTokens = {};


exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = {
    'username': username,
    'role': 'admin'
  };
  const token = jwt.sign(user, SECRET, { expiresIn: 300 })
  const refreshToken = randtoken.uid(256);
  refreshTokens[refreshToken] = username;
  res.json({ jwt: token, refreshToken: refreshToken });
};

exports.logout = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204);
};

exports.refresh = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken in refreshTokens) {
    const user = {
      'username': refreshTokens[refreshToken],
      'role': 'admin'
    }
    const token = jwt.sign(user, SECRET, { expiresIn: 600 });
    res.json({ jwt: token })
  }
  else {
    res.sendStatus(401);
  }
};