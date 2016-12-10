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
  promiseFromAjax.done(showRecentTweets);
}
//
// View style function
function showRecentTweets(response) {
  for(var i = 0; i < response.length; i++) {
    var user = response[i]
    var template = $('#tweet-template').clone()
    //It clones the html template for each tweet
    template.removeAttr('id')
    //Removes id for JS purposes
    template.removeAttr('style')
    //To display the li
    template.addClass('tweet')
    //Adds a class of tweet

    template.find('.full-name').html(user.username)
    template.find('.username').html(user.handle)
    template.find('.content').html(user.content)
    //This allows you to display the clone template you've created
    $('#tweets-container ul').append(template)

  }
}
