
function pushData()
{
	alert("Posted");
var accountInfo = {
        "Name": "Testing Jquery with Rest"
    };
    var accountInfoJson = JSON.stringify(accountInfo);
    $j.ajax({
        type: "POST",
        url: "{{ url('event-list') }}",
        headers: {
            'Authorization': "OAuth " + sessionId,
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        data: JSON.stringify(accountInfo),
        dataType: 'json',
        success: function(responseData, status, xhr) {
            console.log(responseData);
        },
        error: function(request, status, error) {
            console.log(request.responseText);
        }
    });

    //var response = JSON.parse(xhttp.responseText);
}
