$(document).ready(function() {
    handleRecentTweets();
    handlePopularHashtags();
    $('#tweet-form').on('submit', createTweet)
})

function fetchRecentTweets() {
    var requestPromise = $.ajax({url: "/tweets/recent", method: "GET"})
    // console.log(requestPromise)
    return requestPromise
}

function handleRecentTweets() {
    var promiseFromAjax = fetchRecentTweets();
    promiseFromAjax.done(showRecentTweets);
}


function showRecentTweets(response) {
    for (var i = 0; i < response.length; i++) {
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
        template.find('.avatar').attr('src', user.avatar_url)
        //This allows you to display the clone template you've created
        $('#tweets-container ul').append(template)
    }
}
/////////////////////////////////////////////////////////////////////////////
function fetchPopularHashtags() {
    var requestPromise = $.ajax({url: "hashtags/popular", method: "GET"})
    return requestPromise
}

function handlePopularHashtags() {
    var promiseFromAjax = fetchPopularHashtags();
    promiseFromAjax.done(showPopularHashtags);
}

function showPopularHashtags(response) {
    for (var i = 0; i < response.length; i++) {
        var hashtag = response[i].name

        $('#trends-container').find('ul').append("<li>" + hashtag + "</li>");
    }
}

///////////////////////////////////////////////////////////////////////////

function createTweet() {
  event.preventDefault();

  var data = $('#tweet-form').serialize()

  var params = {
    url: "/tweets",
    method: "post",
    data: data
  }

  var requestPromise = $.ajax(params).done(showNewTweet);
}

function showNewTweet(response) {
  //  console.log(response)

        var tweet = response
        var template = $('#tweet-template').clone()
        template.removeAttr('id')
        template.removeAttr('style')
        template.addClass('tweet')

        template.find('.full-name').html(tweet.username)
        template.find('.username').html(tweet.handle)
        template.find('.content').html(tweet.content)
        template.find('.avatar').attr('src', tweet.avatar_url)
        //This allows you to display the clone template you've created
        $('#tweets-container ul').prepend(template)

}
