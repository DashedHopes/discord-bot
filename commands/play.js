const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
});

const subscription = connection.subscribe(audioPlayer);

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
		await interaction.reply(`Server name: ${interaction.guild.name}` +
			`\nTotal members: ${interaction.guild.memberCount}` +
			`\nCreated at: ${interaction.guild.createdAt}` +
			`\nVerification level: ${interaction.guild.verificationLevel}`);
	},
};