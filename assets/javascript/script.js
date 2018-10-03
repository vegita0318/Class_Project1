function onClientLoad() {
    gapi.client.load ("youtube", "v3", onYouTubeApiLoad);

function onYouTubeApiLoad() {
    gapi.client.setApiKey(AIzaSyAPms7c3DCkEBQP8sJwp4vpCBPoV61oQTc);

    function search() {
        var query = document.getElementById('query').value;
        var request = gapi.client.youtube.search.list ({
            part: 'snippet',
            q:query,
        });
        request.execute(onSearchResponse);
    }
function onSearchResponse(response) {
    var responseString = JSON.stringify(response, '', 3);
    document.getElementById('response').innerHTML = responseString;
}

//yelp code below still nneds to add phone, address ect...

var settings = {
  async: true,
  crossDomain: true,
  url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco',
  method: 'GET',
  headers: {
    Authorization: 'Bearer x0DthcS8vY40RH1ub7L304JcXg93fjOKvrR5g2UTfto-iAodtfYFt5wN43sWmC_z23Gg-PcBHld_XSNiR3mNwWK8xSqL2xXRoi_XDMsHA92Zj8-SougcpgkpE0SxW3Yx',
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
