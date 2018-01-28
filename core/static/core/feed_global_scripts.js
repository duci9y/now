// (function pollEvents() {
//         $.getJSON('endpoint_placeholder', 'data_placeholder', function (response) {
//                 setTimeout(pollEvents, 3000);
//         });
// }());
//
// $(document).ready(pollEvents());

$("#btn_allow_location").click(function(){
        var startPos;
        var geoSuccess = function(position) {
                startPos = position;
                console.log(startPos);
                update_location(startPos);
        };
        var geoError = function(error) {
                console.log('Error occurred. Error code: ' + error.code);
                // error.code can be:
                //   0: unknown error
                //   1: permission denied
                //   2: position unavailable (error response from location provider)
                //   3: timed out
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
})

function update_location(location){
        $("#location_info").text("Lat: " + location.coords.latitude + "; Lon: " + location.coords.longitude);
        $("#location_btn_div").remove();
}
