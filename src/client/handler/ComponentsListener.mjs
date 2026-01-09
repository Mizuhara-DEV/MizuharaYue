import { messages } from '#configs/config.mjs';
import { error } from '#utils/Console.mjs';
import { MessageFlags } from 'discord.js';

export default class ComponentsListener {
  /**
   *
   * @param {DiscordClient} client
   */
  constructor(client) {
    client.on('interactionCreate', async (interaction) => {
      const checkUserPermissions = async (component) => {
        if (interaction.type !== 4 && interaction.type != 2) {
          const [_, ownerId] = interaction.customId.split(':');
          if (component.options?.public === false && interaction.user.id !== ownerId) {
            await interaction.reply({
              content: messages.COMPONENT_NOT_PUBLIC,
              flags: MessageFlags.Ephemeral,
            });

            return false;
          }
        }

        return true;
      };

      try {
        if (interaction.isButton()) {
          const component = [...client.collection.components.buttons.values()].find((cpt) =>
            interaction.customId.startsWith(cpt.customId)
          );

          if (!component) return;

          if (!(await checkUserPermissions(component))) return;

          try {
            component.run(client, interaction);
          } catch (err) {
            error(err);
          }

          return;
        }

        if (interaction.isAnySelectMenu()) {
          const component = [...client.collection.components.selects.values()].find((cpt) =>
            interaction.customId.startsWith(cpt.customId)
          );

          if (!component) return;

          if (!(await checkUserPermissions(component))) return;

          try {
            component.run(client, interaction);
          } catch (err) {
            error(err);
          }

          return;
        }

        if (interaction.isModalSubmit()) {
          const component = [...client.collection.components.modals.values()].find((cpt) =>
            interaction.customId.startsWith(cpt.customId)
          );

          if (!component) return;

          try {
            component.run(client, interaction);
          } catch (err) {
            error(err);
          }

          return;
        }

        if (interaction.isAutocomplete()) {
          const component = client.collection.components.autocomplete.get(interaction.commandName);

          if (!component) return;

          try {
            component.run(client, interaction);
          } catch (err) {
            error(err);
          }

          return;
        }
      } catch (err) {
        error('[ComponentsListener]', err);
      }
    });
  }
}
