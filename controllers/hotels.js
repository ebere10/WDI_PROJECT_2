const Hotel = require('../models/hotel');

function hotelsIndex(req, res) {
  Hotel.find({}, (err, hotels) => {
    if (err) return res.status(500).json(err);
    if (!hotels) return res.status(404).json({ error: 'No hotel was found.' });
    return res.status(200).json(hotels);
  });
}

module.exports = {
  index: hotelsIndex
};
