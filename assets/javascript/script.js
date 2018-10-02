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
