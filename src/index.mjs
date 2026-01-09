import dotenv from 'dotenv';
import { writeFileSync } from 'fs';

import { info, error } from './utils/Console.mjs';
import DiscordBot from './client/DiscordBot.mjs';
import config from './data/configs/config.mjs';

dotenv.config();
let isShuttingDown = false;

const now = new Date();
const content = [`\n[${now.toLocaleTimeString()}]`, `[${now.toLocaleDateString()}]`].join(' ') + '\n';
writeFileSync('./terminal.log', content, { encoding: 'utf-8' }); //

const client = new DiscordBot();

export default client;

if (config.bot.check) {
  client.check_intents_code;
} else {
  client.connect();
}

async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  info(`Bot Shutdown is ${signal}`);

  try {
    await client.shutdown();
  } catch (err) {
    error('Lỗi khi shutdown:', err);
  } finally {
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', error);
process.on('uncaughtException', error);
