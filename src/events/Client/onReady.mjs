import { success } from '#utils/Console.mjs';
import Event from '#structure/Event.mjs';

export default new Event({
  event: 'clientReady',
  once: true,
  run: (__client__, client) => {
    const nameBot = client.user.displayName;
    const took = (Date.now() - __client__.login_timestamp) / 1000;

    success(`Start: ${nameBot} : ${took}s`);
  },
}).data;
