import config from '#data/configs/config.mjs';
import ModelCentral from '#data/model/central/ModelCentral.mjs';

const DEFAULT_CENTRAL_ID = config.database.DEFAULT_CENTRAL_ID || 'MizuharaCentralBank';

export { getOrCreateCentral, getCentral, createCentral };

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
