const App = App || {};
const google = google;
// const Hotel = require('../models/hotel');


App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');

  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.hotels').on('click', this.hotels.bind(this));
  $('body').on('submit', 'form', this.handleForm);
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
  // this.hotels(); //add back in if below doesn't work
  this.landing();
};

App.register = function(e) {
  if (e) e.preventDefault();

  $('.modal-content').html(`
    <form method="post" action="/register">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">

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


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>`);

  $('.modal').modal('show');
};

App.landing = function(){
  this.$main.html(`
    <h1>Stay Quirky</h1>
    <h3></h3>
    <h6>The website for unusual hotels around the world</h6>
    `);
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
  if (e) e.preventDefault();

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

App.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.handleForm = function(e){
  // Check if one is open?
  $('.modal').modal('hide');

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
    center: new google.maps.LatLng(29.158613, 12.066755),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:[{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"23"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#f38eb0"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#ced7db"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#ffa5a8"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#c7e5c8"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"color":"#d6cbc7"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#c4c9e8"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#b1eaf1"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":"100"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"100"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffd4a5"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffe9d2"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"weight":"3.00"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"weight":"0.30"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"36"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#e9e5dc"},{"lightness":"30"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":"100"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d2e7f7"}]}]

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
  this.ajaxRequest(`${this.apiUrl}/hotels`, 'GET', null, this.loopThroughHotels);
};

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
      content: `<h4>${ hotel.name }</h4><img src="${ hotel.image }"><p>${ hotel.country }</p><p>${ hotel.description }</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(8);

    console.log(this.infoWindow);
    google.maps.event.addListener(App.infoWindow,'closeclick',function(){
      App.map.setCenter(marker.getPosition());
      App.map.setZoom(2);
    });

  });
};


$(App.init.bind(App));
