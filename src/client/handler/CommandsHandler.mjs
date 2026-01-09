import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';

import { info, error, success } from '#utils/Console.mjs';
import ApplicationCommand from '#structure/ApplicationCommand.mjs';
import MessageCommand from '#structure/MessageCommand.mjs';

export default class CommandsHandler {
  client;

  /**
   * @param {DiscordClient} client
   */
  constructor(client) {
    this.client = client;
  }

  load = async () => {
    for (const directory of readdirSync('./src/commands/')) {
      for (const file of readdirSync('./src/commands/' + directory).filter((f) => f.endsWith('.mjs'))) {
        try {
          const modulePath = `../../commands/${directory}/${file}`;
          const commandModule = await import(modulePath);
          /** @type {MessageCommand['data'] | ApplicationCommand['data']} */
          const module = commandModule.default || commandModule;

          if (!module) continue;

          if (module.__type__ === 2) {
            if (!module.command || !module.run) {
              error('Không thể tải lệnh tin nhắn ' + file);
              continue;
            }

            this.client.collection.message_commands.set(module.command.name, module);

            // @ts-ignore
            if (module.command.aliases && Array.isArray(module.command.aliases)) {
              // @ts-ignore
              module.command.aliases.forEach((alias) => {
                this.client.collection.message_commands_aliases.set(alias, module.command.name);
              });
            }

            info('Đã tải lệnh tin nhắn mới: ' + file);
          } else if (module.__type__ === 1) {
            if (!module.command || !module.run) {
              error('Không thể tải lệnh ứng dụng ' + file);
              continue;
            }

            this.client.collection.application_commands.set(module.command.name, module);
            this.client.rest_application_commands_array.push(module.command);

            info('Đã tải lệnh ứng dụng mới: ' + file);
          } else {
            error('Loại lệnh không hợp lệ ' + module.__type__ + ' từ tệp lệnh ' + file);
          }
        } catch (err) {
          error('Không thể tải một lệnh từ đường dẫn: ' + 'src/commands/' + directory + '/' + file);
          if (err && err.stack) {
            console.error(err.stack);
          } else {
            console.error(err);
          }
        }
      }
    }

    success(
      `Successfully loaded ${this.client.collection.application_commands.size} application commands and ${this.client.collection.message_commands.size} message commands.`
    );
  };

  reload = () => {
    this.client.collection.message_commands.clear();
    this.client.collection.message_commands_aliases.clear();
    this.client.collection.application_commands.clear();
    this.client.rest_application_commands_array = [];

    this.load();
  };

  /**
   * @param {{ enabled: boolean, guildId: string }} development
   * @param {Partial<import('discord.js').RESTOptions>} restOptions
   */
  registerApplicationCommands = async (development, restOptions = null) => {
    const applicationId = this.client.application?.id || this.client.user?.id;

    if (!applicationId) {
      error('Không thể đăng ký lệnh: Chưa có Application ID (Bot chưa ready?)');
      return;
    }
    const rest = new REST(restOptions ? restOptions : { version: '10' }).setToken(this.client.token);

    try {
      if (development.enabled) {
        await rest.put(Routes.applicationGuildCommands(applicationId, development.guildId), {
          body: this.client.rest_application_commands_array,
        });
        success('Đã đăng ký lệnh Guild thành công.');
      } else {
        // Remove commands Guild
        await rest.put(Routes.applicationGuildCommands(applicationId, development.guildId), { body: [] });
        await rest.put(Routes.applicationCommands(applicationId), {
          body: this.client.rest_application_commands_array,
        });
        success('Đã đăng ký lệnh Global thành công.');
      }
    } catch (err) {
      error('Lỗi khi đăng ký Slash Commands');
      error(err);
    }
  };
}
