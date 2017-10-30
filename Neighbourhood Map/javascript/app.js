        var map;
      // empty array for markers
      var markers = [];
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 24.774265, lng: 46.738586},
          zoom: 13,
          mapTypeControl: false
        });
        // Location List
        var locations = [
          {title: 'King Saud University', location: {lat: 24.716249, lng: 46.619171}},
          {title: 'The Boulevard Riyadh', location: {lat: 24.750647, lng: 46.613315}},
          {title: 'Al Masaa Cafe', location: {lat: 24.713087, lng: 46.673035}},
          {title: 'Burj Rafal Hotel Kempinski Riyadh', location: {lat: 24.792477, lng: 46.632320}},
          {title: 'King Fahd International Stadium', location: {lat: 24.788540, lng: 46.839021}}
          ];
        var largeInfowindow = new google.maps.InfoWindow();
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
        }
        
      }    
       

          function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      function AppViewModel() {
    this.input = ko.observable("");
    this.locations = ko.observableArray(title);    // Initially an empty array
    //this.title = ko.observableArray(locations[title]);

    this.filter = ko.computed(function(){
            
            }

    }
);
 }
ko.applyBindings(new AppViewModel());
}
                              
 function openNav() {
    document.getElementById("mySidenav").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}