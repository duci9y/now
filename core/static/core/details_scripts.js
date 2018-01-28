//Maps API Key: AIzaSyCECGPK1S7gGkDq-hzbQOXIanEu6kxk738
function initMap(){
        console.log("Initializing map");
        console.log(lat + " " + lng);
        var uluru = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

console.log(location);

// var connect_url = "PLACEHOLDER"
// $.ajax(connect_url, {
//         method : "GET",
//         data: { eventID: placeholder }
// }).done(function(){
//         console.log("Successfully done request");
// }).fail(function(){
//         console.error("Error on request");
// });
