function update_event_feed(events){
        console.log(events.length);
        for(var i = 0; i < events.length; i++){
                var startTime = moment(events[i]["start_time"], "YYYY-MM-DDTHH-mm-ss");
                var endTime = moment(events[i]["end_time"], "YYYY-MM-DDTHH-mm-ss");
                var p_id = "media_frame_" + i;
                var $media_element = $("<div>", {id: p_id, class: "media row"});
                $media_element.append($("<div>", {class: "media-left media-middle m-child"}));
                $media_element.append($("<div>", {class: "media-body m-child"}));
                $media_element.children(".media-body").append("<div class='feed_event_info row m-child'></div>");
                $media_element.find(".feed_event_info").append("<div class='col m-child'>" + events[i]["location"]["coordinates"][0].toPrecision(8) + "\t" + events[i]["location"]["coordinates"][1].toPrecision(8) +
                "</div>" + startTime.format("YY/MM/d HH:mm") + " - " + endTime.format("HH:mm") + "<div class='col m-child'></div><div class='col m-child'></div>")
                $media_element.children(".media-body").append("<p class='m-child'>" + events[i]["description"] + "</p>");
                $.ajax({async: false, url: 'http://localhost:8000/api/profiles/' + events[i]["host"]}
                ).done(function(request){
                        console.log(request);
                        icon_url = "http://graph.facebook.com/" + request.fbid + "/picture?type=small";
                        $media_element.children(".media-left").append("<img src=" + icon_url + " class='media-object m-child' style='width:60px'>");
                        $media_element.children(".media-body").after("<h4 class='media-heading m-child'>" + request.first_name + " " + request.last_name + "</h4>");               //username
                });

                $("#feed_display").append($media_element);
        }
}

$(document).ready(function(){
        $("#feed_display").on("click", ".media", function(){
                var event_id = event.target.id.slice(12);
                window.location.href = "/event/" + event_id;
        });
});
