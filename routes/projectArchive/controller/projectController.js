const Project = require('../model/Project');
// const User = require('../../user/model/User.js');
// const Ticket = require('../../ticket/model/Ticket.js');

const createProject = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, description, startDate, endDate, priority } = req.body;
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      priority,
    });
    const savedNewProject = await newProject.save();
    res.json(savedNewProject);
  } catch (e) {
    next(e);
  }
};

const getAllProjects = async (req, res, next) => {
  // console.log(req);
  // const { decodedJwt } = res.locals;
  try {
    let payload = await Project.find();
    res.json(payload);
  } catch (e) {
    next(e);
  }
};

const updateProject = async (req, res, next) => {
  let updateObj = {};

  let body = req.body;

  for (let key in body) {
    if (body[key] !== '') {
      updateObj[key] = body[key];
    }
  }

  try {
    let updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    ).select('-__v');
    res.json({
      message: 'success',
      payload: updatedProject,
    });
  } catch (e) {
    next(e);
  }
};

// const deleteProject = async (req, res, next) => {
//   try {
//     let deletedFriend = await Friend.findByIdAndRemove(req.params.id);

//     const { decodedJwt } = res.locals;

//     let foundUser = await User.findOne({ email: decodedJwt.email });

//     let foundUserArray = foundUser.friends;

//     let filteredFriendsArray = foundUserArray.filter((id) => {
//       return id.toString() !== deletedFriend._id.toString();
//     });

//     foundUser.friends = filteredFriendsArray;

//     await foundUser.save();

//     res.json({ message: 'success', payload: deletedFriend });
//   } catch (e) {
//     next(e);
//   }
// };

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  // deleteProject,
};
