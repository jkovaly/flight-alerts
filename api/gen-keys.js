const webpush = require('web-push');

module.exports = (req, res) => {
  const keys = webpush.generateVAPIDKeys();
  res.status(200).json(keys);
};
