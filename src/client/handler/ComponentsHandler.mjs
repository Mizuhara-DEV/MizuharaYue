import { readdirSync } from 'fs';

import { info, error, success } from '#utils/Console.mjs';
import Component from '#structure/Component.mjs';
import AutocompleteComponent from '#structure/AutocompleteComponent.mjs';

export default class ComponentsHandler {
  client;

  /**
   *
   * @param {DiscordClient} client
   */
  constructor(client) {
    this.client = client;
  }

  load = async () => {
    for (const directory of readdirSync('./src/components/')) {
      for (const file of readdirSync('./src/components/' + directory).filter((f) => f.endsWith('.mjs'))) {
        try {
          const modulePath = `../../components/${directory}/${file}`;
          const componentModule = await import(modulePath);
          /** @type {Component['data'] | AutocompleteComponent['data']} */
          const module = componentModule.default || componentModule;

          if (!module) continue;

          if (module.__type__ === 3) {
            // @ts-ignore
            if (!module.customId || !module.type || !module.run) {
              error('Không thể tải button/select/modal component ' + file);
              continue;
            }

            // @ts-ignore
            switch (module.type) {
              case 'modal': {
                // @ts-ignore
                this.client.collection.components.modals.set(module.customId, module);
                break;
              }
              case 'select': {
                // @ts-ignore
                this.client.collection.components.selects.set(module.customId, module);
                break;
              }
              case 'button': {
                // @ts-ignore
                this.client.collection.components.buttons.set(module.customId, module);
                break;
              }
              default: {
                error('Loại thành phần không hợp lệ (not: button, select, Hoặc modal): ' + file);
                continue;
              }
            }

            // @ts-ignore
            info(`Đã tải thành phần mới (type: ${module.type}) : ` + file);
          } else if (module.__type__ === 4) {
            // @ts-ignore
            if (!module.commandName || !module.run) {
              error('Không thể tải thành phần tự động hoàn thành ' + file);
              continue;
            }

            // @ts-ignore
            this.client.collection.components.autocomplete.set(module.commandName, module);

            info(`Đã tải Thành phần mới (type: autocomplete) : ` + file);
          } else {
            error('Loại thành phần không hợp lệ ' + module.__type__ + ' từ tập tin component ' + file);
          }
        } catch {
          error('Không thể tải một thành phần từ đường dẫn: ' + 'src/component/' + directory + '/' + file);
        }
      }
    }

    const componentsCollection = this.client.collection.components;

    success(
      `Successfully loaded ${componentsCollection.autocomplete.size + componentsCollection.buttons.size + componentsCollection.selects.size} components.`
    );
  };

  reload = () => {
    this.client.collection.components.autocomplete.clear();
    this.client.collection.components.buttons.clear();
    this.client.collection.components.modals.clear();
    this.client.collection.components.selects.clear();

    this.load();
  };
}
