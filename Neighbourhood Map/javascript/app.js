        
        var map;
      // empty array for markers
      var markers = [];
      var locations = [
          {title: 'Prince Sultan University', id:'52831ef911d24a6f3cb6eea5', location: {lat: 24.734703, lng: 46.696186}},
          {title: 'Hayatt Mall',id:'4b73f92df964a5202ec22de3', location: {lat: 24.743317, lng: 46.680522}},
          {title: 'Panorama Mall', id:'4bb60acd46d4a5932198c5c0', location: {lat: 24.693029, lng: 46.669536}},
          {title: 'Faisaliya Hotel',  id:'b8e8804f964a520332733e3', location: {lat: 24.690507, lng: 46.684123}},
          {title: 'King Fahd International Stadium', id:'518bcfa8498e8caf8a444ba6' , location: {lat: 24.788540, lng: 46.839021}}
          ];
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 24.774265, lng: 46.738586},
          zoom: 11,
          mapTypeControl: false
        });
        // Location List
        var bounds = new google.maps.LatLngBounds();
        var largeInfowindow = new google.maps.InfoWindow();
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var id = locations[i].id;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            map: map,
            position: position,
            id: locations[i].id,
            title: title,
            animation: google.maps.Animation.DROP
            
          });
          // Push the marker to our array of markers.
          bounds.extend(marker.position);

          markers.push(marker);
         //locations[i].location = marker;
           marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
           marker.addListener('click', function() {

          this.setAnimation(google.maps.Animation.BOUNCE);
            
              });
        }
        
      }    

       

          function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
             var clientId = 'KHARCC5ZFU3J0C5E2ZKKWYXGYEYJ152G1TWQAIFSC5IJKXUB';
  			var clientSecret = 'Y1RKB2UB4AODF0M3ONAH2MNK3KEJEEBTMRAK2NMHQ2WDGN0N';
  			var version = '20172510';
  			var forSquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + marker.id + 'client_id=' + clientId + '&client_secret='+ clientSecret + '&v=' + version;


  	$.ajax({
  		url:forSquareUrl

  		}).done(function(data){
  			console.log(data);
  			var address = data.response.venue.location.address;
  			var name = data.response.venue.name;
			infoWindow.setContent('<h3>' + marker.title + '/' + name + '</h3>' + '<p>' + address + '</p>');
  			infoWindow.open(map, marker);
  			

  		}).fail(function(){
  			alert("Error failed to generate API");
  		})
          
          
          infowindow.setContent('<div>' + 'Name :' + marker.title + '<br>' + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
     

    }
     function AppViewModel() {
    this.input = ko.observable("");
    this.locations = ko.observableArray(locations);
    this.title = ko.observable();
    this.marker = ko.observableArray(markers);
    
    this.filteredLocations = ko.computed(function(){
     // console.log(this.input);
      if (this.input() == "")
      return this.locations();

    else {
      var word = this.input().toLowerCase();
      for (var i = 0; i < locations.length; i++) {
        var locationTitle = this.locations()[i].title.toLowerCase();
        


        if (locationTitle.includes(word)){
            this.markers.google.maps.Animation.BOUNCE;

              return this.locations()[i];
        }

      }
          }

        },this);
    this.markerClicked = function (location){
      console.log(location);
      this.google.maps.event.trigger(location.markers, "click");

    };
  
    };
   


 

ko.applyBindings(new AppViewModel());
                              
 function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}

  
