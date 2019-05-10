/* Magic Mirror
 * Module: MMM-ApexLegends
 *
 * By Johan Persson, https://github.com/retroflex
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const rp = require('request-promise');
const baseURL = ' https://apextab.com/api/player.php?aid=';

module.exports = NodeHelper.create({
	start: function() {
		//console.log('Starting node_helper for: ' + this.name);
	},

	// Extracts JSON into the relevant stats.
	// JSON contains these (amongst others):
	//   json.name
	//   json.level
	//   json.kills
	//   json.globalrank
	//   json.headshots (would like to include, but returns 0 a lot)
	//   json.matches   (would like to include, but returns 0 a lot)
	//   json.damage    (would like to include, but returns 0 a lot)
	// @param json - The full JSON for the user.
	// @return Object with stats we want to show.
	extractStats: function(json) {

		const stats = { username: json.name,
		                level: json.level,
		                kills: json.kills,
		                globalRank: json.globalrank };
		return stats;
	},

	// Gets Apex Legends user stats from API and adds them to an array.
	// Each item in the array contains username / level / kills / globalRank.
	// The stats are the total for all seasons and all game modes.
	// The array is then sent to the client (to MMM-ApexLegends.js).
	// @param userIDs - String array of user ID's.
	getStats: function(payload) {
		let identifier = payload.identifier;
		let userIDs = payload.userIDs;

		let promises = [];
		for (let i = 0; i < userIDs.length; ++i) {
			const userURL = baseURL + userIDs[i];
			const options = {uri: userURL};
			promises.push(rp(options));
		}

		Promise.all(promises).then((contents) => {
			let stats = [];

			for (let i = 0; i < contents.length; ++i) {
				const content = contents[i];
				const json = JSON.parse(content);
				
				const stat = this.extractStats(json);
				stats.push(stat);
			}

			// Always sort by global rank first. Good if the column to sort on have equal values.
			stats.sort((a, b) => Number(a.globalRank) - Number(b.globalRank));
				
			if ('level' === payload.sortBy)
				stats.sort((a, b) => Number(b.level) - Number(a.level));
			if ('kills' === payload.sortBy)
				stats.sort((a, b) => Number(b.kills) - Number(a.kills));

			this.sendSocketNotification('STATS_RESULT', {identifier: identifier, stats: stats} );
		}).catch(err => {
			console.log(this.name + ' error when fetching data: ' + err);
		});
	},

	// Listens to notifications from client (from MMM-ApexLegends.js).
	// Client sends a notification when it wants download new stats.
	// @param payload - String array of user ID's.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_STATS') {
			this.getStats(payload);
		}
	}

});
