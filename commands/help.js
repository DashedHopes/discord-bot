const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays a list of useful commands'),
	async execute(interaction) {

        //TODO http://discohook.org goeie websites om embeds te designen
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Commands");
        
        await interaction.reply({ embeds: [embed] });
	},
};