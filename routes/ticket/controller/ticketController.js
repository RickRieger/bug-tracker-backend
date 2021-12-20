const Ticket = require('../model/Ticket.js');
const Project = require('../../project/model/Project');
const { uploadFile, getFileStream } = require('../../utils/s3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const createTicket = async (req, res, next) => {
  try {
    const { projectId, title, description, priorityLevel, ticketType } =
      req.body;

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
const getTicket = async (req, res, next) => {
  const ticket_id = req.params.id;
  try {
    let payload = await Ticket.findOne({ _id: ticket_id })
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







const getAllAttachmentsByTicket = async (req, res, next) => {
  const ticket_id = req.params.id;
  try {
    const foundTargetTicket = await Ticket.findOne({
      _id: ticket_id,
    });
    let payload = foundTargetTicket.attachments;

    let attachments = [];
    payload.map((item) => {
      let desc = item.attachment.description;
      let fileName = item.attachment.fileUploadedFromClient.originalname;
      let fileKeyForS3 = item.attachment.resultFromS3.Key;
      let attachment = {
        desc: desc,
        fileName: fileName,
        fileKeyForS3: fileKeyForS3,
      };
      attachments.push(attachment);
    });

    res.json({
      message: 'success',
      payload: attachments,
    });

  } catch (error) {}
};











const uploadFileToTicket = async (req, res, next) => {
  const ticket_id = req.params.id;
  if (req.files === null) {
    return res.status(400).json({ message: 'No File Uploaded' });
  }
  
  const fileUploadedFromClient = req.file;
  const description = req.body.description;

  try {
    let resultFromS3 = await uploadFile(fileUploadedFromClient);

    let ticketAttachment = {
      attachment: { description, fileUploadedFromClient, resultFromS3 },
    };

    const foundTargetTicket = await Ticket.findOne({
      _id: ticket_id,
    });

    foundTargetTicket.attachments.push(ticketAttachment);

    await foundTargetTicket.save();

    await unlinkFile(fileUploadedFromClient.path);

    res.json({ message: 'Attachment Uploaded' });
  } catch (e) {
    next(e);
  }
};










const getSingleAttachmentFromS3bucket = async (req, res, next) => {
  try {
    const key = req.params.key;

    const readStream = getFileStream(key);

    const pipe = await readStream.pipe(res);

    readStream.on('error', (error) => {
      return res.status(404).send({message:'file not found', payload:error});
    });

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
  getTicket,
  getAllTickets,
  getAllTicketsByProject,
  getAllAttachmentsByTicket,
  getSingleAttachmentFromS3bucket,
  updateTicket,
  deleteTicket,
  uploadFileToTicket,
};
