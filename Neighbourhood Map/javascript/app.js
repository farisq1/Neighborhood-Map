        
        var map;
      // empty array for markers
      var markers = [];
      var locations = [
          {title: 'Prince Sultan University', location: {lat: 24.734703, lng: 46.696186}},
          {title: 'Hayatt Mall', location: {lat: 24.743317, lng: 46.680522}},
          {title: 'Panorama Mall', location: {lat: 24.693029, lng: 46.669536}},
          {title: 'Faisaliya Hotel',  id:'b8e8804f964a520332733e3', location: {lat: 24.690507, lng: 46.684123}},
          {title: 'King Fahd International Stadium', location: {lat: 24.788540, lng: 46.839021}}
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
          var lat = locations[i].location.lat;
          var lng = locations[i].location.lng;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            map: map,
            position: position,
            lat: lat,
            lng, lng,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
            
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
               
              var id = locations.id;
              var client_id = 'KHARCC5ZFU3J0C5E2ZKKWYXGYEYJ152G1TWQAIFSC5IJKXUB';
              var client_secret = 'Y1RKB2UB4AODF0M3ONAH2MNK3KEJEEBTMRAK2NMHQ2WDGN0N';
              var venueId = "457985253";
              var forSquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +id+'client_id='+client_id+'&client_secret='+client_secret;
              console.log(forSquareUrl);
          $.ajax( {
              url:forSquareUrl ,
              dataType: 'json'
});           
            function success(data) {
             
                $('.message').html('');
                
            }

            function fail() {
              alert('Request failed');
    }

          
          
          infowindow.setContent('<div>' + 'Name :' +  marker.title + '<br>' + ' Address : ' + marker.position + '</div>');
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

              return this.locations()[i];
        }

      }
          }

        },this);
    this.markerClicked = function (location){
      console.log(location);
      this.google.maps.event.trigger(location.markers, "click");

    };
  
    }

            
  

 ko.applyBindings(new AppViewModel());


                              
 function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}
