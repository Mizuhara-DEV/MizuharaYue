import { QuickYAML } from 'quick-yaml.db';
import { ActivityType, Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

import config from '#configs/config.mjs';
import { warn, error, info, success } from '#utils/Console.mjs';
import CommandsHandler from './handler/CommandsHandler.mjs';
import CommandsListener from './handler/CommandsListener.mjs';
import ComponentsHandler from './handler/ComponentsHandler.mjs';
import ComponentsListener from './handler/ComponentsListener.mjs';
import EventsHandler from './handler/EventsHandler.mjs';
import CurrencyService from '#plugins/balance-service/currency-service.mjs';

export default class DiscordBot extends Client {
	collection = {
		application_commands: new Collection(),
		message_commands: new Collection(),
		message_commands_aliases: new Collection(),
		components: {
			buttons: new Collection(),
			selects: new Collection(),
			modals: new Collection(),
			autocomplete: new Collection(),
		},
	};

	rest_application_commands_array = [];
	login_attempts = 0;
	login_timestamp = 0;

	commands_handler = new CommandsHandler(this);
	components_handler = new ComponentsHandler(this);
	events_handler = new EventsHandler(this);

	database = {
		central: new QuickYAML(config.database.centralpath),
		guild: new QuickYAML(config.database.guildspath),
		user: new QuickYAML(config.database.userspath),
	};

	bot = {
		centralService: new CurrencyService(this),
	};

	constructor() {
		super({
			intents: config.bot.intents_code,
			partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.User],
			presence: {
				activities: [
					{
						name: 'Nữ hoàng Băng giá ❄️',
						state: 'Khởi động MizuharaYue v4.0.0',
						type: ActivityType.Watching,
					},
				],
			},
		});

		new CommandsListener(this);
		new ComponentsListener(this);
	}

	statusMessages = [
		{ name: `🎮 Chơi game với MizuharaYue | Prefix: ${config.commands.prefix}`, type: ActivityType.Custom },
		{ name: `🎵 Phát nhạc anime - gõ ${config.commands.prefix}play để bắt đầu!`, type: ActivityType.Custom },
		{ name: '🛠 Quản lý server an toàn & hiệu quả', type: ActivityType.Custom },
		{ name: '💻 Made by MizuharaDEV | DiscordJS v14', type: ActivityType.Custom },
	];

	statusInterval = null;
	startStatusRotation = () => {
		let index = 0;
		this.statusInterval = setInterval(() => {
			this.user.setPresence({ activities: [this.statusMessages[index]] });
			index = (index + 1) % this.statusMessages.length;
		}, 10000);
	};

	connect = async () => {
		warn(`Đang cố gắng kết nối với bot Discord... (${this.login_attempts + 1})`);

		this.login_timestamp = Date.now();

		try {
			await this.login(process.env.CLIENT_TOKEN);
			this.bot.centralService.init();
			this.commands_handler.load();
			this.components_handler.load();
			this.events_handler.load();
			this.startStatusRotation();

			warn('Đang cố gắng đăng ký các lệnh ứng dụng... (việc này có thể mất một lúc!)');
			await this.commands_handler.registerApplicationCommands(config.development);
			success(
				'Các lệnh ứng dụng đã được đăng ký thành công. Đối với bang hội cụ thể? ' +
					(config.development.enabled ? 'Yes' : 'No')
			);
		} catch (err) {
			error('Không kết nối được với bot Discord, đang thử lại...');
			error(`ERROR: ${err}`);
			this.login_attempts++;
			if (this.login_attempts < 5) setTimeout(this.connect, 5000);
		}
	};

	async shutdown() {
		info(`Bot Shutdown...`);
		if (this.statusInterval) {
			clearInterval(this.statusInterval);
			this.statusInterval = null;
		}

		this.login_attempts = Infinity;

		if (this.ws?.status == 0 || this.isReady()) {
			success(`Bot clinet Disconnect!`);
			await this.destroy();
		}
	}

	get check_intents_code() {
		const code = config.bot.intents_code;
		if (code === 0) return;

		const enabledIntents = Object.keys(GatewayIntentBits).filter((key) => {
			const value = GatewayIntentBits[key];
			return typeof value === 'number' && code & value;
		});

		console.info(enabledIntents);
	}
}
