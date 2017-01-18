const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  country: String,
  lat: String,
  lng: String,
  type: String,
  website: String
});

module.exports = mongoose.model('Hotel', hotelSchema);
