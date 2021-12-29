const { Player } = require("discord-player");
const client = require("../init.js");

module.exports = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	},
});
