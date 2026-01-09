import 'colors';
import { writeFileSync } from 'fs';

export { info, success, error, warn };

/**
 * @param {string[]} message
 */
const info = (...message) => {
  const time = new Date().toLocaleTimeString();

  console.info(`[${time}]`.gray, '[Info]'.blue, message.join(' '));
  const content = [`[${time}]`, '[Info]', message.join(' ')].join(' ') + '\n';

  writeFileSync('./terminal.log', content, { encoding: 'utf-8', flag: 'a' });
};

/**
 * @param {string[]} message
 */
const success = (...message) => {
  const time = new Date().toLocaleTimeString();

  console.info(`[${time}]`.gray, '[OK]'.green, message.join(' '));
  const content = [`[${time}]`, '[OK]', message.join(' ')].join(' ') + '\n';

  writeFileSync('./terminal.log', content, { encoding: 'utf-8', flag: 'a' });
};

/**
 * @param {string[]} message
 */
const error = (...message) => {
  const time = new Date().toLocaleTimeString();

  console.error(`[${time}]`.gray, '[Error]'.red, message.join(' '));
  const content = [`[${time}]`, '[Error]', message.join(' ')].join(' ') + '\n';

  writeFileSync('./terminal.log', content, { encoding: 'utf-8', flag: 'a' });
};

/**
 * @param {string[]} message
 */
const warn = (...message) => {
  const time = new Date().toLocaleTimeString();

  console.warn(`[${time}]`.gray, '[Warning]'.yellow, message.join(' '));
  const content = [`[${time}]`, '[Warning]', message.join(' ')].join(' ') + '\n';

  writeFileSync('./terminal.log', content, { encoding: 'utf-8', flag: 'a' });
};
