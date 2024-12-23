const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('This unlocks the (specific) channel in your server')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel that you want to unlock in your server')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: "You don't have permission to execute/use this command", ephemeral: true });
        }

        let channel = interaction.options.getChannel('channel');

        if (channel.type !== ChannelType.GuildText) {
            return await interaction.reply({ content: "Please select a valid text channel.", ephemeral: true });
        }

        await channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true });

        const embed = new EmbedBuilder()
            .setColor(0x0089D8)
            .setTitle('Channel Unlocked')
            .setDescription(`${channel} has successfully been **unlocked!**`)
            .setFooter({ text: 'Secury ©' });

        await interaction.reply({ embeds: [embed] });
    }
};
