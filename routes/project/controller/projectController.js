const Project = require('../model/Project');
const User = require('../../user/model/User');

const createProject = async (req, res, next) => {
  try {
    const { projectName, description, startDate, endDate, priority } = req.body;
    const newProject = new Project({
      projectName,
      description,
      startDate,
      endDate,
      priority,
    });
    const savedNewProject = await newProject.save();
    res.json({ message: 'New Project Created', payload: savedNewProject });
  } catch (e) {
    next(e);
  }
};

const getAllProjects = async (req, res, next) => {
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

const addPersonnelToProject = async (req, res, next) => {
  try {
    const  developers  = req.body.developers;
  
    let foundProject = await Project.findOne({
      _id: req.params.id,
    });
    
    foundProject.developers.push(...developers);

    foundProject.save();

    for (const dev of developers) {
      let foundUser = await User.findOne({
        _id: dev,
      });
      foundUser.projects.push(req.params.id);
      foundUser.save();
    }

    res.json({
      message: 'Personnel saved',
      payload: foundProject,
    });
  } catch (e) {
    next(e);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    let deletedProject = await Project.findByIdAndRemove(req.params.id);
    res.json({ message: 'success', payload: deletedProject });
  } catch (e) {
    next(e);
  }
};

async function getProjectById(req, res, next) {
  try {
    let project = await Project.findOne({
      _id: req.params.id,
    });
    res.json({ message: 'success', payload: project });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  addPersonnelToProject,
  deleteProject,
  getProjectById,
};
