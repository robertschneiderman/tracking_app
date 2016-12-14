let secret;
if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./config');
} else {
  module.exports = {
      secret: process.env.SECRET,
      sgApiKey: process.env.sgApiKey,
  };
}