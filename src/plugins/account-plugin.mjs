import { GuildMember, User } from 'discord.js';

import ModelAccount from '#model/user/ModelAccount.mjs';
import { error } from '#utils/Console.mjs';

export { getOrCreateAccount, getAccount, createAccount, deleteAccount };

/** Lấy hoặc tạo tài khoản người dùng.
 * @param {DiscordClient} client
 * @param {GuildMember | User} discordUser
 * @returns {Promise<ModelAccount>}
 */
async function getOrCreateAccount(client, discordUser) {
  const db = client.database.user;
  const key = `acc.${discordUser.id}`;
  try {
    let user = /** @type {ModelAccount} */ (db.get(key));

    if (!user) {
      user = new ModelAccount(discordUser);
      db.set(key, user);
    }

    return user;
  } catch (err) {
    error('getOrCreateAccount lỗi!');
    error(`ERROR: ${err}`);
  }
}

/** Lấy tài khoản người dùng.
 * @param {DiscordClient} client
 * @param {GuildMember | User} discordUser
 * @returns {Promise<ModelAccount>}
 */
async function getAccount(client, discordUser) {
  const db = client.database.user;
  const key = `acc.${discordUser.id}`;
  try {
    return /** @type {ModelAccount} */ (db.get(key));
  } catch (err) {
    error('Không thể lấy tài khoản người dùng!');
    error(`ERROR: ${err}`);
  }
}

/** Tao tài khoản người dùng.
 * @param {DiscordClient} client
 * @param {GuildMember | User} discordUser
 * @returns {Promise<boolean>}
 */
async function createAccount(client, discordUser) {
  const db = client.database.user;
  const key = `acc.${discordUser.id}`;
  try {
    const user = new ModelAccount(discordUser);
    db.set(key, user);
    return true;
  } catch (err) {
    error('Không thể tạo tài khoản người dùng!');
    error(`ERROR: ${err}`);
    return false;
  }
}

/** Xóa tài khoản người dùng.
 * @param {DiscordClient} client
 * @param {GuildMember | User} discordUser
 * @returns {Promise<boolean>}
 */
async function deleteAccount(client, discordUser) {
  const db = client.database.user;
  const key = `acc.${discordUser.id}`;
  try {
    db.delete(key);
    return true;
  } catch (err) {
    error('Không thể xóa tài khoản người dùng!');
    error(`ERROR: ${err}`);
    return false;
  }
}
