import AutocompleteComponent from '#structure/AutocompleteComponent.mjs';

export default new AutocompleteComponent({
  commandName: 'autocomplete',
  /**
   *
   * @param {DiscordClient} client
   * @param {import('discord.js').AutocompleteInteraction} interaction
   */
  run: async (client, interaction) => {
    const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

    const currentInput = interaction.options.getFocused();
    const filteredFruits = fruits.filter((fruit) => fruit.toLowerCase().startsWith(currentInput.toLowerCase()));

    await interaction.respond(filteredFruits.map((fruit) => ({ name: fruit, value: fruit })));
  },
}).data;
