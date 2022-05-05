const Twitter = require("twitter");
require('dotenv').config()


const twitter = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_SECRET
});
const fs = require('fs');

module.exports.getRecentTweets = function (lastTweetId, callback) {

	twitter.get("statuses/user_timeline", {
		screen_name: process.env.USER_NAME,
		count: 1,
		trim_user: true,
		since_id: lastTweetId
	}, function (error, tweets, response) {
		if (error) return callback(error);
		let urls = [];
		console.log({
			len: tweets.length
		});
		tweets.forEach(function (tweet) {
			urls.push(`https://twitter.com/${process.env.USER_NAME}/status/${tweet.id_str}`);
		});
		return callback(null, urls);
	});
};

module.exports.getLastTweetId = function (callback) {
	fs.readFile("lastTweetId.txt", function read(err, data) {
		if (err) {
			console.log(err);
			callback(err);
		} else {
			callback(null, data);
		}
	});
}

module.exports.saveLastTweetId = function (tweetId) {
	if (!tweetId) return false; // Don't save in case null is passed
	fs.writeFile("lastTweetId.txt", tweetId, function (err) {
		if (err) console.log(err);
	});
}