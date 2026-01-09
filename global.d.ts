import _DiscordBot from '#client/DiscordBot.mjs';
import _ModelCentral from '#model/central/ModelCentral.mjs';
import _ModelAccount from '#model/user/ModelAccount.mjs';
import _Component from '#structure/Component.mjs';
import * as _Discord from 'discord.js';

declare global {
	// custom types
	type DiscordClient = _DiscordBot;
	type ModelCentral = _ModelCentral;
	type ModelAccount = _ModelAccount;
	type Component = _Component;

	// Discord.js types share
	type ButtonInteraction = _Discord.ButtonInteraction;
	type ModalSubmitInteraction = _Discord.ModalSubmitInteraction;
	type AutocompleteInteraction = _Discord.AutocompleteInteraction;
	type AnySelectMenuInteraction = _Discord.AnySelectMenuInteraction;
	type APIApplicationCommand = _Discord.APIApplicationCommand;
	type ClientEvents = _Discord.ClientEvents;
	type Interaction = _Discord.Interaction;
}
