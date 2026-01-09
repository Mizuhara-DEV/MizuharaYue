import { readdirSync } from 'fs';

import { info, error, success } from '#utils/Console.mjs';
import DiscordBot from '#client/DiscordBot.mjs';
import Component from '#structure/Component.mjs';
import AutocompleteComponent from '#structure/AutocompleteComponent.mjs';
import Event from '#structure/Event.mjs';

export default class EventsHandler {
  client;

  /**
   *
   * @param {DiscordClient} client
   */
  constructor(client) {
    this.client = client;
  }

  load = async () => {
    let total = 0;

    for (const directory of readdirSync('./src/events/')) {
      for (const file of readdirSync('./src/events/' + directory).filter((f) => f.endsWith('.mjs'))) {
        try {
          const modulePath = `../../events/${directory}/${file}`;
          const componentModule = await import(modulePath);
          /** @type {Event['data']} */
          const module = componentModule.default || componentModule;

          if (!module) continue;

          if (module.__type__ === 5) {
            if (!module.event || !module.run) {
              error('Không thể tải sự kiện ' + file);
              continue;
            }
            if (module.once) {
              this.client.once(module.event, (...args) => module.run(this.client, ...args));
            } else {
              this.client.on(module.event, (...args) => module.run(this.client, ...args));
            }

            info(`Đã tải sự kiện mới: ` + file);

            total++;
          } else {
            error('Loại sự kiện không hợp lệ ' + module.__type__ + ' từ tệp sự kiện ' + file);
          }
        } catch (err) {
          error('Không thể tải sự kiện từ đường dẫn: ' + 'src/events/' + directory + '/' + file);
        }
      }
    }

    success(`Successfully loaded ${total} events.`);
  };
}
