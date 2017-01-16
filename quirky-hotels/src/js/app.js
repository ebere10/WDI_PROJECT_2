const App = App || {};
const google = google;
// const Hotel = require('../models/hotel');


App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
//  this.$modal  = $('.modal-content');

  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.hotels').on('click', this.hotels.bind(this));
  // $('.usersIndex').on('click', this.usersIndex.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.hotels();
};

App.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  //this.register();
  this.hotels();
};

// App.register = function(e) {
//   if (e)  e.preventDefault();
//
//   //this.$modal.html(`
//   $('.modal-content').html(`
//     <form method="post" action="/register">
//     <div class="modal-header">
//       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//       <h4 class="modal-title">Login</h4>
//     </div>
//     <div class="modal-body">
//       <div class="form-group">
//         <input class="form-control" type="text" name="user[username]" placeholder="Username">
//       </div>
//       </div>
//       <div class="modal-body">
//         <div class="form-group">
//           <input class="form-control" type="email" name="user[email]" placeholder="Email">
//         </div>
//         </div>
//       <div class="modal-body">
//       <div class="form-group">
//   <input class="form-control" type="password" name="user[password]" placeholder="Password">
//       </div>
//       </div>
//       <div class="modal-body">
//         <div class="form-group">
//                 <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
//         </div>
//         </div>
//       <div class="modal-footer">
//       <input class="btn btn-primary" type="submit" value="Register">
//       </div>
//     </form>
//   `);
//   $('.modal-content').modal('show');
// };
App.register = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <h2>Register</h2>
    <form method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
    </form>
  `);
};

App.hotels = function(e) {
  console.log('all hotels');
  if (e)  e.preventDefault();
  this.$main.html(`
    <h2>All the Hotels</h2>
    <div id="map-canvas"></div>
  `);
  this.mapSetup();
};

App.login = function(e) {
  e.preventDefault();
  this.$main.html(`
    <h2>Login</h2>
    <form method="post" action="/login">
    <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
    </div>
    <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
    </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
    `);
};

// App.login = function(e) {
//   if (e) e.preventDefault();
//
//   //this.$modal.html(`
//   $('.modal-content').html(`
//     <form method="post" action="/login">
//     <div class="modal-header">
//       <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//       </button>
//       <h4 class="modal-title">Login</h4>
//     </div>
//     <div class="modal-body">
//       <div class="form-group">
//         <input class="form-control" type="email" name="email" placeholder="Email">
//       </div>
//       </div>
//       <div class="modal-body">
//       <div class="form-group">
//         <input class="form-control" type="password" name="password" placeholder="Password">
//       </div>
//       </div>
//       <div class="modal-footer">
//       <input class="btn btn-primary" type="submit" value="Login">
//       </div>
//     </form>
//   `);
//   $('.modal-content').modal('show');
// };

App.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.handleForm = function(e){

  console.log('handleForm');
  e.preventDefault();
  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();
  return App.ajaxRequest(url, method, data, data => {
    if (data.token) App.setToken(data.token);
    App.loggedInState();
  });
};

App.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
  .done(callback)
  .fail(data => {
    console.log(data);
  });
};

App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

App.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

App.getToken = function(){
  return window.localStorage.getItem('token');
};

App.removeToken = function(){
  return window.localStorage.clear();
};

App.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"saturation":"42"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getHotels();
};

App.loopThroughHotels = function(data) {
  console.log(data);
  $.each(data, (index, hotel) => {
    console.log('loopThroughHotels');
    setTimeout(() => {
      App.createMarkerForHotel(hotel);
    }, index * 50);
  });
};


App.getHotels = function() {
  $.get(`${this.apiUrl}/hotels`).done(this.loopThroughHotels);
};


//
// Hotel.find({}, (err, hotel) => {
//   if (err) return res.status(500).json(err);
//   if (!hotel) return res.status(404).json({ error: 'No hotel was found.' });
//   return res.status(200).json(hotel);
// });
App.createMarkerForHotel = function(hotel) {
  console.log('marker creation');
  const latlng = new google.maps.LatLng(hotel.lat, hotel.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    // icon: '/images/marker.png',
    animation: google.maps.Animation.DROP
  });

  this.addInfoWindowForHotel(hotel, marker);
};

App.addInfoWindowForHotel = function(hotel, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    console.log('open?');
    this.infoWindow = new google.maps.InfoWindow({
      content: `<img src="${ hotel.image }"><p>${ hotel.name }</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);

    // map zoom out on close of window
    google.maps.event.addListener(App.addInfoWindowForHotel,'closeclick',function(){
      // this.map.setCenter(marker.getPosition());
      // this.map.setZoom(2);
      console.log('close?');
    });
  });
};
//function to zoom out when info window closes
// google.maps.event.addListener(this.infoWindow,'closeclick',function(){
//   this.map.setZoom(2);
// });

$(App.init.bind(App));
