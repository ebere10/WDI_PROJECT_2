const App = App || {};
const google = google;
// const Hotel = require('../models/hotel');


App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');//**********CHANGE FOR MODAL***********
  // this.$body = $('body');//delete
  // this.$modal  = $('.modal-content');

  $('.landing').on('click', this.landing.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.hotels').on('click', this.hotels.bind(this));
  // $('.usersIndex').on('click', this.usersIndex.bind(this));
  this.$main.on('submit', 'form', this.handleForm);//**********CHANGE FOR MODAL***********
  // this.$body.on('submit', 'form', this.handleForm);//delete
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

App.landing = function(e) {
  console.log('landing');
  if (e)  e.preventDefault();
  this.$main.html(`
    <h5>?</h5>
  `);
  this.mapSetup();
};

App.hotels = function(e) {
  console.log('all hotels');
  if (e)  e.preventDefault();
  this.$main.html(`
    <div id="map-canvas"></div>
  `);
  this.mapSetup();
};


App.login = function(e) {
  e.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="/login">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">

        <div class="form-group">
          <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
          <input class="form-control" type="password" name="password" placeholder="Password">
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>`);

  $('.modal').modal('show');
};
// App.login = function(e) {
//   e.preventDefault();
//   this.$main.html(`
//     <h2>Login</h2>
//     <form method="post" action="/login">
//     <div class="form-group">
//       <input class="form-control" type="email" name="email" placeholder="Email">
//     </div>
//     <div class="form-group">
//       <input class="form-control" type="password" name="password" placeholder="Password">
//     </div>
//       <input class="btn btn-primary" type="submit" value="Login">
//     </form>
//     `);
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
    // 51.506178,-0.088369
    center: new google.maps.LatLng(35.823803, 0.289411),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:[{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"lightness":20},{"hue":"#00b3ff"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#e31b1b"},{"lightness":17},{"weight":1.2},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"weight":"0"},{"visibility":"on"},{"color":"#ebebf0"}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#ebebf0"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#ebebf0"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f9ff53"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ecf500"},{"lightness":29},{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ebebf0"},{"lightness":18},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ebebf0"},{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#ebebf0"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#85929e"},{"lightness":"98"}]}]

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
    icon: 'http://wfarm1.dataknet.com/static/resources/icons/set101/cc0f6458.png',
    animation: google.maps.Animation.DROP
  });

  this.addInfoWindowForHotel(hotel, marker);
};

App.addInfoWindowForHotel = function(hotel, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    console.log('open?');
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      // maxWidth: 300,
      content: `<img src="${ hotel.image }"><h4>${ hotel.name }</h4><p>${ hotel.country }</p><p>${ hotel.description }</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(8);

    // map = this.map.map;
    //
    // map.fitBounds(this.map.bounds);
    // zoomChangeBoundsListener =

    google.maps.event.addListenerOnce(App.map, 'bounds_changed', function() {
      if (this.getZoom()){
        this.setZoom(16);
      }
    });
    console.log(this.infoWindow);
    google.maps.event.addListener(App.infoWindow,'closeclick',function(){
      App.map.setCenter(marker.getPosition());
      // App.map.setCenter(mapOptions.getPosition());
      App.map.setZoom(2);
      // console.log('close?');
    });

  });
};


$(App.init.bind(App));
