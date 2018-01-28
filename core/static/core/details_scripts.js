//Maps API Key: AIzaSyCECGPK1S7gGkDq-hzbQOXIanEu6kxk738
function initMap(){
        console.log("Initializing map");
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

var connect_url = "PLACEHOLDER"
$.ajax(connect_url, {
        method : "GET",
        data: { eventID: placeholder }
}).done(function(){
        console.log("Successfully done request");
}).fail(function(){
        console.error("Error on request");
});
