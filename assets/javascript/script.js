function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
 
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgcbe1F3XQc08C0CeyHnIfkJEpM6wn7nM",
    authDomain: "project1-4a6c1.firebaseapp.com",
    databaseURL: "https://project1-4a6c1.firebaseio.com",
    projectId: "project1-4a6c1",
    storageBucket: "project1-4a6c1.appspot.com",
    messagingSenderId: "115161899919"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // Setting initial value of our click counter variable to 0
  var clickCounter = 0;

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // Add to clickCounter
      clickCounter++;

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      database.ref().set({
        clickCount: clickCounter
      });

    // MAIN PROCESS + INITIAL CODE
    // --------------------------------------------------------------------------------

    // Using .on("value", function(snapshot)) syntax will retrieve the data
    // from the database (both initially and every time something changes)
    // This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
    database.ref().on("value", function(snapshot) {

      // Then we console.log the value of snapshot
      console.log(snapshot.val());

      // Then we change the html associated with the number.
      $("#clicks").text("Hobbies Searched: " + snapshot.val().clickCount);

      // Then update the clickCounter variable with data from the database.
      clickCounter = snapshot.val().clickCount;

      // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
      // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    
    });
       //prepare the request
       var request = gapi.client.youtube.search.list({
           part: "snippet",
           type: "video",
           q: encodeURIComponent($("#hobbySearch").val()).replace(/%20/g, "+"),
           maxResults: 3,
           order: "viewCount",
           publishedAfter: "2005-01-01T00:00:00Z"
       });
       //execute the request
       request.execute(function(response) {
           var results = response.result;
           $.each(results.items, function(index, item) {
                $.get("item.html", function(data) {
                    $("#youtube").append(tplawesome(data, [{"title":item.snippet.title, "videoId":item.id.videoId}]));
                });   
                console.log(results)
                //$("#youtube").append(item.id.videoId+" "+item.snippet.title+ "<br>");
           });
        });

        var store = $('#storeSearch').val();
        var location = $('#locationSearch').val();

        var settings = {
          async: true,
          crossDomain: true,
          url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + store + '&location=' + location + '&limit=3',
          method: 'GET',
          headers: {
            Authorization: 'Bearer x0DthcS8vY40RH1ub7L304JcXg93fjOKvrR5g2UTfto-iAodtfYFt5wN43sWmC_z23Gg-PcBHld_XSNiR3mNwWK8xSqL2xXRoi_XDMsHA92Zj8-SougcpgkpE0SxW3Yx',
          },
        };
  
        $.ajax(settings).done(function (response) {
  
          
          var yelpDiv = $('.yelp');
  
          // Storing the rating data
          var name = response.businesses[0].name;
  
          // Creating an element to have the rating displayed
          var pOne = $('<p>').text('Business Name: ' + name);
  
          // Displaying the rating
          yelpDiv.append(pOne);
  
          // Storing the release year
          var location = response.businesses[0].location.address1;
  
          // Creating an element to hold the release year
          var pTwo = $('<p>').text('Business Address: ' + location);
  
          // Displaying the release year
          yelpDiv.append(pTwo);
  
          // Storing the plot
          var phone1 = response.businesses[0].phone;
  
          // Creating an element to hold the plot
          var pThree = $('<p>').text('Business Phone: ' + phone1);
  
          yelpDiv.append(pThree);
  
          var ratings1 = response.businesses[0].rating;
  
          var pFour = $('<p>').text('Business Rating: ' + ratings1);
  
          yelpDiv.append(pFour);
  
  
  
  
  
          //$('.yelp').text('Business Name: ' + response.businesses[0].name);
          //$('.yelp').text('Buusiness Address: ' + response.businesses[0].location);
          //$('.yelp').text('Business Phone: ' + response.businesses[0].phone);
          //$('.yelp').text('Business Ratings: ' + response.businesses[0].rating);
          console.log(response);
       });
    });
});

function init() {
    gapi.client.setApiKey("AIzaSyClSWv2vBYGa6jSVl0ntBwpxJ6M1bK1TVo")
    gapi.client.load("youtube", "v3", function() {
        //youtube API is ready
    })
}