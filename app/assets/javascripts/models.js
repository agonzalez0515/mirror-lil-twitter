$(document).ready(function() {
  handleRecentTweets();
})

//model function
function fetchRecentTweets(){
  var requestPromise = $.ajax({
    url:"/tweets/recent",
    method:"GET"
  })
  // console.log(requestPromise)
  return requestPromise
}


// Controller style function
// Notice that it uses our model function and our view function!
function handleRecentTweets() {
  var promiseFromAjax = fetchRecentTweets();

//Here the controller function attaches something with .done()
// so that it can use the view when the data comes back.
  promiseFromAjax.done(function(response) {
    for(var i=0; i < response.length; i++){
      console.log(response[i])
    }

  })
}

// //
// // //View style function
// // function showRecentTweets(recentTweets) {
// //    $("#tweets-container").html("The temperature will be " + weatherInfo.temp)
// // }
