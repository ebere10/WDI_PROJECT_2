const Hotel = require('../models/hotel');

function hotelsIndex(req, res){
  Hotel.find((err, hotel) => {
    if(err) return res.status(500).send();
    return res.status(200).json(hotel);
  });
}

module.exports = {
  index: hotelsIndex
};
