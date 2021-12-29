const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require("../client/player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause the current song'),
	async execute(interaction) {
		const queue = player.getQueue(interaction.guild);

        queue.setPaused(true);

        return interaction.reply({ content: "Paused the current track!" });
	},
};