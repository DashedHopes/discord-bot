const { SlashCommandBuilder } = require('@discordjs/builders');
const player = require("../client/player");
const { QueryType } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Connects to your voice chat and plays a youtube video!')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('the Youtube URL to play')
				.setRequired(true),
		),
	async execute(interaction) {
		const songTitle = interaction.options.getString("input");

		if (!interaction.member.voice.channel)
			return interaction.reply({
				content: "Please join a voice channel!",
			});

		const searchResult = await player.search(songTitle, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		});

		const queue = await player.createQueue(interaction.guild, {
			metadata: interaction.channel,
		});

		if (!queue.connection)
			await queue.connect(interaction.member.voice.channel);

		await interaction.reply({ content: `Playing ${songTitle}` });

		searchResult.playlist
			? queue.addTracks(searchResult.tracks)
			: queue.addTrack(searchResult.tracks[0]);

		if (!queue.playing) await queue.play();

	},
};