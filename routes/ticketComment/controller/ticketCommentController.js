const Comment = require('../model/TicketComments');
const Ticket = require('../../ticket/model/Ticket');
const TicketComments = require('../model/TicketComments');

const createComment = async (req, res, next) => {
  const ticket_id = req.params.id;
  try {
    const { ticket, comment, whoMadeComment } = req.body;
    const newComment = new Comment({ ticket, comment, whoMadeComment });
    const savedNewComment = await newComment.save();
    const foundTargetTicket = await Ticket.findOne({
      _id: ticket,
    });
    foundTargetTicket.comments.push(savedNewComment._id);
    await foundTargetTicket.save();
    res.json(savedNewComment);
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
        '-project -description -priorityLevel -ticketType -developers -createdAt -updatedAt -__v -_id -title'
      );
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
