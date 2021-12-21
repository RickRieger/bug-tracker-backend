const multer = require('multer');
const { dirname } = require('path');
const path = require('path');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
