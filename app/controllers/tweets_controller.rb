class TweetsController < ApplicationController
  def recent
    Tweet.ordered_json
    tweets = Tweet.ordered_json
    render json: tweets
  end

  def search
    hashtag = Hashtag.where(name: params[:keyword]).first
    if hashtag
      render json: hashtag.tweets.ordered_json
    else
      render :nothing => true, status: 404
    end
  end

  def create
    tweet = TweetService.create_tweet!(tweet_params)
    render json: tweet.to_json(methods: :hashtag_names)
  end

  private

  def tweet_params
    params.require(:tweet).permit( :content, :username, :handle, :avatar_url )
  end
end
