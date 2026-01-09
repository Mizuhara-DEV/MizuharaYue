import { PermissionsBitField, ChannelType, MessageFlags } from 'discord.js';

import { commands, messages } from '#configs/config.mjs';
import { error } from '#utils/Console.mjs';
import MessageCommand from '#structure/MessageCommand.mjs';
import ApplicationCommand from '#structure/ApplicationCommand.mjs';
import { handleMessageCommandOptions, handleApplicationCommandOptions } from './CommandOptions.mjs';

export default class CommandsListener {
  /**
   *
   * @param {DiscordClient} client
   */
  constructor(client) {
    client.on('messageCreate', async (message) => {
      if (message.author.bot || message.channel.type === ChannelType.DM) return;

      if (!commands.message_commands) return;

      let prefix = commands.prefix;

      if (client.database.guild.has('prefix-' + message.guild.id)) {
        prefix = client.database.guild.get('prefix-' + message.guild.id);
      }

      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(/\s+/g);
      const commandInput = args.shift().toLowerCase();

      if (!commandInput.length) return;

      /** @type {MessageCommand['data']} */
      const command =
        client.collection.message_commands.get(commandInput) ||
        client.collection.message_commands.get(client.collection.message_commands_aliases.get(commandInput));

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleMessageCommandOptions(message, command.options, command.command);

          if (!commandContinue) return;
        }

        if (
          command.command?.permissions &&
          !message.member.permissions.has(PermissionsBitField.resolve(command.command.permissions))
        ) {
          await message.reply({
            content: messages.MISSING_PERMISSIONS,
            // @ts-ignore
            flags: MessageFlags.Ephemeral,
          });

          return;
        }

        command.run(client, message, args);
      } catch (err) {
        error(err);
      }
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      if (!commands.application_commands.chat_input && interaction.isChatInputCommand()) return;
      if (!commands.application_commands.user_context && interaction.isUserContextMenuCommand()) return;
      if (!commands.application_commands.message_context && interaction.isMessageContextMenuCommand()) return;

      /** @type {ApplicationCommand['data']} */
      const command = client.collection.application_commands.get(interaction.commandName);

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleApplicationCommandOptions(interaction, command.options, command.command);

          if (!commandContinue) return;
        }

        // @ts-ignore
        command.run(client, interaction);
      } catch (err) {
        error(err);
      }
    });
  }
}
