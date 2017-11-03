        var map;
        // empty array for markers
        var markers = [];
        var locations = [{
                title: 'Prince Sultan University',
                id: '52831ef911d24a6f3cb6eea5',
                location: {
                    lat: 24.734703,
                    lng: 46.696186
                }
            },
            {
                title: 'Hayatt Mall',
                id: '4b73f92df964a5202ec22de3',
                location: {
                    lat: 24.743317,
                    lng: 46.680522
                }
            },
            {
                title: 'Panorama Mall',
                id: '4bb60acd46d4a5932198c5c0',
                location: {
                    lat: 24.693029,
                    lng: 46.669536
                }
            },
            {
                title: 'Faisaliya Hotel',
                id: 'b8e8804f964a520332733e3',
                location: {
                    lat: 24.690507,
                    lng: 46.684123
                }
            },
            {
                title: 'King Fahd International Stadium',
                id: '518bcfa8498e8caf8a444ba6',
                location: {
                    lat: 24.788540,
                    lng: 46.839021
                }
            }
        ];

        function initMap() {
            // Constructor creates a new map - only center and zoom are required.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 24.774265,
                    lng: 46.738586
                },
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

                locations[i].location = marker;
                marker.addListener('click', addListener);




            }

            function addListener() {
                populateInfoWindow(this, largeInfowindow);
                this.setAnimation(google.maps.Animation.BOUNCE);
                bounceTimer(this, marker);

            }

            function bounceTimer(marker) {
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 700);
            }
        }




        function populateInfoWindow(marker, infowindow) {
            // Check to make sure the infowindow is not already opened on this marker.
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                var name, address;
                var clientId = 'KHARCC5ZFU3J0C5E2ZKKWYXGYEYJ152G1TWQAIFSC5IJKXUB';
                var clientSecret = 'Y1RKB2UB4AODF0M3ONAH2MNK3KEJEEBTMRAK2NMHQ2WDGN0N';
                var version = '20172510';
                var venueID = marker.id;

                var forSquareUrl = 'https://api.foursquare.com/v2/venues/search?v=' + version + '&ll=' + marker.position.lat() + ',' + marker.position.lng() + '&intent=checkin&' + '&client_id=' + clientId + '&client_secret=' + clientSecret;
                $.ajax({
                        url: forSquareUrl,
                        dataType: 'json'
                    })


                    .done(function(data) {
                        console.log(data);
                        address = data.response.venues[0].location.address || 'No address provided';
                        name = data.response.venues[0].name || 'No name provided';
                        // name = data.response.venues[0].name;
                        // address = data.response.venues[0].location.address;

                        infowindow.setContent('<div>' + 'Name :' + name + '/' + marker.title + '<br>' + ' Address : ' + address + '</div>');
                        infowindow.open(map, marker);
                    })
                    .fail(function() {
                        alert("Error failed to generate API");
                    });


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


            this.filteredLocations = ko.computed(function() {
                // console.log(this.input);
                var filter = this.input().toLowerCase();
                if (!filter) {

                    return this.locations();
                } else {
                    return ko.utils.arrayFilter(this.locations(), function(locations) {
                        locations.location.setVisible(locations.title.toLowerCase().indexOf(filter) != -1);
                        return locations.title.toLowerCase().indexOf(filter) != -1;
                    });
                }
            }, this);
            this.markerClicked = function(marker) {
                // it's showing in the console.log but not on the map
                console.log(google);
                console.log(locations, marker);
                google.maps.event.trigger(marker.location, "click");


            };

        }


        // function forSquare (marker , infowindow){




        //  }
        function errorHandling() {
            alert(" Google Maps has failed to load ");
        }



        ko.applyBindings(new AppViewModel());

        function openNav() {
            document.getElementById("mySidenav").style.display = "block";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.display = "none";
        }
