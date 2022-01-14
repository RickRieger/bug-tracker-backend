const Comment = require('../model/TicketComments');
const Ticket = require('../../ticket/model/Ticket');
const TicketComments = require('../model/TicketComments');
const User = require('../../user/model/User');
const createComment = async (req, res, next) => {
  const ticket_id = req.params.id;
  const comment = req.body.comment;

  try {
    const commenter = {
      firstName: res.locals.decodedJwt.firstName,
      lastName: res.locals.decodedJwt.lastName,
    };
    const ticket = await Ticket.findOne({
      _id: ticket_id,
    });
    const newComment = new Comment({ ticket, commenter, comment });

    const savedNewComment = await newComment.save();

    ticket.comments.push(savedNewComment._id);

    await ticket.save();

    res.json({
      message: 'comment saved',
    });
  } catch (e) {
    next(e);
  }
};

const getAllTicketComments = async (req, res, next) => {
  const ticket_id = req.params.id;
  try {
    let payload = await Ticket.findOne({ _id: ticket_id })
      .populate({
        path: 'comments',
        model: TicketComments,
        select: '-__v',
      })
      .select(
        '-projectId -description -priorityLevel -ticketType -ticketStatus -attachments -developer -createdAt -updatedAt -__v -_id -title '
      );
    console.log(payload);
    res.json(payload);
  } catch (e) {
    next(e);
  }
};

const updateComment = async (req, res, next) => {
  let updateObj = {};

  let body = req.body;

  for (let key in body) {
    if (body[key] !== '') {
      updateObj[key] = body[key];
    }
  }

  try {
    let updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    ).select('-__v');
    res.json({
      message: 'success',
      payload: updatedComment,
    });
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    let deletedComment = await Comment.findByIdAndRemove(req.params.id);

    let foundTicket = await Ticket.findOne({ _id: deletedComment.ticket });

    let foundCommentsArray = foundTicket.comments;

    let filteredCommentsArray = foundCommentsArray.filter((id) => {
      return id.toString() !== deletedComment._id.toString();
    });

    foundTicket.comments = filteredCommentsArray;

    await foundTicket.save();

    res.json({ message: 'success', payload: deletedComment });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createComment,
  getAllTicketComments,
  updateComment,
  deleteComment,
};
