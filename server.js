require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected on ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
