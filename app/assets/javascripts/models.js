$(document).ready(function() {
  fetchRecentTweets();

})




//model function
function fetchRecentTweets() {
     var requestPromise = $.ajax({
       url:"/tweets/recent",
       method:"GET",
       })

     .done(function(response){
        console.log(response)
     })
  }
//
// //Controller style function
// // Notice that it uses our model function and our view function!
// function handleRecentTweets() {
//   var promiseFromAjax = fetchRecentTweets();
//
// //Here the controller function attaches something with .done()
// // so that it can use the view when the data comes back.
//   promiseFromAjax.done(function(response) {
//   showRecentTweets(response)
//   })
// }
//
//
// //View style function
// function showRecentTweets(recentTweets) {
//   //  $("#temperature").html("The temperature will be " + weatherInfo.temp)
// }
