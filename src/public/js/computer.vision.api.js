var apiKey = "6b1ecc4c02fe4745a7c36d2684449d97";
var apiUrl = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
var params = {
            // Request parameters
            "maxCandidates": "1",
        };
        
$('#snap').click(function () {
 	var file = document.getElementById('filename').files[0];
 	CallAPI(file, apiUrl, apiKey);
    


 });
 
navigator.getUserMedia = ( navigator.getUserMedia ||
                        	navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

var video;
var webcamStream;
function startWebcam() {
    if (navigator.getUserMedia) {
		navigator.getUserMedia (
           	{
                video: true,
                audio: false
            },

        	function(localMediaStream) {
                	video = document.querySelector('video');
                	video.src = window.URL.createObjectURL(localMediaStream);
                 	webcamStream = localMediaStream;
              	},

            function(err) {
                 	console.log("The following error occured: " + err);
              	}
        );
    } 
    else {
    	console.log("getUserMedia not supported");
    }  
}

function stopWebcam() {
          webcamStream.stop();
      	}

makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}


function snapshot() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext('2d');
	ctx.drawImage(video, 0,0, canvas.width, canvas.height);
	var dataurl= canvas.toDataURL();
	CallAPI(dataurl, apiUrl, apiKey);
}
setInterval(snapshot,10000);


function CallAPI(file, apiUrl, apiKey)
{	console.log("api called");
	 $.ajax({
            url: "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",apiKey);
            },
			type: "POST",
			data: makeblob(file),
			processData: false
		})

	.done(function (response) {
			ProcessResult(response);
			console.log("done");
	})

	.fail(function (error) {
			$("#response").text(error.getAllResponseHeaders());
            var str= JSON.stringify(error.getAllResponseHeaders())
			console.log(str);
	});
}
 
function ProcessResult(response)
{
	// var data = JSON.parse(response);
    var string= JSON.stringify(response);
    var string = string.substring(1, string.length-1);
    var data= JSON.parse(string);
    console.log(string)   

}