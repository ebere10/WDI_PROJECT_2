module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOBD_URI || 'mongodb://localhost/WDI_PROJECT_2',
  secret: process.env.SECRET || 'quirky-hotels'
};
