import config from '#data/configs/config.mjs';
import ModelCentral from '#data/model/central/ModelCentral.mjs';

const DEFAULT_CENTRAL_ID = config.database.DEFAULT_CENTRAL_ID || 'MizuharaCentralBank';

export { saveCentral, getOrCreateCentral, getCentral, createCentral };

/** Tạo Ngân hàng trung tâm.
 * @param {DiscordClient} client
 * @param {string} centralID
 * @returns {Promise<ModelCentral>}
 */
async function createCentral(client, centralID = DEFAULT_CENTRAL_ID) {
  const db = client.database.central;
  const key = `cell.${centralID}`;

  const central = new ModelCentral(centralID);
  db.set(key, central);

  return central;
}

/** Lấy thông tin Ngân hàng trung tâm.
 * @param {DiscordClient} client
 * @param {string} centralID
 * @returns {Promise<ModelCentral>}
 */
async function getCentral(client, centralID = DEFAULT_CENTRAL_ID) {
  const db = client.database.central;
  const key = `cell.${centralID}`;

  return /** @type {ModelCentral} */ (db.get(key));
}

/** Lấy hoặc tạo Ngân hàng trung tâm.
 * @param {DiscordClient} client
 * @param {string} centralID - Default 'MizuharaCentralBank'
 * @returns {Promise<ModelCentral>}
 */
async function getOrCreateCentral(client, centralID = DEFAULT_CENTRAL_ID) {
  const db = client.database.central;
  const key = `cell.${centralID}`;

  let central = /** @type {ModelCentral} */ (db.get(key));

  if (!central) {
    central = new ModelCentral(centralID);
    db.set(key, central);
  }

  return central;
}

/** Lưu Ngân hàng trung tâm.
 * @param {DiscordClient} client
 * @param {ModelCentral} centralData - Default 'MizuharaCentralBank'
 * @returns {Promise<void>}
 */
async function saveCentral(client, centralData) {
  const db = client.database.central;
  const key = `cell.${centralData.id}`;

  db.set(key, centralData);
}
