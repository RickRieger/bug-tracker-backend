const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  signup,
  login,
  fetchUserInfo,
  getAllUsers,
  getAllUsersByProject,
  updateUser,
} = require('./controller/userController');

const checkIsUndefined = require('./helpers/checkIsUndefined');
const checkIsEmptyFunc = require('./helpers/checkIsEmptyFunc');
const checkIsStrongPasswordFunc = require('./helpers/checkIsStrongPasswordFunc');

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
} = require('./helpers/authMiddleware');

router.post(
  '/sign-up',
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  signup
);

router.post(
  '/login',
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

router.get('/get-user-info', jwtMiddleware, fetchUserInfo);

router.get('/get-all-users', jwtMiddleware, getAllUsers);

router.get('/get-all-users-by-project-id/:id', jwtMiddleware, getAllUsersByProject);

router.put('/update-user-profile', jwtMiddleware, updateUser);

module.exports = router;
