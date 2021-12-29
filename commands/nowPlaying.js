const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require("../client/player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playing')
		.setDescription('Shows the song that is currently playing'),
	async execute(interaction) {
		const queue = player.getQueue(interaction.guildId);

        if (!queue?.playing)
            return interaction.reply({
                content: "No music is currently being played",
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return interaction.reply({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress,
                        },
                    ],
                    color: client.config.clientColor,
                    footer: {
                        text: `Queued by ${queue.current.requestedBy.tag}`,
                    },
                },
            ],
        });
	},
};