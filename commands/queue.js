const player = require("../client/player");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() 
    .setName('queue')
    .setDescription('display the song queue'),
    async execute (interaction) {
        if (interaction) {
            await interaction.deferReply();
            const queue = player.getQueue(interaction.guildId);
            if (!queue?.playing)
                return interaction.editReply({
                    content: "No songs are currently playing",
                });

            const currentTrack = queue.current;
            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `${i + 1}. [**${m.title}**](${m.url}) - ${
                    m.requestedBy.tag
                }`;
            });

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Song Queue")
                .setDescription(`${tracks.join("\n")}${
                    queue.tracks.length > tracks.length
                        ? `\n...${
                            queue.tracks.length - tracks.length === 1
                                ? `${
                                    queue.tracks.length - tracks.length
                                } more track`
                                : `${
                                    queue.tracks.length - tracks.length
                                } more tracks`
                        }`
                    : ""
                }`)
                .addField( "Now Playing", `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}` );
        
            await interaction.editReply({ embeds: [embed]});
        }
    },
};