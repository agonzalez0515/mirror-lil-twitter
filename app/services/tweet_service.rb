module TweetService
  HASHTAG_REGEX = /(?:\s|^)(?:#(?!(?:\d+|\w+?_|_\w+?)(?:\s|$)))(\w+)(?=\s|$)/i

  def self.create_tweet!(params)
    Tweet.new(params).tap do |tweet|

      tweet.content ||= Faker::Lorem.sentence
      tweet.username ||= Faker::Name.name
      tweet.handle ||= "@" + Faker::Internet.user_name
      tweet.avatar_url ||= Faker::Avatar.image(tweet.username)

      tweet.save

      hashtags_names = params[:content].scan(HASHTAG_REGEX).uniq.flatten

      hashtags_names.each do |name|
        tweet.hashtags << Hashtag.where(name: name).first_or_create
      end
    end
  end
end
