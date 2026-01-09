import _DiscordBot from '#client/DiscordBot.mjs';
import _ModelCentral from '#model/central/ModelCentral.mjs';
import _ModelAccount from '#model/user/ModelAccount.mjs';

declare global {
	type DiscordClient = _DiscordBot;
	type ModelCentral = _ModelCentral;
	type ModelAccount = _ModelAccount;
}
