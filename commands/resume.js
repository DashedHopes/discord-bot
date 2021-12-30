const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require("../client/player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current song'),
	async execute(interaction) {
		const queue = player.getQueue(interaction.guildId);

        queue.setPaused(false);

        return interaction.reply({ content: "Resumed the current track!" });
	},
};