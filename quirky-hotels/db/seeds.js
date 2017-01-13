const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/quirky-hotels';
mongoose.connect(databaseURL);

//require /models/hotel
const Hotel = require('../models/hotel');

Hotel.collection.drop();

const hotels = [
  {
    name: 'Treehotel',
    description: 'Treehouses',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/DasPark_3304122b.jpg',
    country: 'Harads, Sweden',
    lat: '66.072853',
    lng: '20.981772',
    type: 'Hotel'
  },
  {
    name: 'No Man\'s Fort',
    description: 'A Victorian-era fort',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03303/NoMansFort-aerial_3303950b.jpg',
    country: 'Portsmouth, UK',
    lat: '50.794790',
    lng: '-1.106087',
    type: 'Luxury hotel'
  },
  {
    name: 'Palacio de Sal',
    description: 'A hotel constructed entirely from salt… including the furniture.',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03303/Palacio_de_Sal_3303986b.jpg',
    country: 'Uyuni, Bolivia',
    lat: '-20.305199',
    lng: '-66.974071',
    type: 'Hotel'
  }
];

hotels.forEach((hotel, index) => {
  Hotel.create(hotel(err, hotel) => {
    if (err) return console.log(err);
    return console.log(`${hotel.name} was saved.`);
  });
});


// const hotel1 = new Hotel({
//   name: 'Best Hotel',
//   lat: '51.5179441',
//   lng: '-0.0896725',
//   location: 'somewhere'
// });
//
// hotel1.save(function(err, hotel) {
//   if (err) return console.log(err);
//   console.log(`${hotel.name} saved!`);
// });
