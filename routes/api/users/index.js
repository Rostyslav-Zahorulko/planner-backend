const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  currentUser,
} = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { validateSignupUser, validateLoginUser } = require('./validation');

router.post('/signup', validateSignupUser, signup);
router.post('/login', validateLoginUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, currentUser);

module.exports = router;
