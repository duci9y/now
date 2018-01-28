var global_event_count = 0;

function pollEvents(location) {
        $.get('/api/events/', 'lat: location.coords.latitude,lng: location.coords.longitude', function (response) {
                console.log(response);
                setTimeout(pollEvents, 5000);
                if(response.length != 0 && response.length != global_event_count){
                        console.log("Updating feed");
                        global_event_count = response.length;
                        update_event_feed(response);
                }
        });
}

$("#btn_allow_location").click(function(){
        var startPos;
        var geoSuccess = function(position) {
                startPos = position;
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
        $("#location_info").text("Lat: " + location.coords.latitude.toPrecision(8) + "; Lon: " + location.coords.longitude.toPrecision(8));
        $("#location_btn_div").remove();
        console.log("POLLING");
        pollEvents(location);
}

function update_event_feed(events){
        console.log(events.length);
        for(var i = 0; i < events.length; i++){
                var startTime = moment(events[i]["start_time"], "YYYY-MM-DDTHH-mm-ss");
                var endTime = moment(events[i]["end_time"], "YYYY-MM-DDTHH-mm-ss");
                $.get('http://localhost:8000/api/profiles/' + events[i]["host"], function(request){
                        console.log(request);
                })

                var p_id = "media_frame_" + i;
                var $media_element = $("<div>", {id: p_id, class: "media row"});
                //this line should also add the profile pic of the user
                $media_element.append($("<div>", {class: "media-left media-middle"}));
                $media_element.append($("<div>", {class: "media-body"}));
                $media_element.children(".media-body").append("<h4 class='media-heading'></h4>");               //username
                $media_element.children(".media-body").append("<div class='feed_event_info row'></div>");
                $media_element.find(".feed_event_info").append("<div class='col'>" + events[i]["location"]["coordinates"][0].toPrecision(8) + "\t" + events[i]["location"]["coordinates"][1].toPrecision(8) +
                                                               "</div>" + startTime.format("YY/MM/d HH:mm") + " - " + endTime.format("HH:mm") + "<div class='col'></div><div class='col'></div>")
                $media_element.children(".media-body").append("<p>" + events[i]["description"] + "</p>");
                $("#feed_display").append($media_element);
        }
}
