
function connectFacebook()
{
	document.getElementById("facebook").onclick = function () {
        location.href = "{{ url('social:begin', args=['facebook']) }}";
    };
}