const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const player = require("../client/player");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playing')
		.setDescription('Shows the song that is currently playing'),
	async execute(interaction) {
        if (interaction) {
		const queue = player.getQueue(interaction.guildId);

        if (!queue?.playing)
            return interaction.reply({
                content: "No music is currently being played",
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Now Playing")
            .setDescription(`🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`)
            .addField( "\u200b", progress )
            .setFooter(`Queued by ${queue.current.requestedBy.tag}`);

        await interaction.reply({ embeds: [embed] });
        }
	},
};