const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require("../client/player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the current song'),
	async execute(interaction) {
		const queue = player.getQueue(interaction.guildId);
        if (!queue?.playing)
            return interaction.reply({
                content: "No music is currently being played",
            });

        await queue.skip();

        interaction.reply({ content: "Skipped the current track!" });
	},
};