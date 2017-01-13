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

  }
];

hotels.forEach((hotel, index) => {
  hotel.create(hotel(err, hotel) => {
    if (err) return console.log(err)
    return console.log(`${hotel.name} was saved.`);
  });
})
