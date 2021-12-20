const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

// Info from .env
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// S3 Obj needed for connecting to AWS S3
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Upload a file to S3
function uploadFile(file) {
  // Using fs library, create a read stream and pass in the path that comes from multer
  const fileStream = fs.createReadStream(file.path);
  
  // Create a new Obj with bucket name, the created file stream, and name of the file
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  // Send to S3 Bucket with a promise as an alt to using call back functions
  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

// Download a file from S3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;
