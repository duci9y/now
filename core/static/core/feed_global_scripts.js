var global_event_count = 0;

function pollEvents(location) {
        $.get('/api/events/', 'lat: location.coords.latitude,lng: location.coords.longitude', function (response) {
                console.log(response);
                setTimeout(pollEvents, 5000);
                if(response.length != 0 && response.length != global_event_count){
                        console.log("Updating feed");
                        global_event_count = response.length;
                        $("#feed_display").empty();
                        update_event_feed(response);
                }
        });
}

function getPosition(){
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
}

$(document).ready(function(){
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
                if (result.state === 'granted') {
                        getPosition();
                }
                // else if (result.state === 'prompt') {
                //
                // }
          // Don't do anything if the permission was denied.
        });
});

$("#btn_allow_location").click(getPosition());

function update_location(location){
        $("#location_info").text("Lat: " + location.coords.latitude.toPrecision(8) + "; Lon: " + location.coords.longitude.toPrecision(8));
        $("#location_btn_div").remove();
        console.log("POLLING");
        pollEvents(location);
}

//might be a better idea constructing the elements then filling in data
function update_event_feed(events){
        console.log(events.length);
        for(var i = 0; i < events.length; i++){
                var startTime = moment(events[i]["start_time"], "YYYY-MM-DDTHH-mm-ss");
                var endTime = moment(events[i]["end_time"], "YYYY-MM-DDTHH-mm-ss");
                var p_id = "media_frame_" + (i + 1);
                var $media_element = $("<div>", {id: p_id, class: "media row"});
                //this line should also add the profile pic of the user
                $media_element.append($("<div>", {class: "media-left media-middle m-child"}));
                $media_element.append($("<div>", {class: "media-body m-child"}));
                $media_element.children(".media-body").append("<div class='feed_event_info row m-child'></div>");
                $media_element.find(".feed_event_info").append("<div class='col m-child'>close to " + events[i]["location_name"] +
                "</div>" + startTime.format("YY/MM/d HH:mm") + " - " + endTime.format("HH:mm") + "<div class='col m-child'></div><div class='col m-child'></div>")
                $media_element.children(".media-body").append("<p class='m-child'>" + events[i]["description"] + "</p>");
                $.ajax({async: false, url: '/api/profiles/' + events[i]["host"]}
                ).done(function(request){
                        console.log(request);
                        icon_url = "http://graph.facebook.com/" + request.fbid + "/picture?type=small";
                        $media_element.children(".media-left").append("<img src=" + icon_url + " class='media-object m-child' style='width:60px'>");
                        $media_element.children(".media-body").after("<h4 class='media-heading m-child'>" + request.first_name + " " + request.last_name + "</h4>");               //username
                });

                $("#feed_display").append($media_element);
        }
}

//okay this link shit is shoddy af
$(document).ready(function(){
        $("#feed_display").on("click", ".media", function(){
                var event_id = event.target.id.slice(12);
                window.location.href = "/event/" + event_id;
        });
});
