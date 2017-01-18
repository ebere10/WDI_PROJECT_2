module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOBD_URI || 'mongodb://localhost/quirky-hotels',
  secret: process.env.SECRET || 'quirky-hotels'
};
