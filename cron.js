require('dotenv').config()
const { Telegram } = require('telegraf');
const bot = new Telegram(process.env.BOT_TOKEN)
var cron = require('node-cron');

const tweets = require('./components/tweets');

cron.schedule('* * * * *', () => {
tweets.getLastTweetId(function (err, lastTweetId) {
	tweets.getRecentTweets(lastTweetId, function (err, urls) {
		var newLastTweetId = urls && urls.length > 0 ? urls[0].split("/")[5] : null;
		console.log(newLastTweetId);
		tweets.saveLastTweetId(newLastTweetId);
		urls.forEach(function (url) {
			bot.sendMessage(process.env.CHANNEL_USERNAME, url);
		});
	});
});
});