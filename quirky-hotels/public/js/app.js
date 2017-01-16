"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".hotels").on("click",this.hotels.bind(this)),this.$main.on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.hotels()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.hotels()},App.register=function(e){e&&e.preventDefault(),this.$main.html('\n    <h2>Register</h2>\n    <form method="post" action="/register">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n    </form>\n  ')},App.hotels=function(e){console.log("all hotels"),e&&e.preventDefault(),this.$main.html('\n    <h2>All the Hotels</h2>\n    <div id="map-canvas"></div>\n  '),this.mapSetup()},App.login=function(e){e.preventDefault(),this.$main.html('\n    <h2>Login</h2>\n    <form method="post" action="/login">\n    <div class="form-group">\n      <input class="form-control" type="email" name="email" placeholder="Email">\n    </div>\n    <div class="form-group">\n      <input class="form-control" type="password" name="password" placeholder="Password">\n    </div>\n      <input class="btn btn-primary" type="submit" value="Login">\n    </form>\n    ')},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.handleForm=function(e){console.log("handleForm"),e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),o=$(this).attr("method"),n=$(this).serialize();return App.ajaxRequest(t,o,n,function(e){e.token&&App.setToken(e.token),App.loggedInState()})},App.ajaxRequest=function(e,t,o,n){return $.ajax({url:e,method:t,data:o,beforeSend:this.setRequestHeader.bind(this)}).done(n).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},App.mapSetup=function(){var e=document.getElementById("map-canvas"),t={zoom:2,center:new google.maps.LatLng(51.506178,(-.088369)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"}]},{featureType:"landscape.natural.landcover",elementType:"labels.text.fill",stylers:[{visibility:"on"},{saturation:"42"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text.fill",stylers:[{visibility:"on"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#46bcec"},{visibility:"on"}]}]};this.map=new google.maps.Map(e,t),this.getHotels()},App.loopThroughHotels=function(e){console.log(e),$.each(e,function(e,t){console.log("loopThroughHotels"),setTimeout(function(){App.createMarkerForHotel(t)},50*e)})},App.getHotels=function(){$.get(this.apiUrl+"/hotels").done(this.loopThroughHotels)},App.createMarkerForHotel=function(e){console.log("marker creation");var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:this.map,animation:google.maps.Animation.DROP});this.addInfoWindowForHotel(e,o)},App.addInfoWindowForHotel=function(e,t){var o=this;google.maps.event.addListener(t,"click",function(){"undefined"!=typeof o.infoWindow&&o.infoWindow.close(),console.log("open?"),o.infoWindow=new google.maps.InfoWindow({content:'<img src="'+e.image+'"><p>'+e.name+"</p>"}),o.infoWindow.open(o.map,t),o.map.setCenter(t.getPosition()),o.map.setZoom(15),google.maps.event.addListener(App.addInfoWindowForHotel,"closeclick",function(){console.log("close?")})})},$(App.init.bind(App));