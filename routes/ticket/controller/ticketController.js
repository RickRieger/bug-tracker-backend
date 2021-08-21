const Ticket = require('../model/Ticket.js');
const Project = require('../../project/model/Project');
const createTicket = async (req, res, next) => {
  try {
    const { project, title, description, priorityLevel, ticketType } = req.body;
    const newTicket = new Ticket({
      project,
      title,
      description,
      priorityLevel,
      ticketType,
    });
    console.log('here dummy', newTicket);

    const savedNewTicket = await newTicket.save();
    const foundTargetProject = await Project.findOne({
      _id: newTicket.project,
    });
    console.log(foundTargetProject);
    foundTargetProject.tickets.push(savedNewTicket._id);
    await foundTargetProject.save();
    res.json(savedNewTicket);
  } catch (e) {
    next(e);
  }
};

const getAllTickets = async (req, res, next) => {
  try {
    let payload = await Ticket.find();
    res.json(payload);
  } catch (e) {
    next(e);
  }
};
const getAllTicketsByProject = async (req, res, next) => {
  console.log(req.params);
  const project_id = req.params.id;

  try {
    let payload = await Project.findOne({ _id: project_id })
      .populate({
        path: 'ticket',
        model: Ticket,
        select: '-__v',
      })
      .select(
        '-priority -completed -projectManager -developer -__v -_id -name -description'
      );
    res.json(payload);
  } catch (e) {
    next(e);
  }
};

const updateTicket = async (req, res, next) => {
  let updateObj = {};

  let body = req.body;

  for (let key in body) {
    if (body[key] !== '') {
      updateObj[key] = body[key];
    }
  }

  try {
    let updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    ).select('-__v');
    res.json({
      message: 'success',
      payload: updatedTicket,
    });
  } catch (e) {
    next(e);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    let deletedTicket = await Ticket.findByIdAndRemove(req.params.id);
    console.log('deleted ticket', deletedTicket);
    console.log('deleted ticket project', deletedTicket.project);

    let foundProject = await Project.findOne({ _id: deletedTicket.project });
    console.log('found project', foundProject);

    let foundTicketsArray = foundProject.tickets;

    let filteredTicketsArray = foundTicketsArray.filter((id) => {
      return id.toString() !== deletedTicket._id.toString();
    });

    console.log('filtered', filteredTicketsArray);

    foundProject.tickets = filteredTicketsArray;

    await foundProject.save();

    res.json({ message: 'success', payload: deletedTicket });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getAllTicketsByProject,
  updateTicket,
  deleteTicket,
};
