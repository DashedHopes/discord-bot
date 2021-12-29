const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user info!')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to inspect')
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user')
		if (user) {
			await interaction.reply(`Username: ${user.tag}\nID: ${user.id}\n${user.displayAvatarURL(true)}`);
		} else {
			await interaction.reply(`Your username: ${interaction.user.tag}\nYour ID: ${interaction.user.id}\n${interaction.user.displayAvatarURL(true)}`);
		}
	},
};