const Ticket = require('../model/Ticket.js');
const Project = require('../../project/model/Project');
const createTicket = async (req, res, next) => {
  try {
    const { projectId, title, description, priorityLevel, ticketType } = req.body;


    const newTicket = new Ticket({
      projectId,
      title,
      description,
      priorityLevel,
      ticketType,
    });
 
    const savedNewTicket = await newTicket.save();

    const foundTargetProject = await Project.findOne({
      _id: newTicket.projectId,
    });
  
    foundTargetProject.tickets.push(savedNewTicket);
    await foundTargetProject.save();
    res.json({
      message: 'Ticket was saved',
      payload: savedNewTicket,
    });
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
  const project_id = req.params.id;

  try {
    let payload = await Project.findOne({ _id: project_id })
      .populate({
        path: 'tickets',
        model: Ticket,
        select: '-__v',
      })
      .select(
        '-archive -completed -createdAt -description -developers -startDate -endDate -priority -completed -projectManager -projectName -updatedAt -__v -_id'
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
const uploadFileToTicket = async (req, res, next) => {
  if(req.files === null){
    return res.status(400).json({message: 'No File Uploaded'})
  }

  const file = req.file

  console.log(file)

  res.send('successful upload')
  
  return
  try {

  } catch (e) {
    next(e);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    let deletedTicket = await Ticket.findByIdAndRemove(req.params.id);


    let foundProject = await Project.findOne({ _id: deletedTicket.project });


    let foundTicketsArray = foundProject.tickets;

    let filteredTicketsArray = foundTicketsArray.filter((id) => {
      return id.toString() !== deletedTicket._id.toString();
    });



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
  uploadFileToTicket
};
