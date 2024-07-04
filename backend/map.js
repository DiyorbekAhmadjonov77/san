function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.749483, 72.310386),
    zoom: 13,
  };

  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var marker;

  google.maps.event.addListener(map, "click", function (event) {
    updateMarkerPosition(event.latLng.lat(), event.latLng.lng(),false);
  });

  // Create a custom control button on the map
  var chooseLocationControl = document.createElement("div");
  chooseLocationControl.style.backgroundColor = "#fff";
  chooseLocationControl.style.border = "2px solid #fff";
  chooseLocationControl.style.borderRadius = "2px";
  chooseLocationControl.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  chooseLocationControl.style.cursor = "pointer";
  chooseLocationControl.style.marginBottom = "22px";
  chooseLocationControl.style.width = "40px";
  chooseLocationControl.style.height = "40px";
  chooseLocationControl.style.marginRight = "10px";
  chooseLocationControl.style.textAlign = "center";
  chooseLocationControl.style.display = "flex";
  chooseLocationControl.style.justifyContent = "center";
  chooseLocationControl.style.alignItems = "center";
  chooseLocationControl.style.fontSize = "30px";
  chooseLocationControl.title = "Choose My Location";
  chooseLocationControl.innerHTML = "<i class='icofont-location-pin'></i>";
  
  // Add the custom control to the map
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(chooseLocationControl);

  // Add click event listener to the custom control
  chooseLocationControl.addEventListener("click", function () {
    getUserLocation();
  });

  function updateMarkerPosition(lat, lng,is_should_update) {
    if (!marker) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
      });
    } else {
      marker.setPosition(new google.maps.LatLng(lat, lng));
    }

    USER_LAT = lat;
    USER_LNG = lng;

    // Update the map center to the user's location
    if(is_should_update){
      map.setCenter(new google.maps.LatLng(lat, lng));
    }
  }

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var userLat = position.coords.latitude;
          var userLng = position.coords.longitude;
          // console.log("User's Location:", userLat, userLng);
          console.log(position)

          updateMarkerPosition(userLat, userLng,true);
        },
        function (error) {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
}

myMap();