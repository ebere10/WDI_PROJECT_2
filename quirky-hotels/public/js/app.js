"use strict";var App=App||{},google=google;App.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),$(".hotels").on("click",this.hotels.bind(this)),$("body").on("submit","form",this.handleForm),this.getToken()?this.loggedInState():this.loggedOutState()},App.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.hotels()},App.loggedOutState=function(){$(".loggedIn").hide(),$(".loggedOut").show(),this.landing()},App.register=function(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="/register">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Register</h4>\n      </div>\n      <div class="modal-body">\n\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n       <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n       <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Register</button>\n      </div>\n    </form>'),$(".modal").modal("show")},App.landing=function(){this.$main.html("\n    <h1>Stay Quirky</h1>\n    <h3></h3>\n    <h6>The website for unusual hotels around the world</h6>\n    ")},App.hotels=function(e){console.log("all hotels"),e&&e.preventDefault(),this.$main.html('\n    <div id="map-canvas"></div>\n  '),this.mapSetup()},App.login=function(e){e&&e.preventDefault(),$(".modal-content").html('\n    <form method="post" action="/login">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n      </div>\n      <div class="modal-body">\n\n        <div class="form-group">\n          <input class="form-control" type="email" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n          <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Login</button>\n      </div>\n    </form>'),$(".modal").modal("show")},App.logout=function(e){e.preventDefault(),this.removeToken(),this.loggedOutState()},App.handleForm=function(e){$(".modal").modal("hide"),console.log("handleForm"),e.preventDefault();var t=""+App.apiUrl+$(this).attr("action"),o=$(this).attr("method"),n=$(this).serialize();return App.ajaxRequest(t,o,n,function(e){e.token&&App.setToken(e.token),App.loggedInState()})},App.ajaxRequest=function(e,t,o,n){return $.ajax({url:e,method:t,data:o,beforeSend:this.setRequestHeader.bind(this)}).done(n).fail(function(e){console.log(e)})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},App.mapSetup=function(){var e=document.getElementById("map-canvas"),t={zoom:2,center:new google.maps.LatLng(29.158613,12.066755),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#747474"},{lightness:"23"}]},{featureType:"poi.attraction",elementType:"geometry.fill",stylers:[{color:"#f38eb0"}]},{featureType:"poi.government",elementType:"geometry.fill",stylers:[{color:"#ced7db"}]},{featureType:"poi.medical",elementType:"geometry.fill",stylers:[{color:"#ffa5a8"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#c7e5c8"}]},{featureType:"poi.place_of_worship",elementType:"geometry.fill",stylers:[{color:"#d6cbc7"}]},{featureType:"poi.school",elementType:"geometry.fill",stylers:[{color:"#c4c9e8"}]},{featureType:"poi.sports_complex",elementType:"geometry.fill",stylers:[{color:"#b1eaf1"}]},{featureType:"road",elementType:"geometry",stylers:[{lightness:"100"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"},{lightness:"100"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffd4a5"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#ffe9d2"}]},{featureType:"road.local",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{weight:"3.00"}]},{featureType:"road.local",elementType:"geometry.stroke",stylers:[{weight:"0.30"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#747474"},{lightness:"36"}]},{featureType:"road.local",elementType:"labels.text.stroke",stylers:[{color:"#e9e5dc"},{lightness:"30"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"},{lightness:"100"}]},{featureType:"water",elementType:"all",stylers:[{color:"#d2e7f7"}]}]};this.map=new google.maps.Map(e,t),this.getHotels()},App.loopThroughHotels=function(e){console.log(e),$.each(e,function(e,t){console.log("loopThroughHotels"),setTimeout(function(){App.createMarkerForHotel(t)},50*e)})},App.getHotels=function(){this.ajaxRequest(this.apiUrl+"/hotels","GET",null,this.loopThroughHotels)},App.createMarkerForHotel=function(e){console.log("marker creation");var t=new google.maps.LatLng(e.lat,e.lng),o=new google.maps.Marker({position:t,map:this.map,icon:"http://wfarm1.dataknet.com/static/resources/icons/set101/cc0f6458.png",animation:google.maps.Animation.DROP});this.addInfoWindowForHotel(e,o)},App.addInfoWindowForHotel=function(e,t){var o=this;google.maps.event.addListener(t,"click",function(){console.log("open?"),"undefined"!=typeof o.infoWindow&&o.infoWindow.close(),o.infoWindow=new google.maps.InfoWindow({content:"<h4>"+e.name+'</h4><img src="'+e.image+'"><p>'+e.country+"</p><p>"+e.description+"</p>"}),o.infoWindow.open(o.map,t),o.map.setCenter(t.getPosition()),o.map.setZoom(8),console.log(o.infoWindow),google.maps.event.addListener(App.infoWindow,"closeclick",function(){App.map.setCenter(t.getPosition()),App.map.setZoom(2)})})},$(App.init.bind(App));