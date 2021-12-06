const { checkIsEmail, checkIsAlpha } = require('../../utils/authMethods');

function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;

  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = 'Must be in email format!';
  }
  next();
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === 'firstName' || key === 'lastName') {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }
  console.log('made it this far2');
  next();
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
};
