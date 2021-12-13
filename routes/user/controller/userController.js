const bcrypt = require('bcryptjs');
const User = require('../model/User');
const Project = require('../../project/model/Project')
const jwt = require('jsonwebtoken');

async function signup(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  const { errorObj } = res.locals;
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: 'failure', payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    if (req.body.adminPassword === '12345') {
      const role = 'admin';
      const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });

      let savedUser = await createdUser.save();

      res.json({ message: 'success' });
    } else {
      const createdUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      let savedUser = await createdUser.save();

      let jwtToken = jwt.sign(
        {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          role: savedUser.role,
        },
        process.env.PRIVATE_JWT_KEY,
        {
          expiresIn: '1d',
        }
      );

      res.json({ message: 'success', payload: jwtToken });
    }
  } catch (e) {

    next(e);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: 'failure', payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({
        message: 'failure',
        payload: 'Please check your email',
      });
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        res.status(400).json({
          message: 'failure',
          payload: 'Please check your password',
        });
      } else {
        let jwtToken = jwt.sign(
          {
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: '1d',
          }
        );

        res.json({ message: 'success', payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: 'error', error: e });
  }
}

async function fetchUserInfo(req, res, next) {
  try {
    let userInfo = await User.findOne({
      email: res.locals.decodedJwt.email,
    }).select('-password -__v');
    res.json({ message: 'success', payload: userInfo });
  } catch (e) {
    next(e);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    let payload = await User.find().select('-createdAt -email -password -phoneNumber -projects -tickets -updatedAt -_v');
    res.json(payload);
  } catch (e) {
    next(e);
  }
};

const getAllUsersByProject = async (req, res, next) => {
  const project_id = req.params.id;

  try {
    let payload = await Project.findOne({ _id: project_id })
      .populate({
        path: 'developers',
        model: User,
        select: '-email -phoneNumber -password -projects -tickets -updatedAt -createdAt -ticket -project -__v',
      })
      .select(
        '-priority -completed -archive -projectManager -projectName -description -startDate -endDate -createdAt -updatedAt -tickets -__v -_id'
      );

    res.json(payload);
  } catch (e) {
    next(e);
  }
};

async function updateUser(req, res, next) {

  if (req.body.password) {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  try {
    let updatedUser = await User.findOneAndUpdate(
      { email: res.locals.decodedJwt.email },
      req.body,
      { new: true }
    );
    if (req.body.password) {
      res.status(202).json({ message: 'success', payload: updatedUser });
    } else {
      res.json({ message: 'success', payload: updatedUser });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { signup, login, fetchUserInfo, getAllUsers, getAllUsersByProject, updateUser };
