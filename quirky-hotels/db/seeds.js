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
  },
  {
    name: 'Dog Bark Park Inn',
    description: 'A B&B in the shape of a beagle',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/DogBarkParkInn_3304030b.jpg',
    country: 'Idaho, USA',
    lat: '46.057663',
    lng: '-116.344322',
    type: 'B&B'
  },
  {
    name: 'V8 Hotel',
    description: 'Car themed hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/V8Hotel_3304099b.jpg',
    country: 'Stuttgart, Germany',
    lat: '48.690801',
    lng: '9.004158',
    type: 'Hotel'
  },
  {
    name: 'Das Park Hotel',
    description: 'Rooms made from renovated concrete sewage pipes',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/DasPark_3304122b.jpg',
    country: 'Linz, Austria',
    lat: '48.330797',
    lng: '14.169786',
    type: 'Hotel'
  },
  {
    name: 'Sheraton Huzhou Hot Spring Resort',
    description: 'Shaped like a magnet',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/SheratonHuzhou_3305572b.jpg',
    country: 'Huzhou, China',
    lat: '30.957640',
    lng: '120.108006',
    type: 'Luxury hotel'
  },
  {
    name: 'Quinta Real Zacatecas',
    description: 'Hotel built around a restored 19th century bullfighting ring',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/Quinta-Real_3304242b.jpg',
    country: 'Zacatecas, Mexico',
    lat: '22.768783',
    lng: '-102.575736',
    type: 'Hotel'
  },
  {
    name: 'Null Stern Hotel',
    description: 'Zero star hotel in a converted underground nuclear bunker',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/NullStern_3304254b.jpg',
    country: 'St Gallen, Switzerland',
    lat: '46.637697',
    lng: '9.279877',
    type: 'Hotel'
  },
  {
    name: 'Capsulevalue Kanda',
    description: 'Capsule hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/CapsuleHotelKanda_3304382b.jpg',
    country: 'Tokyo, Japan',
    lat: '35.689569',
    lng: '139.770774',
    type: 'Hotel'
  },
  {
    name: 'Jumbo Stay',
    description: 'Converted jumbo jet',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/JumboStay_3304484b.jpg',
    country: 'Stockholm Arlanda Airport, Sweden',
    lat: '59.639952',
    lng: '17.938738',
    type: 'Hotel'
  },
  {
    name: 'Crazy Bear',
    description: 'Moulin Rouge, Las Vegas and planet Mars inpired rooms',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/CrazyBear_3304518b.jpg',
    country: 'Beaconsfield, UK',
    lat: '51.601793',
    lng: '-0.637621',
    type: 'Hotel'
  },
  {
    name: 'The Hobbit Motel',
    description: 'Lord of the rings inspired rooms',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/HobbitMotel_3304554b.jpg',
    country: 'Waitomo, New Zealand',
    lat: '-38.253199',
    lng: '175.119351',
    type: 'Motel'
  },
  {
    name: 'Dream Cave Hotel',
    description: 'Hotel built inside a cave',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/DreamCave_3304565b.jpg',
    country: 'Cappadocia, Turkey',
    lat: '38.645693',
    lng: '34.827763',
    type: 'Hotel'
  },
  {
    name: 'The Manta Resort, Pemba Island, Tanzania',
    description: 'Hotel with underwater bedroom',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/Manta-UnderwaterRo_3304600b.jpg',
    country: 'Pemba Island, Tanzania',
    lat: '-4.882748',
    lng: '39.679334',
    type: 'Hotel'
  },
  {
    name: 'Free Spirit Spheres',
    description: 'Suspended spherical treehouses',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/FreeSpiritSpheres_3304652b.jpg',
    country: 'Vancouver Island, Canada',
    lat: '49.382006',
    lng: '-124.614114',
    type: 'Room only'
  },
  {
    name: 'Costa Verde',
    description: 'Refurbished plane in the jungle',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/CostaVerde_3304665b.jpg',
    country: 'Costa Rica',
    lat: '9.398702',
    lng: '-84.154188',
    type: 'Hotel'
  },
  {
    name: 'The Boot Bed’n’Breakfast',
    description: 'Guesthouse in a shoe',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/TheBoot-B_B_3304677b.jpg',
    country: 'Tasman, New Zealand',
    lat: '-41.195492',
    lng: '173.057811',
    type: 'B&B'
  },
  {
    name: 'Huettenpalast Berlin',
    description: 'Classic caravans... indoors',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/Huettenpalast_3305261b.jpg',
    country: 'Berlin, Germany',
    lat: '52.489344',
    lng: '13.425935',
    type: 'Hotel'
  },
  {
    name: 'The Liberty',
    description: 'Hotel in a former jail',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/LibertyHotel_3305358b.jpg',
    country: 'Boston, Massachusetts, USA',
    lat: '42.361979',
    lng: '-71.070525',
    type: 'Hotel'
  },
  {
    name: 'Kakslauttanen Hotel',
    description: 'Glass igloos',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/Kakslauttanen_3305383b.jpg',
    country: 'Saariselkä, Finland',
    lat: '68.333503',
    lng: '27.336715',
    type: 'Hotel'
  },
  {
    name: 'Hotel CasAnus',
    description: 'Hotel shaped like a giant intestine',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/Casanus_3305392b.jpg',
    country: 'Antwerp, Belgium',
    lat: '51.228287',
    lng: '4.054846',
    type: 'Room only'
  },
  {
    name: 'ION Luxury Adventure Hotel',
    description: 'Hotel at the base o a dormant volcano',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/IONLuxury_3305414b.jpg',
    country: 'Nesjavellir, Iceland',
    lat: '64.117019',
    lng: '-21.253138',
    type: 'Hotel'
  },
  {
    name: 'Featherbed Railroad',
    description: 'Rooms are vintage railroad caboose cars',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/FeatherbedRailroad_3305446b.jpg',
    country: 'California, USA',
    lat: '39.121888',
    lng: '-122.858291',
    type: 'B&B'
  },
  {
    name: 'Hang Nga Guesthouse',
    description: 'Animal themed rooms in a tree-like hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/HangNga_3305461b.jpg',
    country: 'Da Lat, Vietnam',
    lat: '11.934736',
    lng: '108.430645',
    type: 'Hotel'
  },
  {
    name: 'The Marmara Antalya',
    description: 'Revolving hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/MarmaraAntalya_3305497b.jpg',
    country: 'Antalya, Turkey',
    lat: '36.856828',
    lng: '30.738698',
    type: 'Luxury Hotel'
  },
  {
    name: 'De Vrouwe van Stavoren',
    description: 'Rooms built in giant wine casks',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/Wine-cask_3305518b.jpg',
    country: 'Stavoren, Netherlands',
    lat: '52.885804',
    lng: '5.358444',
    type: 'Hotel'
  },
  {
    name: 'Beckham Creek Cave Haven',
    description: 'Underground hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03305/BeckhamCaveCreek_3305542b.jpg',
    country: 'Arkansas, USA',
    lat: '35.954693',
    lng: '-93.317404',
    type: 'Hotel'
  },
  {
    name: 'Sun Cruise Resort',
    description: 'Cruise ship themed hotel on top of a cliff',
    image: 'http://www.lazerhorse.org/wp-content/uploads/2013/07/Sun-Cruise-Resort-South-Korea-Luxury-Hotel.jpg',
    country: 'Kangwon, South Korea',
    lat: '37.683255',
    lng: '129.040305',
    type: 'Hotel'
  },
  {
    name: 'Cottars 1920s camp',
    description: '1920s safari experience',
    image: 'http://www.uniqhotels.com/media/hotels/28/53fa98-eaf7-4bdb-ab36-c95d63073f6e.jpeg',
    country: 'Kenya',
    lat: '-1.719487',
    lng: '35.337415',
    type: 'Hotel'
  },
  {
    name: 'Icehotel',
    description: 'Hotel made from ice',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/IceHotel_3304078b.jpg',
    country: 'Jukkasjärvi, Sweden',
    lat: '67.850867',
    lng: '20.595315',
    type: 'Hotel'
  },
  {
    name: 'Hotel Marqués De Riscal',
    description: 'Avant garde titanium ribbons',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/MarquesDeRiscal_3304147b.jpg',
    country: 'Elciego, Spain',
    lat: '42.511603',
    lng: '-2.617624',
    type: 'Hotel'
  },
  {
    name: 'Crane Hotel',
    description: '150ft high room that rotates 360 degrees',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/CraneHotel_3304178b.jpg',
    country: 'Harlingen, The Netherlands',
    lat: '53.174333',
    lng: '5.410038',
    type: 'Hotel'
  },
  {
    name: 'El Cosmico, Marfa',
    description: 'A nomadic style hotel',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/ElCosmico_3304190b.jpg',
    country: 'Texas, USA',
    lat: '30.302386',
    lng: '-104.020458',
    type: 'Hotel/lodge'
  },
  {
    name: 'Magic Mountain Hotel',
    description: 'Hotel in a forest',
    image: 'http://i.telegraph.co.uk/multimedia/archive/03304/Magic-Mountain_3304043b.jpg',
    country: ' Chile',
    lat: '-39.869331',
    lng: '-71.918523',
    type: 'Hotel'
  }
];

hotels.forEach((hotel, index) => {
  Hotel.create(hotel,(err, hotel) => {
    if (err) return console.log(err);
    return console.log(`#${index+1} ${hotel.name} was saved.`);
  });
});


// const hotel1 = new Hotel({
//   name: 'Test Hotel',
//   lat: '51.5179441',
//   lng: '-0.0896725',
//   location: 'somewhere'
// });
//
// hotel1.save(function(err, hotel) {
//   if (err) return console.log(err);
//   console.log(`${hotel.name} saved!`);
// });
