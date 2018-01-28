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

$(document).ready(function(){
        var request_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat.toPrecision(8) + ',' + lng.toPrecision(8) + "&key=AIzaSyCECGPK1S7gGkDq-hzbQOXIanEu6kxk738";
        $.get(request_url).done(function(request){
                var address = request.results[0].formatted_address;
                $("#address").text('📍 close to: ' + address);
        });

});

$(".button_connect").click(function(event){
        window.location.href = "https://facebook.com/" + fbid;
});
// var connect_url = "PLACEHOLDER"
// $.ajax(connect_url, {
//         method : "GET",
//         data: { eventID: placeholder }
// }).done(function(){
//         console.log("Successfully done request");
// }).fail(function(){
//         console.error("Error on request");
// });
