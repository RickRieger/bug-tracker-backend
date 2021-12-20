const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const ErrorMessageHandlerClass = require('./routes/utils/ErrorMessageHandlerClass');
const errorController = require('./routes/utils/errorController');
const userRouter = require('./routes/user/userRouter');
const projectRouter = require('./routes/project/projectRouter');
const ticketRouter = require('./routes/ticket/ticketRouter');
const ticketCommentRouter = require('./routes/ticketComment/ticketCommentRouter');


app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

const limiter = rateLimit({
  max: 200,
  windowMs: 15 * 60 * 1000, //this is in millie second
  message:
    'Too many requests from this IP, please try again or contact support',
});
app.use('/api', limiter);
app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/comment', ticketCommentRouter);
// app.use('/api/ticket-comments', ticketCommentsRouter);

app.all('*', function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});
app.use(errorController);
module.exports = app;
